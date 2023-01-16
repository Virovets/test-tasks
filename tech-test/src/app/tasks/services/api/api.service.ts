import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl, FilterStatus } from '../../../constants/constant';
import { map } from 'rxjs/operators';
import { ITask } from '../../interfaces/task.interface';

@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getTasks(): Observable<ITask[]> {
    return this.httpClient.get<ITask[]>(apiBaseUrl);
  }

  public addTask(item: ITask): Observable<ITask> {
    return this.httpClient.post<ITask>(apiBaseUrl, item);
  }

  public editTask(task: ITask): Observable<ITask> {
    return this.httpClient.patch<ITask>(`${apiBaseUrl}/${task.id}`, task);
  }

  public doneTask(task: ITask): Observable<ITask> {
    return this.httpClient.patch<ITask>(`${apiBaseUrl}/${task.id}`, {done: task.done});
  }

  public deleteTask(id: number): Observable<{}> {
    return this.httpClient.delete(`${apiBaseUrl}/${id}`);
  }

  public getFilteredTasks(filter: {type: string, value: string | boolean}): Observable<ITask[]> {
    return this.httpClient.get(apiBaseUrl).pipe(
      map((tasks: ITask[]) => {
        switch (filter.type) {
          case FilterStatus.done:
            return tasks.filter(task => {
              if (filter.value) {
                return (typeof task.done) === 'string';
              } else {
                return !task.done;
              }
            });
          case FilterStatus.category:
            return tasks.filter(task => task.category === filter.value);
        }
      })
    );
  }
}
