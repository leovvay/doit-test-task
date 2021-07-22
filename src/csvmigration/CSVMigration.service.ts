import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CsvParser, ParsedData } from 'nest-csv-parser';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';

import { PatientDocument, Patient } from './../dto/patient.schema';
import { EmailDocument, Email } from './../dto/email.schema';

import { createTransport } from 'nodemailer';
import * as Mailer from 'nodemailer/lib/mailer';
import { CronJob } from 'cron';
import * as fs from 'fs';
import { addDays, startOfDay } from 'date-fns';
import { Model } from 'mongoose';

class PatientRaw {
  'Program Identifier': string;
  'Data Source': string;
  'Card Number': string;
  'Member ID': string;
  'First Name': string;
  'Last Name': string;
  'Date of Birth': string;
  'Address 1': string;
  'Address 2': string;
  'City': string;
  'State': string;
  'Zip code': string;
  'Telephone number': string;
  'Email Address': string;
  'CONSENT': string;
  'Mobile Phone': string;
}
const today = new Date();

@Injectable()
export class CSVMigrationService {
  private nodemailerTransport: Mailer;
  constructor(
    private readonly csvParser: CsvParser,
    @InjectModel(Patient.name) private PatientModel: Model<PatientDocument>,
    @InjectModel(Email.name) private EmailModel: Model<EmailDocument>,
    private readonly configService: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {
    this.nodemailerTransport = createTransport({
      service: this.configService.get('EMAIL_SERVICE'),
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  async loadCSV(path: string): Promise<Patient[]> {
    const stream = fs.createReadStream(
      // we can extend it, verify if thats an url and download it via axios
      path,
    );
    const patientsRaw: ParsedData<PatientRaw> = await this.csvParser.parse(
      stream,
      PatientRaw,
    );

    const patients: Patient[] = patientsRaw.list.map((patient) => ({
      ...patient,
      CONSENT: patient['CONSENT'] === 'Y',
    }));
    return patients;
  }

  async syncPatients(patients: Patient[]) {
    return this.PatientModel.insertMany(patients);
  }

  async syncEmails(emailsValues: string[]) {
    const emails: Email[] = emailsValues.map((email, i) => ({
      name: `Day ${i + 1}`,
      email,
      scheduled_date: startOfDay(addDays(today, i + 1)),
    }));
    return this.EmailModel.insertMany(emails);
  }

  async scheduleEmails() {
    const mails: Email[] = await this.EmailModel.find({});
    mails.forEach((mail) => {
      if (!mail.email) return;
      const date = new Date(mail.scheduled_date);
      const job = new CronJob(date, () => {
        this.nodemailerTransport.sendMail({
          to: mail.email,
          subject: mail.name,
          text: mail.name,
        });
      });
      this.schedulerRegistry.addCronJob(`${Date.now()}-${mail.id}`, job);
      job.start();
    });
  }
}
