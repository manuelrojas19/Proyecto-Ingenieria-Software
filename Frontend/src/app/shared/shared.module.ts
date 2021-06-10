import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { FactureIndexComponent } from './facture-index/facture-index.component';
import { ReportsByEmployeeComponent } from './reports-by-employee/reports-by-employee.component';

@NgModule({
  declarations: [
    ModalComponent,
    FactureIndexComponent,
    ReportsByEmployeeComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  exports: [
    ModalComponent,
    FactureIndexComponent,
    ReportsByEmployeeComponent,
  ]
})
export class SharedModule { }
