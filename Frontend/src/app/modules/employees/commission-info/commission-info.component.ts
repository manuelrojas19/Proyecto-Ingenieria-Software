import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommissionResponse } from 'src/app/core/interfaces/commission.response';
import { Pagination } from 'src/app/core/interfaces/pagination';
import { Commission } from 'src/app/core/models/commission';
import { Facture } from 'src/app/core/models/facture';
import { CommissionService } from 'src/app/core/services/commission.service';
import { FactureService } from 'src/app/core/services/facture.service';

@Component({
  selector: 'app-commission-info',
  templateUrl: './commission-info.component.html',
  styleUrls: ['./commission-info.component.css']
})
export class CommissionInfoComponent implements OnInit {
  commission: Commission;
  notFoundError: boolean = false;

  factures: Facture[];
  facturesPagination: Pagination;
  facturesPage: number = 1;

  eventSuccesfullyCreated: Subject<void> = new Subject<void>();
  error: Error = null;

  constructor(private commissionService: CommissionService,
    private factureService: FactureService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.commissionService.employeeGetCommissionById(this.route.snapshot.params.id).pipe(
      switchMap(res => {
        this.commission = res.commission;
        return this.factureService.employeeGetFacturesByCommission(this.commission.id, this.facturesPage);
      }),
    ).subscribe({
      next: res => {
        this.facturesPagination = res.meta.pagination;
        this.factures = res.factures;
      },
      error: (error) => {
        if (error.status === 404) {
          this.notFoundError = true;
        }
      }
    })
  }

  onChangeFacturePage(index: number) {
    this.facturesPage = index;
    this.getData();
  }

  onCreateFacture(formData: FormData) {
    this.factureService.employeeCreateFacture(this.commission.id, formData).subscribe({
      next: () => {
        this.getData();
        this.eventSuccesfullyCreated.next();
      },
      error: error => {
        this.error = error;
      },
    });
  }
}
