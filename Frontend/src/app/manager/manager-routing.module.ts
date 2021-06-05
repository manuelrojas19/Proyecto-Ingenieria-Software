import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommissionInfoComponent } from './commission-info/commission-info.component';
import { CommissionsIndexComponent } from './commissions-index/commissions-index.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';


const routes: Routes = [
  { path: '', component: ManagerHomeComponent },
  {
    path: 'commissions', component: CommissionsIndexComponent,
  },
  {
    path: 'commissions/:id', component: CommissionInfoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
