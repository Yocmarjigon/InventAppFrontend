import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from '../models/sale.interface';
import { ProductSold } from '../models/product-sold';
import { ResponseOk } from '../models/response-ok';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private url = 'http://localhost:8080/sale';
  constructor(private readonly http: HttpClient) { }
  public findAll(): Observable<Sale[]>{
    return this.http.get<Sale[]>(`${this.url}/find-all`);
  }
  public save(produts: ProductSold[]): Observable<ResponseOk>{
    return this.http.post<ResponseOk>(`${this.url}/save`, produts);
  }
  public delete(id: string):Observable<ResponseOk>{
    return this.http.delete(`${this.url}/delete/${id}`);
  }
}
