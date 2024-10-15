import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier/supplier';
import { ResponseOk } from '../models/response-ok';
import { SupplierSave } from '../models/supplier/supplier-save';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private url = "https://inventappbackend.onrender.com/supplier"

  constructor(
    private readonly http: HttpClient
  ) { }

  public findAll(): Observable<Supplier[]>{
    return this.http.get<Supplier[]>(`${this.url}/find-all`);
  }

  public save(supplier: any):Observable<ResponseOk>{
    return this.http.post<ResponseOk>(`${this.url}/save`, supplier);
  }

  public delete(id:string): Observable<ResponseOk>{
    return this.http.delete<ResponseOk>(`${this.url}/delete/${id}`);
  }
}

