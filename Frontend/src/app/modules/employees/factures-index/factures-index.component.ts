import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Facture } from 'src/app/core/models/facture';
import { FactureService } from 'src/app/core/services/facture.service';

@Component({
  selector: 'app-factures-index',
  templateUrl: './factures-index.component.html',
  styleUrls: ['./factures-index.component.css']
})
export class FacturesIndexComponent implements OnInit {
  factures: Facture[];

  constructor(private factureService: FactureService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getFactures();
  }

  public getFactures(): void {
    this.factureService.getFacturesByCommission(this.route.snapshot.params.id).subscribe(res => {
      this.factures = res.factures;
    });
  }
}
