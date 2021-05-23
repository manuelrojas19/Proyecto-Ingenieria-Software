import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommissionsIndexComponent } from './commissions-index/commissions-index.component';

import { EmployeesHomeComponent } from './employees-home/employees-home.component';

const routes: Routes = [
  {
    path: '', component: EmployeesHomeComponent,
  }, 
  {
    path: 'commissions', component: CommissionsIndexComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
