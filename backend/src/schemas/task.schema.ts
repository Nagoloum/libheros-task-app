import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  shortDescription: string;

  @Prop()
  longDescription?: string;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ type: Types.ObjectId, ref: 'TaskList', required: true })
  listId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);