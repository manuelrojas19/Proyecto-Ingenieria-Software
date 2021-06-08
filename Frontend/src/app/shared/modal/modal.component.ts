import { Component, OnInit, ElementRef, Output, EventEmitter, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() idModal: string;
  @ViewChild('closeModal') closeModal: ElementRef;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
  }

  onCloseModal(): void {
    this.closeModal.nativeElement.click();
  }




}
