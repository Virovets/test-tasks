import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemComponent } from './components/item/item.component';
import { FilterComponent } from './components/filter/filter.component';


@NgModule({
  declarations: [
    TasksComponent,
    ItemComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TasksModule { }
