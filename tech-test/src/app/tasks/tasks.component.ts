import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITask } from './interfaces/task.interface';
import { Filter, FilterStatus } from '../constants/constant';
import { ApiService } from './services/api/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [ApiService]
})
export class TasksComponent implements OnInit, OnDestroy {
  public tasks: ITask[];
  private destroy$: Subject<void> = new Subject();

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  public getTasks(): void {
    this.apiService.getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => this.tasks = items);
  }

  public onAdd(task: ITask): any {
    this.apiService.addTask({
      ...task,
      done: false,
      id: this.tasks ? this.tasks[this.tasks.length - 1].id + 1 : 1
    }).pipe(takeUntil(this.destroy$))
      .subscribe(() => this.getTasks());
  }

  public onEdit(task: ITask): any {
    this.apiService.editTask(task)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.getTasks());
  }

  public onDone(task: ITask): any {
    this.apiService.doneTask(task)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.getTasks());
  }

  public onDelete(task: ITask): any {
    this.apiService.deleteTask(task.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.getTasks());
  }

  public filter(filter: Filter): void {
    switch (filter) {
      case Filter.done:
        this.apiService.getFilteredTasks({type: FilterStatus.done, value: true})
          .pipe(takeUntil(this.destroy$))
          .subscribe(res => this.tasks = res);
        break;
      case Filter.ongoing:
        this.apiService.getFilteredTasks({type: FilterStatus.done, value: false})
          .pipe(takeUntil(this.destroy$))
          .subscribe(res => this.tasks = res);
        break;
      case Filter.house:
        this.apiService.getFilteredTasks({type: FilterStatus.category, value: Filter.house})
          .pipe(takeUntil(this.destroy$))
          .subscribe(res => this.tasks = res);
        break;
      case Filter.bureaucracy:
        this.apiService.getFilteredTasks({type: FilterStatus.category, value: Filter.bureaucracy})
          .pipe(takeUntil(this.destroy$))
          .subscribe(res => this.tasks = res);
        break;
      case Filter.all:
        this.getTasks();
        break;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
