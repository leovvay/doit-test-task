import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

@Schema()
export class Patient {
  @Prop({ required: true })
  'Program Identifier': string;

  @Prop()
  'Data Source': string;

  @Prop()
  'Card Number': string;

  @Prop({ unique: true, index: true }) // unique is NOT a validator, it's just for building unique indexies of mongo
  'Member ID': string;

  @Prop()
  'First Name': string;

  @Prop()
  'Last Name': string;

  @Prop()
  'Date of Birth': string;

  @Prop()
  'Address 1': string;

  @Prop()
  'Address 2': string;

  @Prop()
  'City': string;

  @Prop()
  'State': string;

  @Prop()
  'Zip code': string;

  @Prop()
  'Telephone number': string;

  @Prop({ match: /(.+)@(.+){2,}\.(.+){2,}/ }) //any other validations for DTO could be added via Prop class, but i thik its outside of test task scope
  'Email Address': string;

  @Prop({ required: true })
  'CONSENT': boolean;

  @Prop()
  'Mobile Phone': string;
}
export type PatientDocument = Patient & Document;
export const PatientSchema = SchemaFactory.createForClass(Patient);
PatientSchema.plugin(uniqueValidator); // this is what actually implements uniquness
