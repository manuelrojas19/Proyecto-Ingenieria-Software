import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Employee } from 'src/app/core/models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployeeInfo() {
    return this.http.get<Employee>(environment.API_URL + '/employee/me');
  }
}
