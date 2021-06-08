import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { FactureIndexComponent } from './facture-index/facture-index.component';

@NgModule({
  declarations: [
    ModalComponent,
    FactureIndexComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  exports: [
    ModalComponent,
    FactureIndexComponent,
  ]
})
export class SharedModule { }
