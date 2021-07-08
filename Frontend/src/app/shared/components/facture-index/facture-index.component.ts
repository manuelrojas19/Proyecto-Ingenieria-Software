import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Facture } from 'src/app/core/models/facture';
import { FactureService } from 'src/app/core/services/facture.service';

interface Pagination {
  total: number,
  pages: number,
  page: number,
  limit: number,
}

@Component({
  selector: 'app-facture-index',
  templateUrl: './facture-index.component.html',
  styleUrls: ['./facture-index.component.css']
})
export class FactureIndexComponent implements OnInit {
  factures: Facture[];
  pagination: Pagination;
  page: number;

  constructor(private factureService: FactureService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getFactures();
  }

  public getFactures(): void {
    this.factureService.employeeGetFacturesByCommission(this.route.snapshot.params.id, this.page).subscribe(res => {
      this.factures = res.factures;
    });
  }

  onChangeItem(index: number) {
    this.page = index;
    this.getFactures();
  }
}
