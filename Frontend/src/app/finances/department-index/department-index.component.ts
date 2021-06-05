import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/core/models/department';
import { DepartmentService } from 'src/app/core/services/department.service';

@Component({
  selector: 'app-department-index',
  templateUrl: './department-index.component.html',
  styleUrls: ['./department-index.component.css']
})
export class DepartmentIndexComponent implements OnInit {
  departments: Department[];

  constructor(private departmentService: DepartmentService) { }

   ngOnInit(): void {
    this.getDepartments();
  }

  public getDepartments(): void {
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
      console.log(departments);
    })
  }
}
