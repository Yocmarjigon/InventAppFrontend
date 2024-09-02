import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from '../models/sale.interface';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private url = 'http://localhost:8080/sale';
  constructor(private readonly http: HttpClient) { }
  public findAll(): Observable<Sale[]>{
    return this.http.get<Sale[]>(this.url + "/find-all");
  }
}
