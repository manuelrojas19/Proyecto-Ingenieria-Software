import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeesHomeComponent } from './employees-home/employees-home.component';

const routes: Routes = [
  {
    path: '', component: EmployeesHomeComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
