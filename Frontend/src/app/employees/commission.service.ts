import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const ROOT_URL = 'http://localhost:3000/api/v1';

interface commission {
  id: number,
  typeCommission: string,
  isApproved: boolean,
  beginDate: Date,
  endDate: Date,
}

@Injectable({
  providedIn: 'root'
})
export class CommissionService {

  constructor(private http: HttpClient) { }

  getCommissionsByEmployee() {
    return this.http.get<commission[]>(ROOT_URL + '/commission');
  }
}
