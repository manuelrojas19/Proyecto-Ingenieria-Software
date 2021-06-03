import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommissionsIndexComponent } from './commissions-index/commissions-index.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';


const routes: Routes = [
  { path: '', component: ManagerHomeComponent },
  {
    path: 'commissions', component: CommissionsIndexComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
