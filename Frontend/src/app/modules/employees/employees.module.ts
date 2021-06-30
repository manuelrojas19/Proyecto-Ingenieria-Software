import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesHomeComponent } from './employees-home/employees-home.component';
import { CommissionsIndexComponent } from './commissions-index/commissions-index.component';
import { SharedModule } from '../../shared/shared.module';
import { CommissionFormComponent } from './commission-form/commission-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommissionInfoComponent } from './commission-info/commission-info.component';
import { FacturesIndexComponent } from './factures-index/factures-index.component';
import { FactureFormComponent } from './facture-form/facture-form.component';


@NgModule({
  declarations: [
    EmployeesHomeComponent,
    CommissionsIndexComponent,
    CommissionFormComponent,
    CommissionInfoComponent,
    FacturesIndexComponent,
    FactureFormComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class EmployeesModule { }
