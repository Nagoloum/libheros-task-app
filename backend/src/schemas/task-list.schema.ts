import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskListDocument = TaskList & Document;

@Schema({ timestamps: true })
export class TaskList {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const TaskListSchema = SchemaFactory.createForClass(TaskList);