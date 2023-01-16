import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { ITask } from '../../interfaces/task.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskCategories } from '../../../constants/constant';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnChanges {
  @Input() task: ITask;
  @Output() edit: EventEmitter<ITask> = new EventEmitter();
  @Output() delete: EventEmitter<ITask> = new EventEmitter();
  @Output() add: EventEmitter<ITask> = new EventEmitter();
  @Output() done: EventEmitter<boolean> = new EventEmitter();
  public form: FormGroup;
  public taskCategories = TaskCategories;
  public isFormInvalid = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      label: [null, [Validators.required]],
      description: [null],
      done: [false, {disabled: !this.task}],
      id: [null],
      category: [TaskCategories[0]],
    });

    this.form.valueChanges.pipe().subscribe(() => {
      if (this.isFormInvalid) {
        this.isFormInvalid = this.form.invalid;
      }
    });

    this.patchValueToForm();
  }

  public patchValueToForm(): void {
    if (this.task !== null) {
      if (this.task.done) {
        this.form.get('done').patchValue(true);
      }

      this.form.patchValue(this.task);
    }
  }

  public getDate(): string {
    const today = new Date();
    return [
      today.getDate(),
      today.getMonth() + 1,
      today.getFullYear(),
    ].join('-');
  }

  public doneTask(): void {
    if (this.form.get('done').value) {
      this.form.get('done').patchValue(this.getDate());
    }

    this.done.emit(this.form.value);
  }

  public editTask(): void {
    this.isFormInvalid = this.form.invalid;
    if (this.form.invalid) {
      return;
    }

    this.edit.emit(this.form.value);
  }

  public deleteTask(): void {
    this.delete.emit(this.task);
  }

  public addTask(): void {
    this.isFormInvalid = this.form.invalid;
    if (this.form.invalid) {
      return;
    }

    this.add.emit(this.form.value);
  }
}
