import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-facture-form',
  templateUrl: './facture-form.component.html',
  styleUrls: ['./facture-form.component.css']
})
export class FactureFormComponent implements OnInit {
  @Output() factureSubmit = new EventEmitter();
  @Input() error: HttpErrorResponse;
  formHasErrors: boolean;

  authForm = new FormGroup({
    description: new FormControl('Gastos de transporte', [
      Validators.required,
    ]),
    date: new FormControl('', [
      Validators.required,
    ]),
    amount: new FormControl('', [
      Validators.required,
    ]),
    facture: new FormControl('', [
      Validators.required,
    ]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit(): void {
  }

  get controls() {
    return this.authForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.authForm.patchValue({
        fileSource: file
      });
    }
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.formHasErrors = true;
      if (this.controls.amount.value > 99999999999 || this.controls.amount.value < 0) {
        this.authForm.get('amount').setErrors({ rangeError: true })
      }
      return;
    }

    this.formHasErrors = false;

    const formData = new FormData();
    formData.append('description', this.authForm.get('description').value);
    formData.append('date', this.authForm.get('date').value);
    formData.append('amount', this.authForm.get('amount').value);
    formData.append('facture', this.authForm.get('fileSource').value);

    this.factureSubmit.emit(formData);
    // this.factureService.createFacture(formData).subscribe({
    //   next: res => {
    //     this.modalComponent.onCloseModal();
    //     this.commissionController.getData();
    //   },
    //   error: error => {
    //     this.authForm.setErrors({ invalidFile: true })
    //   }
    // });

  }

}
