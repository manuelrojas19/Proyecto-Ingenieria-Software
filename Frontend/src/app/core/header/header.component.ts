import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Employee } from '../models/employee';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() employee: Employee;


  ngOnChanges(changes: SimpleChanges) {
   
  }

  ngOnInit(): void {
  }

}
