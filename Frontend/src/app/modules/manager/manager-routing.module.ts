import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommissionInfoComponent } from './commission-info/commission-info.component';
import { CommissionsIndexComponent } from './commissions-index/commissions-index.component';
import { EmployeesIndexComponent } from './employees-index/employees-index.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ReportsByEmployeeComponent } from './reports-by-employee/reports-by-employee.component';


const routes: Routes = [
  { path: '', component: ManagerHomeComponent },
  {
    path: 'commissions', component: CommissionsIndexComponent,
  },
  {
    path: 'commissions/:id', component: CommissionInfoComponent,
  },
  {
    path: 'employees', component: EmployeesIndexComponent,
  },
  {
    path: 'employees/reports/:employee', component: ReportsByEmployeeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
