import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { CommissionsIndexComponent } from './commissions-index/commissions-index.component';
import { CommissionInfoComponent } from './commission-info/commission-info.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ManagerHomeComponent,
    CommissionsIndexComponent,
    CommissionInfoComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    SharedModule,
  ]
})
export class ManagerModule { }
