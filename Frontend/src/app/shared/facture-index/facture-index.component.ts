import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Facture } from 'src/app/core/models/facture';
import { FactureService } from 'src/app/core/services/facture.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-facture-index',
  templateUrl: './facture-index.component.html',
  styleUrls: ['./facture-index.component.css']
})
export class FactureIndexComponent implements OnInit {
  factures: Facture[];

  constructor(private factureService: FactureService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getFactures();
  }

  public getFactures(): void {
    this.factureService.getFactures(this.route.snapshot.params.id).subscribe(factures => {
      this.factures = factures;
    });
  }
}
