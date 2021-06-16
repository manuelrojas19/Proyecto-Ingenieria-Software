import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommissionInfoComponent } from './commission-info/commission-info.component';
import { CommissionIndexComponent } from './commission-index/commission-index.component';
import { DepartmentIndexComponent } from './department-index/department-index.component';
import { FinancesHomeComponent } from './finances-home/finances-home.component';
import { ReportsByDepartmentComponent } from './reports-by-department/reports-by-department.component';
import { EmployeeIndexComponent } from './employee-index/employee-index.component';

const routes: Routes = [
  { path: '', component: FinancesHomeComponent },
  { path: 'departments', component: DepartmentIndexComponent },
  { path: ':department/commissions', component: CommissionIndexComponent },
  { path: ':department/commissions/:id', component: CommissionInfoComponent },
  { path: ':department/reports', component: ReportsByDepartmentComponent },
  { path: ':department/employees', component: EmployeeIndexComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancesRoutingModule { }
