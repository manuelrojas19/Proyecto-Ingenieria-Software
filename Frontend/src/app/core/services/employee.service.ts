import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Employee } from 'src/app/core/models/employee';
import { EmployeeResponse } from '../interfaces/employee.response';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  
  getEmployeeInfo() {
    return this.http.get<EmployeeResponse>(`${environment.API_URL}/employees/me`);
  }

  getEmployeeById(id: Number) {
    return this.http.get<Employee>(environment.API_URL + '/employee/' + id);
  }

  getEmployeesByDepartment(department: string) {
    return this.http.get<Employee[]>(environment.API_URL + '/' + department + '/employee');
  }
}
