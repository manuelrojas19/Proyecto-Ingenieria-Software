import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancesRoutingModule } from './finances-routing.module';
import { FinancesHomeComponent } from './finances-home/finances-home.component';


@NgModule({
  declarations: [
    FinancesHomeComponent
  ],
  imports: [
    CommonModule,
    FinancesRoutingModule
  ]
})
export class FinancesModule { }
