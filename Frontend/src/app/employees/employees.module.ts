import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesHomeComponent } from './employees-home/employees-home.component';
import { CommissionsIndexComponent } from './commissions-index/commissions-index.component';


@NgModule({
  declarations: [
    EmployeesHomeComponent,
    CommissionsIndexComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }
