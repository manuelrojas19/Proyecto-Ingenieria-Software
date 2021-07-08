import { Component, Input, OnInit } from '@angular/core';
import { Commission } from 'src/app/core/models/commission';

@Component({
  selector: 'app-commission-details',
  templateUrl: './commission-details.component.html',
  styleUrls: ['./commission-details.component.css']
})
export class CommissionDetailsComponent implements OnInit {
  @Input() commission: Commission;
  
  constructor() { }

  ngOnInit(): void {
  }

}
