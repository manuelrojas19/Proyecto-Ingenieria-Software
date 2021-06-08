import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FactureService } from 'src/app/core/services/facture.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { FacturesIndexComponent } from '../factures-index/factures-index.component';

@Component({
  selector: 'app-facture-form',
  templateUrl: './facture-form.component.html',
  styleUrls: ['./facture-form.component.css']
})
export class FactureFormComponent implements OnInit {

  authForm = new FormGroup({
    date: new FormControl('', [
      Validators.required,
    ]),
    factureDescription: new FormControl('', [
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

  constructor(
    private modalComponent: ModalComponent,
    private route: ActivatedRoute,
    private factureService: FactureService,
    private factureIndexController: FacturesIndexComponent) { }

  ngOnInit(): void {
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.authForm.patchValue({
        fileSource: file
      });
    }
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      if (this.authForm.get('date').value === '')
        this.authForm.get('date').setErrors({ requiredField: true })
      if (this.authForm.get('factureDescription').value === '')
        this.authForm.get('factureDescription').setErrors({ requiredField: true })
      if (this.authForm.get('amount').value === '')
        this.authForm.get('amount').setErrors({ requiredField: true })
      if (this.authForm.get('facture').value === '')
        this.authForm.get('facture').setErrors({ requiredField: true })
      return;
    }

    const formData = new FormData();

    formData.append('facture', this.authForm.get('fileSource').value);
    formData.append('commissionId', this.route.snapshot.params.id);
    formData.append('amount', this.authForm.get('amount').value);
    formData.append('factureDescription', this.authForm.get('factureDescription').value);
    formData.append('date', this.authForm.get('date').value);

    this.factureService.createFacture(formData).subscribe({
      next: res => {
        this.modalComponent.onCloseModal();
        this.factureIndexController.getFactures();
      },
      error: error => {
        this.authForm.setErrors({ invalidFile: true })
      }
    });

  }

}
