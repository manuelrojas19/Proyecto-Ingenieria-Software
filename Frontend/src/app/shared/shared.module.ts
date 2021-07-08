import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { FactureIndexComponent } from './components/facture-index/facture-index.component';
import { CommissionDataTableComponent } from './components/commission-data-table/commission-data-table.component';
import { FactureDataTableComponent } from './components/facture-data-table/facture-data-table.component';
import { CommissionDetailsComponent } from './components/commission-details/commission-details.component';

@NgModule({
  declarations: [
    ModalComponent,
    FactureIndexComponent,
    CommissionDataTableComponent,
    FactureDataTableComponent,
    CommissionDetailsComponent,
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
    FactureDataTableComponent,
    CommissionDetailsComponent,
  ]
})
export class SharedModule { }
