import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommissionResponse } from '../interfaces/commission.response';
import { CommissionsResponse } from '../interfaces/commissions.response';
import { Commission } from '../models/commission';


@Injectable({
  providedIn: 'root'
})
export class CommissionService {

  constructor(private http: HttpClient) { }


  // Employee Module
  
  employeeGetCommissions(page: number) {
    return this.http.get<CommissionsResponse>(`${environment.API_URL}/employees/me/commissions?page=${page}&limit=5`);
  }

  employeeGetCommissionById(id: number) {
    return this.http.get<CommissionResponse>(`${environment.API_URL}/employees/me/commissions/${id}`);
  }

  createCommission(commission: Commission) {
    return this.http.post(`${environment.API_URL}/employees/me/commissions`, commission);
  }



  getCommissionsByEmployeeId(id: string) {
    return this.http.get<Commission[]>(environment.API_URL + '/finances/employees/' + id + '/commission');
  }

  getCommissionsByManager() {
    return this.http.get<Commission[]>(environment.API_URL + '/manager/commission');
  }


  getCommission(id: string) {
    return this.http.get<Commission>(environment.API_URL + '/manager/commission/' + id);
  }

  updateCommission(id: string, commission: Commission) {
    return this.http.patch<Commission>(environment.API_URL + '/manager/commission/' + id, commission)
  }

  getCommissionsByDepartment(department: string) {
    return this.http.get<Commission[]>(environment.API_URL + '/finances/' + department + '/commission');
  }

  getCommissionById(id: string) {
    return this.http.get<Commission>(environment.API_URL + '/finances/commission/' + id);
  }

  updateCommissionFinances(id: string, commission: Commission) {
    return this.http.patch<Commission>(environment.API_URL + '/finances/commission/' + id, commission)
  }

  depositToCommission(id: string, monto: Number) {
    return this.http.patch<Commission>(environment.API_URL + '/deposit/commission/' + id, monto);
  }

}

