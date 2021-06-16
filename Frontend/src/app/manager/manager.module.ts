import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { CommissionsIndexComponent } from './commissions-index/commissions-index.component';
import { CommissionInfoComponent } from './commission-info/commission-info.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeesIndexComponent } from './employees-index/employees-index.component';
import { ReportsByEmployeeComponent } from './reports-by-employee/reports-by-employee.component';


@NgModule({
  declarations: [
    ManagerHomeComponent,
    CommissionsIndexComponent,
    CommissionInfoComponent,
    EmployeesIndexComponent,
    ReportsByEmployeeComponent,
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    SharedModule,
  ]
})
export class ManagerModule { }
