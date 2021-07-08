import { Component, OnInit, ElementRef, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() idModal: string;
  @Input() events: Observable<void>;
  @ViewChild('closeModal') closeModal: ElementRef;

  private eventsSubscription: Subscription;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => this.onCloseModal());
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  onCloseModal(): void {
    this.closeModal.nativeElement.click();
  }




}
