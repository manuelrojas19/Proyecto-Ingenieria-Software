import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancesHomeComponent } from './finances-home/finances-home.component';

const routes: Routes = [
  { path: '', component: FinancesHomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancesRoutingModule { }
