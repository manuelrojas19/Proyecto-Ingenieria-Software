import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Pagination } from 'src/app/core/interfaces/pagination';
import { Commission } from 'src/app/core/models/commission';
import { CommissionService } from 'src/app/core/services/commission.service';


@Component({
  selector: 'app-commissions-index',
  templateUrl: './commissions-index.component.html',
  styleUrls: ['./commissions-index.component.css']
})
export class CommissionsIndexComponent implements OnInit {
  commissions: Commission[];
  pagination: Pagination;
  page: number;

  eventSuccesfullyCreated: Subject<void> = new Subject<void>();
  onCreateError: Error = null;

  constructor(private commissionService: CommissionService) { }

  ngOnInit(): void {
    this.getCommissions();
  }

  public getCommissions(): void {
    this.commissionService.employeeGetCommissions(this.page).subscribe({
      next: res => {
        this.commissions = res.commissions;
        this.pagination = res.meta.pagination;
      }
    });
  }

  public onCreateCommission(commission: Commission): void {
    this.commissionService.createCommission(commission).subscribe(
      {
        next: () => {
          this.getCommissions();
          this.eventSuccesfullyCreated.next();
        },
        error: error => {
          this.onCreateError = error;
        }
      }
    );
  }

  public onChangeItem(index: number) {
    this.page = index;
    this.getCommissions();
  }
}
