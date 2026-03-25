import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto, listId: string, userId: string): Promise<TaskDocument> {
    const task = await this.taskModel.create({
      ...createTaskDto,
      dueDate: new Date(createTaskDto.dueDate),
      listId: new Types.ObjectId(listId),
      userId: new Types.ObjectId(userId),
    });
    return task;
  }

  async findAllByList(listId: string, userId: string): Promise<TaskDocument[]> {
    return this.taskModel
      .find({ listId: new Types.ObjectId(listId), userId: new Types.ObjectId(userId) })
      .sort({ dueDate: 1 })
      .exec();
  }

  async findCompletedByUser(userId: string): Promise<TaskDocument[]> {
    return this.taskModel
      .find({ userId: new Types.ObjectId(userId), isCompleted: true })
      .sort({ dueDate: 1 })
      .exec();
  }

  async toggleComplete(taskId: string, userId: string): Promise<TaskDocument> {
    const task = await this.findOne(taskId, userId);
    task.isCompleted = !task.isCompleted;
    return task.save();
  }

  async findOne(taskId: string, userId: string): Promise<TaskDocument> {
    const task = await this.taskModel.findOne({
      _id: taskId,
      userId: new Types.ObjectId(userId),
    }).exec();

    if (!task) {
      throw new NotFoundException('Tâche non trouvée ou accès non autorisé');
    }
    return task;
  }

  async update(taskId: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<TaskDocument> {
    await this.findOne(taskId, userId);

    const updated = await this.taskModel
      .findByIdAndUpdate(taskId, updateTaskDto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException('Tâche non trouvée');
    return updated;
  }

  async remove(taskId: string, userId: string): Promise<void> {
    await this.findOne(taskId, userId);
    await this.taskModel.deleteOne({ _id: taskId }).exec();
  }
}