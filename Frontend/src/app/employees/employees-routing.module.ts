import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommissionInfoComponent } from '../manager/commission-info/commission-info.component';
import { CommissionsIndexComponent } from './commissions-index/commissions-index.component';

import { EmployeesHomeComponent } from './employees-home/employees-home.component';

const routes: Routes = [
  {
    path: '', component: EmployeesHomeComponent,
  }, 
  {
    path: 'commissions', component: CommissionsIndexComponent,
    children: [
      {path:'id', component: CommissionInfoComponent}
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
