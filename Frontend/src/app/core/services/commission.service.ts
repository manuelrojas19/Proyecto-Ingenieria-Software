import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Commission } from '../models/commission';


@Injectable({
  providedIn: 'root'
})
export class CommissionService {

  constructor(private http: HttpClient) { }

  getCommissionsByManager() {
    return this.http.get<Commission[]>(environment.API_URL + '/manager/commission');
  }


  getCommissionsByEmployee() {
    return this.http.get<Commission[]>(environment.API_URL + '/employee/commission');
  }


  createCommission(commission: Commission) {
    return this.http.post(environment.API_URL + '/employee/commission', commission);
  }

  getCommission(id: string) {
    return this.http.get<Commission>(environment.API_URL + '/manager/commission/' + id);
  }

  updateCommission(id: string, commission: Commission) {
    return this.http.patch<Commission>(environment.API_URL + '/manager/commission/' + id, commission)

  }
}

