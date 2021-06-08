import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Facture } from 'src/app/core/models/facture';
import { FactureService } from 'src/app/core/services/facture.service';
import { saveAs } from 'file-saver';

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
    this.factureService.getFacturesByCommission(this.route.snapshot.params.id).subscribe(factures => {
      this.factures = factures;
    });
  }

  downloadFacture(id: string): void {
    this.factureService.downloadFacture(id).subscribe((res) => {
      saveAs(res, 'comprobante.xml');
    })
  }
}
