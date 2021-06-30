import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Facture } from '../models/facture';

interface getFacturesByCommissionResponse {
  factures: Facture[];
}

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private http: HttpClient) { }

  getFacturesByCommission(commision: string) {
    return this.http.get<getFacturesByCommissionResponse>(environment.API_URL + '/employees/me/commissions/' + commision + '/factures');
  }

  getFactures(commision: string) {
    return this.http.get<Facture[]>(environment.API_URL + '/' + commision + '/facture');
  }

  getFacturesByEmployee(employee: string) {
    return this.http.get<Facture[]>(environment.API_URL + '/finances/' + employee + '/facture');

  }

  createFacture(facture: FormData) {
    return this.http.post(environment.API_URL + '/facture', facture);
  }

  downloadFacture(facture: string) {
    return this.http.get(environment.API_URL + '/facture/' + facture + '/download', { responseType: 'blob' });
  }
}
