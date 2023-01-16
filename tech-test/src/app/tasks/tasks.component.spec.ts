import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { FormBuilder } from '@angular/forms';
import { ApiService } from './services/api/api.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ITask } from './interfaces/task.interface';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  const mockTask: ITask = {
    label: 'mock',
    description: '123',
    category: 'house',
    done: false,
    id: null
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksComponent ],
      providers: [
        FormBuilder,
        ApiService
      ],
      imports: [
        HttpClientTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get tasks', fakeAsync(() => {
    spyOn(component.apiService, 'getTasks').and.callFake(() => {
      return of([mockTask]);
    });
    component.getTasks();
    fixture.detectChanges();

    expect(component.tasks).toEqual([mockTask]);
  }));

  it('should add task', fakeAsync(() => {
    spyOn(component.apiService, 'addTask').and.callFake(() => {
      return of(mockTask);
    });
    spyOn(component.apiService, 'getTasks').and.callFake(() => {
      return of([mockTask, mockTask]);
    });
    component.onAdd(mockTask);
    fixture.detectChanges();

    expect(component.tasks.length).toEqual(2);
  }));

  it('should delete task', fakeAsync(() => {
    component.tasks = [mockTask, mockTask];
    spyOn(component.apiService, 'deleteTask').and.callFake(() => {
      return of({});
    });
    spyOn(component.apiService, 'getTasks').and.callFake(() => {
      return of([mockTask]);
    });
    component.onDelete(mockTask);
    fixture.detectChanges();

    expect(component.tasks.length).toEqual(1);
  }));

  it('should edit task', fakeAsync(() => {
    component.tasks = [{
      ...mockTask,
      label: 'test1',
    }];
    spyOn(component.apiService, 'editTask').and.callFake(() => {
      return of({
        ...mockTask,
        label: 'test',
      });
    });
    spyOn(component.apiService, 'getTasks').and.callFake(() => {
      return of([{
        ...mockTask,
        label: 'test',
      }]);
    });

    component.onEdit({
      ...mockTask,
      label: 'test',
    });
    fixture.detectChanges();

    expect(component.tasks).toEqual([{
      ...mockTask,
      label: 'test',
    }]);
  }));
});
