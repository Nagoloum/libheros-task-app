import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ListsService } from '../../services/lists.service';
import { TasksService } from '../../services/tasks.service';
import { TaskList } from '../../models/task-list.model';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {

  private authService = inject(AuthService);
  private listsService = inject(ListsService);
  private tasksService = inject(TasksService);

  taskLists = signal<TaskList[]>([]);
  tasks = signal<Task[]>([]);
  completedTasks = signal<Task[]>([]);
  selectedListId = signal<string | null>(null);
  selectedTask = signal<Task | null>(null);
  today = new Date().toISOString().split('T')[0];

  newListName = '';
  newTask = { shortDescription: '', longDescription: '', dueDate: '' };
  showCompleted = false;
  isLoading = false;

  ngOnInit() {
    this.loadLists();
  }

  loadLists() {
    this.listsService.getAll().subscribe(lists => this.taskLists.set(lists));
  }

  createList() {
    if (!this.newListName.trim()) return;
    this.listsService.create({ name: this.newListName }).subscribe(list => {
      this.taskLists.update(l => [...l, list]);
      this.newListName = '';
      this.selectList(list._id);
    });
  }

  selectList(listId: string) {
    this.selectedListId.set(listId);
    this.loadTasks(listId);
  }

  loadTasks(listId: string) {
    this.tasksService.getByList(listId).subscribe(tasks => this.tasks.set(tasks));
    this.tasksService.getCompleted().subscribe(completed => this.completedTasks.set(completed));
  }

  createNewTask() {
    if (!this.selectedListId() || !this.newTask.shortDescription) return;
    this.tasksService.create(this.selectedListId()!, this.newTask).subscribe(task => {
      this.tasks.update(t => [...t, task]);
      this.newTask = { shortDescription: '', longDescription: '', dueDate: '' };
    });
  }

  toggleComplete(task: Task) {
    this.tasksService.toggleComplete(task._id).subscribe(() => this.loadTasks(this.selectedListId()!));
  }

  openDetail(task: Task) {
    this.selectedTask.set(task);
  }

  deleteTask() {
    if (!this.selectedTask()) return;
    if (confirm('Supprimer cette tâche ?')) {
      this.tasksService.delete(this.selectedTask()!._id).subscribe(() => {
        this.selectedTask.set(null);
        this.loadTasks(this.selectedListId()!);
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}