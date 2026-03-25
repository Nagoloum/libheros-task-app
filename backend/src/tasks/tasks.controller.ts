import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':listId')
  async create(
    @Param('listId') listId: string,
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() user: any,
  ) {
    return this.tasksService.create(createTaskDto, listId, user.id);
  }

  @Get('list/:listId')
  async findAllByList(@Param('listId') listId: string, @CurrentUser() user: any) {
    return this.tasksService.findAllByList(listId, user.id);
  }

  @Get('completed')
  async findCompleted(@CurrentUser() user: any) {
    return this.tasksService.findCompletedByUser(user.id);
  }

  @Patch(':id/toggle')
  async toggleComplete(@Param('id') id: string, @CurrentUser() user: any) {
    return this.tasksService.toggleComplete(id, user.id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @CurrentUser() user: any) {
    return this.tasksService.update(id, updateTaskDto, user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    await this.tasksService.remove(id, user.id);
    return { message: 'Tâche supprimée avec succès' };
  }
}