import { Controller } from '@nestjs/common';
import { CSVMigrationService } from './csvmigration/CSVMigration.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class CSVMigrationController {
  constructor(
    private CsvmigrationService: CSVMigrationService,
    private configService: ConfigService,
  ) {
    this.init();
  }
  async init() {
    const pathToCSV = this.configService.get<string>('PATH_TO_CSV');
    const patients = await this.CsvmigrationService.loadCSV(pathToCSV);
    await this.CsvmigrationService.syncPatients(patients);

    const emailsValues = patients
      .filter((p) => p['Email Address'] && p['CONSENT'])
      .map((patient) => patient['Email Address']);
    await this.CsvmigrationService.syncEmails(emailsValues);
    this.CsvmigrationService.scheduleEmails();
  }
}
