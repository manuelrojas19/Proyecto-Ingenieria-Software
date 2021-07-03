import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { FactureIndexComponent } from './facture-index/facture-index.component';
import { CommissionDataTableComponent } from './commission-data-table/commission-data-table.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ModalComponent,
    FactureIndexComponent,
    CommissionDataTableComponent,
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    ModalComponent,
    FactureIndexComponent,
    CommissionDataTableComponent,
  ]
})
export class SharedModule { }
