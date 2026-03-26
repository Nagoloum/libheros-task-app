import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  create(listId: string, data: any): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/${listId}`, data);
  }

  getByList(listId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/list/${listId}`);
  }

  getCompleted(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/completed`);
  }

  toggleComplete(taskId: string): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${taskId}/toggle`, {});
  }

  delete(taskId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${taskId}`);
  }
}