import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TaskList, TaskListDocument } from '../schemas/task-list.schema';
import { Task, TaskDocument } from '../schemas/task.schema';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';

@Injectable()
export class ListsService {
  constructor(
    @InjectModel(TaskList.name) private taskListModel: Model<TaskListDocument>,
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
  ) {}

  async create(
    createTaskListDto: CreateTaskListDto,
    userId: string,
  ): Promise<TaskListDocument> {
    const existingList = await this.taskListModel.findOne({
      name: createTaskListDto.name,
      userId: new Types.ObjectId(userId),
    });
    if (existingList) {
      throw new NotFoundException(
        'Une liste avec ce nom existe déjà pour cet utilisateur',
      );
    }
    const createdList = new this.taskListModel({
      ...createTaskListDto,
      userId: new Types.ObjectId(userId),
    });
    return createdList.save();
  }

  async findAllByUser(userId: string): Promise<TaskListDocument[]> {
    return this.taskListModel
      .find({ userId: new Types.ObjectId(userId) })
      .exec();
  }

  async findOne(id: string, userId: string): Promise<TaskListDocument> {
    const list = await this.taskListModel
      .findOne({
        _id: id,
        userId: new Types.ObjectId(userId),
      })
      .exec();

    if (!list) {
      throw new NotFoundException('Liste non trouvée ou accès non autorisé');
    }
    return list;
  }

  async update(
    id: string,
    updateTaskListDto: UpdateTaskListDto,
    userId: string,
  ): Promise<TaskListDocument> {
    await this.findOne(id, userId);

    const updatedList = await this.taskListModel
      .findByIdAndUpdate(id, updateTaskListDto, { new: true })
      .exec();

    if (!updatedList) {
      throw new NotFoundException('Liste non trouvée');
    }

    return updatedList;
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);

    await this.taskModel
      .deleteMany({
        listId: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
      })
      .exec();

    await this.taskListModel.deleteOne({ _id: id }).exec();
  }
}
