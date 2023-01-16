import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TaskCategories } from '../../../constants/constant';
import { ITask } from '../../interfaces/task.interface';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  const mockTask: ITask = {
    label: 'bur111',
    description: '123',
    category: 'house',
    done: '15-1-2023',
    id: 4
  };

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemComponent ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder }
      ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;

    component.form = formBuilder.group({
      label: null,
      description: null,
      done: false,
      id: null,
      category: TaskCategories[0]
    });
    component.task = mockTask;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct formattedDate date', () => {
    const dateNow = new Date();
    const formattedDate = [
      dateNow.getDate(),
      dateNow.getMonth() + 1,
      dateNow.getFullYear(),
    ].join('-');
    expect(component.getDate()).toEqual(formattedDate);
  });

  it('should patch value from task to form', () => {
    component.patchValueToForm();
    expect(component.form.value).toEqual(mockTask);
  });

  it('should check if form is valid', () => {
    component.patchValueToForm();
    component.addTask();
    expect(component.form.valid).toBeTruthy();
  });

  it('should emit Add new task', () => {
    component.patchValueToForm();
    spyOn(component.add, 'emit');
    component.addTask();
    fixture.detectChanges();

    expect(component.add.emit).toHaveBeenCalledWith(mockTask);
  });

  it('should set "false" value to done field', () => {
    component.doneTask();
    expect(component.form.value.done).toEqual(false);
  });

  it('should set date value to done field', () => {
    component.form.patchValue(
      {
        ...mockTask,
        done: true
      }
    );
    component.doneTask();
    const dateNow = new Date();
    const formattedDate = [
      dateNow.getDate(),
      dateNow.getMonth() + 1,
      dateNow.getFullYear(),
    ].join('-');

    expect(component.form.value.done).toEqual(formattedDate);
  });
});
