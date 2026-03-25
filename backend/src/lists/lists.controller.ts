import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('lists')
@UseGuards(AuthGuard('jwt'))
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  async create(@Body() createTaskListDto: CreateTaskListDto, @CurrentUser() user: any) {
    return this.listsService.create(createTaskListDto, user.id);
  }

  @Get()
  async findAll(@CurrentUser() user: any) {
    return this.listsService.findAllByUser(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.listsService.findOne(id, user.id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskListDto: UpdateTaskListDto, @CurrentUser() user: any) {
    return this.listsService.update(id, updateTaskListDto, user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    await this.listsService.remove(id, user.id);
    return { message: 'Liste supprimée avec succès' };
  }
}