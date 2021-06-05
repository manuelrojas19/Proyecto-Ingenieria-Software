import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancesRoutingModule } from './finances-routing.module';
import { FinancesHomeComponent } from './finances-home/finances-home.component';
import { DepartmentIndexComponent } from './department-index/department-index.component';


@NgModule({
  declarations: [
    FinancesHomeComponent,
    DepartmentIndexComponent
  ],
  imports: [
    CommonModule,
    FinancesRoutingModule
  ]
})
export class FinancesModule { }
