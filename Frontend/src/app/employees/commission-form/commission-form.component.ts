import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { CommissionsIndexComponent } from '../commissions-index/commissions-index.component';
import { CommissionService } from '../services/commission.service';

@Component({
  selector: 'app-commission-form',
  templateUrl: './commission-form.component.html',
  styleUrls: ['./commission-form.component.css']
})
export class CommissionFormComponent implements OnInit {
  authForm = new FormGroup({
    typeCommission: new FormControl('Transporte', [
      Validators.required,
    ]),
    beginDate: new FormControl('', [
      Validators.required,
    ]),
    endDate: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(
    private commissionService: CommissionService,
    private commissionIndexComponent: CommissionsIndexComponent,
    private modalComponent: ModalComponent,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.authForm.value);
    if (this.authForm.invalid) {
      if (this.authForm.get('beginDate').value === '')
        this.authForm.get('beginDate').setErrors({ requiredField: true })
      if (this.authForm.get('endDate').value === '')
        this.authForm.get('endDate').setErrors({ requiredField: true })
      return;
    }

    this.commissionService.createCommission(this.authForm.value).subscribe(() => {
      this.modalComponent.onCloseModal();
      this.commissionIndexComponent.getCommissions();
    });

  }

}
