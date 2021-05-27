import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Commission } from '../models/commission';


interface CommissionData {
  typeCommission: string,
  beginDate: Date,
  endDate: Date,
}

@Injectable({
  providedIn: 'root'
})
export class CommissionService {

  constructor(private http: HttpClient) { }

  getCommissionsByEmployee() {
    return this.http.get<Commission[]>(environment.API_URL + '/commission');
  }

  createCommission(commissionData: CommissionData) {
    return this.http.post(environment.API_URL + '/commission', commissionData);
  }
}

