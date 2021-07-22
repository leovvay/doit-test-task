import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { CSVMigrationController } from './CSVMigration.controller';
import { CsvModule } from 'nest-csv-parser';
import { CSVMigrationService } from './csvmigration/CSVMigration.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Email, EmailSchema } from './dto/email.schema';
import { Patient, PatientSchema } from './dto/patient.schema';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    CsvModule,
    MongooseModule.forFeature([
      { name: Patient.name, schema: PatientSchema },
      { name: Email.name, schema: EmailSchema },
    ]),
    MongooseModule.forRoot(process.env.DB_CONNECTION), //no way to use configmodule at this point of initialization
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
  ],
  controllers: [CSVMigrationController],
  providers: [CSVMigrationService],
})
export class CSVMigrationModule {}
