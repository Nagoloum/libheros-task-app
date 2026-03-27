import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskList } from '../models/task-list.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  private apiUrl = `${environment.apiUrl}/lists`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TaskList[]> {
    return this.http.get<TaskList[]>(this.apiUrl);
  }

  create(data: { name: string }): Observable<TaskList> {
    return this.http.post<TaskList>(this.apiUrl, data); 
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}