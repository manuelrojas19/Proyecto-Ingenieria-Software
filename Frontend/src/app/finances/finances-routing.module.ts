import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommissionInfoComponent } from './commission-info/commission-info.component';
import { CommissionIndexComponent } from './commission-index/commission-index.component';
import { DepartmentIndexComponent } from './department-index/department-index.component';
import { FinancesHomeComponent } from './finances-home/finances-home.component';

const routes: Routes = [
  { path: '', component: FinancesHomeComponent },
  { path: 'departments', component: DepartmentIndexComponent },
  { path: ':department/commissions', component: CommissionIndexComponent },
  { path: ':department/commissions/:id', component: CommissionInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancesRoutingModule { }
