import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommissionService } from 'src/app/core/services/commission.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { CommissionInfoComponent } from '../commission-info/commission-info.component';

@Component({
  selector: 'app-deposit-form',
  templateUrl: './deposit-form.component.html',
  styleUrls: ['./deposit-form.component.css']
})
export class DepositFormComponent implements OnInit {
  authForm = new FormGroup({
    amount: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(
    private modalComponent: ModalComponent,
    private commissionService: CommissionService,
    private commissionController: CommissionInfoComponent,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

  }

  onSubmit(): void {

    if (this.authForm.invalid) {
      if (this.authForm.get('amount').value === '') {
        this.authForm.get('amount').setErrors({ requiredField: true });
        return;
      }
      this.authForm.get('amount').setErrors({ rangeError: true })
      return;
    }
    if (this.authForm.get('amount').value > 99999999999 || this.authForm.get('amount').value < 0) {
      this.authForm.get('amount').setErrors({ rangeError: true })
      return
    }

    this.commissionService.depositToCommission(this.route.snapshot.params.id, this.authForm.value).subscribe({
      next: res => {
        this.modalComponent.onCloseModal();
        this.commissionController.getCommission();
      },
      error: error => {
        this.authForm.setErrors({ invalidFile: true })
      }
    });
  }

}
