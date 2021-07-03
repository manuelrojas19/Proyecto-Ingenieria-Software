import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Facture } from 'src/app/core/models/facture';

interface Pagination {
  total: number,
  pages: number,
  page: number,
  limit: number,
}

const PAG_CELLS_NUMBER = 4;

@Component({
  selector: 'app-facture-data-table',
  templateUrl: './facture-data-table.component.html',
  styleUrls: ['./facture-data-table.component.css']
})
export class FactureDataTableComponent implements OnInit {
  @Input() factures: Facture[];
  @Input() pagination: Pagination;

  @Output() selectIndexEvent = new EventEmitter<number>();

  pages: number[];
  pagesToShow: number[];
  currentPage: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currentPage = this.pagination.page;
    this.pages = [...Array(this.pagination.pages).keys()].map(i => i + 1);
    this.slidePages();
  }

  onSelectIndex(index: number) {
    this.selectIndexEvent.emit(index);
  }

  slidePages() {
    let top = PAG_CELLS_NUMBER * Math.ceil((this.currentPage / PAG_CELLS_NUMBER));
    if (this.currentPage > top) {
      top = top + PAG_CELLS_NUMBER;
    }
    const bot = top - PAG_CELLS_NUMBER <= 0 ? 0 : top - PAG_CELLS_NUMBER;
    this.pagesToShow = this.pages.slice(bot, top);
  }
}
