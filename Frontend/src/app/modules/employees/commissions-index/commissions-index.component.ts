import { Component, OnInit } from '@angular/core';
import { range } from 'rxjs';
import { Commission } from '../../../core/models/commission';
import { CommissionService } from '../../../core/services/commission.service';

interface Pagination {
  total: number,
  pages: number,
  page: number,
  limit: number,
}

@Component({
  selector: 'app-commissions-index',
  templateUrl: './commissions-index.component.html',
  styleUrls: ['./commissions-index.component.css']
})
export class CommissionsIndexComponent implements OnInit {
  commissions: Commission[];
  pagination: Pagination;
  pages: number[];

  currentPage: number = 1;
  pagesToShow: number[];

  CELLS_NUMBER = 4;

  constructor(private commissionService: CommissionService) {
  }

  ngOnInit(): void {
    this.getCommissions();
  }

  slidePages(pages: number[]) {
    const page = this.currentPage;
    const cellNumber = this.CELLS_NUMBER;
    let top = cellNumber * Math.ceil((page / cellNumber));
    if (page > top) {
      top = top + 4;
    }
    const bot = top - 4 <= 0 ? 0 : top - 4;
    this.pagesToShow = pages.slice(bot, top);
  }

  onSelectIndex(index: number) {
    this.currentPage = index;
    this.getCommissions();
  }

  public getCommissions(): void {
    this.commissionService.getCommissionsForEmployee(this.currentPage).subscribe(res => {
      this.commissions = res.commissions;
      this.pagination = res.meta.pagination;
      this.pages = [...Array(res.meta.pagination.pages).keys()].map(i => i + 1);
      this.slidePages(this.pages);
    });
  }

}
