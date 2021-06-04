import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { CommissionsIndexComponent } from './commissions-index/commissions-index.component';


@NgModule({
  declarations: [
    ManagerHomeComponent,
    CommissionsIndexComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
