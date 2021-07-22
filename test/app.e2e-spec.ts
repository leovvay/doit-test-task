import * as dotenv from 'dotenv';
dotenv.config();

import { addDays, startOfDay } from 'date-fns';

import * as fs from 'fs';
import * as csv from 'csv-parser';

import { MongoClient } from 'mongodb';
jest.setTimeout(5000);
describe('CSV Migration tool e2e test', () => {
  let connection;
  let db;
  let csvR;
  let patientsDocumnets;
  let emailsDocuments;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: false,
    });
    db = await connection.db(process.env.DB_NAME);

    patientsDocumnets = await db.collection('patients').find({}).toArray();
    emailsDocuments = await db.collection('emails').find({}).toArray();

    csvR = await new Promise((res) => {
      const results = [];
      fs.createReadStream(
        // we can extend it, verify if thats an url and download it via axios
        'test/testData.csv',
      )
        .pipe(csv({ separator: ';' }))
        .on('data', (data) => results.push(data))
        .on('end', () => res(results));
    });
  });

  it('Verify the data in flat file matches the data in Patients collection', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const patients = patientsDocumnets
      .map(({ _id, __v, ...doc }) => ({
        ...doc,
      }))
      .map((patient) => ({ ...patient, CONSENT: patient.CONSENT ? 'Y' : 'N' }));
    expect(csvR).toEqual(patients);
  });

  it('Print out all Patient IDs where the first name is missing', async () => {
    const patientIDNoNames = patientsDocumnets
      .filter((PD) => !PD['First Name'])
      .map((PD) => PD['Member ID']);
    expect(patientIDNoNames).toEqual(['15245', '16345']);
  });

  it('Print out all Patient IDs where the email address is missing, but consent is Y', async () => {
    const consentedPatientsIDs = patientsDocumnets
      .filter((PD) => !PD['Email Address'] && PD['CONSENT'])
      .map((PD) => PD['Member ID']);
    expect(consentedPatientsIDs).toEqual(['16245']);
  });

  it('Verify Emails were created in Emails Collection for patients who have CONSENT as Y', async () => {
    const consentedPatientsEmails = patientsDocumnets
      .filter((PD) => PD['Email Address'] && PD['CONSENT'])
      .map((PD) => PD['Email Address']);

    const emails = emailsDocuments.map((ED) => ED.email);

    expect(consentedPatientsEmails).toEqual(emails);
  });

  it('Verify emails for each patient are scheduled correctly', async () => {
    const schedule = (date: Date, days: number) =>
      startOfDay(addDays(date, days));
    const emailsSupposeSchedule = emailsDocuments.map((ED, i) =>
      schedule(ED.created_at, i + 1),
    );
    const emailsActualSchedule = emailsDocuments.map((ED) => ED.scheduled_date);

    expect(emailsSupposeSchedule).toStrictEqual(emailsActualSchedule);
  });

  afterAll(async () => {
    await connection.close();
  });
});
