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
    return this.http.get<Commission[]>(environment.API_URL + '/commission');
  }

  getCommissionsByManager() {
    return this.http.get<Commission[]>(environment.API_URL + '/manager-commissions');
  }

  createCommission(commision: Commission) {
    return this.http.post(environment.API_URL + '/commission', commision);
  }
}

