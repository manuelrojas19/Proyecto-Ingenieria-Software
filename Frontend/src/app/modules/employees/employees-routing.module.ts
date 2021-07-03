import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommissionInfoComponent } from './commission-info/commission-info.component';
import { CommissionsIndexComponent } from './commissions-index/commissions-index.component';

import { EmployeesHomeComponent } from './employees-home/employees-home.component';
import { FacturesIndexComponent } from './factures-index/factures-index.component';

const routes: Routes = [
  { path: 'home', component: EmployeesHomeComponent, },
  { path: 'commissions', component: CommissionsIndexComponent, },
  {
    path: 'commissions/:id', component: CommissionInfoComponent,
    children: [{
      path: '', component: FacturesIndexComponent,
    }]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
