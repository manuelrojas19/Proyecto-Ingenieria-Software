import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Facture } from '../models/facture';

interface FacturesResponse {
  factures: Facture[];
  meta: {
    pagination: {
      total: number,
      pages: number,
      page: number,
      limit: number,
    },
  }
}

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private http: HttpClient) { }

  // employeeGetFacturesByCommission(commision: number, page: number) {
  //   return this.http.get<Facture[]>(`${environment.API_URL}/${commision}/facture?page=${page}&limit=5`);
  // }

  employeeGetFacturesByCommission(commission: number, page: number) {
    return this.http.get<FacturesResponse>(`${environment.API_URL}/employees/me/commissions/${commission}/factures?page=${page}&limit=6`);
  }

  employeeCreateFacture(commission: number, facture: FormData) {
    return this.http.post(`${environment.API_URL}/employees/me/commissions/${commission}/factures`, facture);
  }

  getFacturesByEmployee(employee: string) {
    return this.http.get<Facture[]>(environment.API_URL + '/finances/' + employee + '/facture');

  }

  downloadFacture(facture: string) {
    return this.http.get(environment.API_URL + '/facture/' + facture + '/download', { responseType: 'blob' });
  }
}
