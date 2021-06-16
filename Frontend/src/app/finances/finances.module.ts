import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancesRoutingModule } from './finances-routing.module';
import { FinancesHomeComponent } from './finances-home/finances-home.component';
import { DepartmentIndexComponent } from './department-index/department-index.component';
import { CommissionIndexComponent } from './commission-index/commission-index.component';
import { CommissionInfoComponent } from './commission-info/commission-info.component';
import { SharedModule } from '../shared/shared.module';
import { ReportsByDepartmentComponent } from './reports-by-department/reports-by-department.component';
import { EmployeeIndexComponent } from './employee-index/employee-index.component';
import { ReportsByEmployeeComponent } from './reports-by-employee/reports-by-employee.component';


@NgModule({
  declarations: [
    FinancesHomeComponent,
    DepartmentIndexComponent,
    CommissionIndexComponent,
    CommissionInfoComponent,
    ReportsByDepartmentComponent,
    EmployeeIndexComponent,
    ReportsByEmployeeComponent
  ],
  imports: [
    CommonModule,
    FinancesRoutingModule,
    SharedModule,
  ]
})
export class FinancesModule { }
