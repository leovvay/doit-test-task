import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Email {
  @Prop({ default: uuidv4 })
  id?: string;
  @Prop()
  name: string;
  @Prop({ match: /(.+)@(.+){2,}\.(.+){2,}/ })
  email: string;
  @Prop({ type: mongoose.Schema.Types.Date })
  scheduled_date: Date;
  @Prop({ default: Date.now })
  created_at?: Date;
}
export type EmailDocument = Email & Document;
export const EmailSchema = SchemaFactory.createForClass(Email);
EmailSchema.plugin(uniqueValidator);
