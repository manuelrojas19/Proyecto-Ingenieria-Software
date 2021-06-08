import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Commission } from '../models/commission';


@Injectable({
  providedIn: 'root'
})
export class CommissionService {

  constructor(private http: HttpClient) { }

  getCommissionsByEmployee() {
    return this.http.get<Commission[]>(environment.API_URL + '/employee/commission');
  }

  getCommissionsByIdAndEmployee(id: string) {
    return this.http.get<Commission>(environment.API_URL + '/employee/commission/' + id);
  }

  createCommission(commission: Commission) {
    return this.http.post(environment.API_URL + '/employee/commission', commission);
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


}
