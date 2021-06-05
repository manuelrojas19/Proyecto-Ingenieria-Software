import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Department } from 'src/app/core/models/department';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getDepartments() {
    return this.http.get<Department[]>(environment.API_URL + '/finances/department');
  }
}
