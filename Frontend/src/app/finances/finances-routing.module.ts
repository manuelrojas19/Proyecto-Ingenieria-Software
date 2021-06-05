import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentIndexComponent } from './department-index/department-index.component';
import { FinancesHomeComponent } from './finances-home/finances-home.component';

const routes: Routes = [
  { path: '', component: FinancesHomeComponent},

  { path: 'departments', component: DepartmentIndexComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancesRoutingModule { }
