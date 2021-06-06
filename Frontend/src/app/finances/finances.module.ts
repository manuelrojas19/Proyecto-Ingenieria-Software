import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancesRoutingModule } from './finances-routing.module';
import { FinancesHomeComponent } from './finances-home/finances-home.component';
import { DepartmentIndexComponent } from './department-index/department-index.component';
import { CommissionIndexComponent } from './commission-index/commission-index.component';
import { CommissionInfoComponent } from './commission-info/commission-info.component';


@NgModule({
  declarations: [
    FinancesHomeComponent,
    DepartmentIndexComponent,
    CommissionIndexComponent,
    CommissionInfoComponent
  ],
  imports: [
    CommonModule,
    FinancesRoutingModule
  ]
})
export class FinancesModule { }
