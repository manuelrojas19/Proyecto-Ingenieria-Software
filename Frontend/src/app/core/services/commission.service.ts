import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Commission } from '../models/commission';



interface CommissionsResponse {
  meta: {
    pagination: {
      total: number,
      pages: number,
      page: number,
      limit: number,
    }
  },
  commissions: [];
}

interface CommissionResponse {
  commission: Commission,
}


@Injectable({
  providedIn: 'root'
})
export class CommissionService {

  constructor(private http: HttpClient) { }

  getCommissionsForEmployee(page: number) {
    return this.http.get<CommissionsResponse>(`${environment.API_URL}/employees/me/commissions?page=${page}&limit=6`);
  }

  getCommissionsByEmployeeId(id: string) {
    return this.http.get<Commission[]>(environment.API_URL + '/finances/employees/' + id + '/commission');
  }

  getCommissionsByIdAndEmployee(id: string) {
    return this.http.get<CommissionResponse>(environment.API_URL + '/employees/me/commissions/' + id);
  }

  createCommission(commission: Commission) {
    return this.http.post(environment.API_URL + '/commission', commission);
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

