import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  private authService = inject(AuthService);

  // States
  taskLists = signal<any[]>([]);
  tasks = signal<any[]>([]);
  completedTasks = signal<any[]>([]);
  selectedListId = signal<string | null>(null);
  selectedTask = signal<any>(null);

  // Formulaires
  newListName = '';
  newTask = {
    shortDescription: '',
    longDescription: '',
    dueDate: ''
  };

  showCompleted = false;

  ngOnInit() {
    this.loadMockData();
  }

  loadMockData() {
    // Données mock pour voir l'interface
    this.taskLists.set([
      { _id: '1', name: 'Courses' },
      { _id: '2', name: 'Projet Angular' },
      { _id: '3', name: 'Personnel' }
    ]);

    this.tasks.set([
      { 
        _id: 't1', 
        shortDescription: 'Acheter du pain', 
        dueDate: '2026-03-28', 
        isCompleted: false 
      },
      { 
        _id: 't2', 
        shortDescription: 'Terminer le composant dashboard', 
        dueDate: '2026-03-30', 
        isCompleted: false 
      }
    ]);

    this.completedTasks.set([
      { _id: 't3', shortDescription: 'Nettoyer la maison', dueDate: '2026-03-25', isCompleted: true }
    ]);
  }

  createNewList() {
    if (!this.newListName.trim()) return;
    
    const newList = {
      _id: Date.now().toString(),
      name: this.newListName
    };
    
    this.taskLists.update(lists => [...lists, newList]);
    this.newListName = '';
  }

  selectList(listId: string) {
    this.selectedListId.set(listId);
    // Simulation de chargement des tâches
    console.log('Liste sélectionnée :', listId);
  }

  createTask() {
    if (!this.selectedListId() || !this.newTask.shortDescription.trim()) return;

    const newTaskItem = {
      _id: Date.now().toString(),
      shortDescription: this.newTask.shortDescription,
      longDescription: this.newTask.longDescription,
      dueDate: this.newTask.dueDate || '2026-04-15',
      isCompleted: false
    };

    this.tasks.update(tasks => [...tasks, newTaskItem]);
    this.newTask = { shortDescription: '', longDescription: '', dueDate: '' };
  }

  toggleTask(task: any) {
    task.isCompleted = !task.isCompleted;
    this.tasks.update(tasks => [...tasks]); // Trigger update
  }

  openTaskDetail(task: any) {
    this.selectedTask.set(task);
  }

  closeTaskDetail() {
    this.selectedTask.set(null);
  }

  logout() {
    this.authService.logout();
  }
}