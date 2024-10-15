import { Product } from './../models/product/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseOk } from '../models/response-ok';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = "https://inventappbackend.onrender.com/product"
  constructor(
    private readonly http: HttpClient
  ) { }

  public findAll(): Observable<Product[]>{
    return this.http.get<Product[]>(this.url+ "/find-all")
  }

  public save(product: any):Observable<ResponseOk>{
    return this.http.post(this.url + "/save", product)
  }
  public delete(id:string):Observable<ResponseOk>{
    return this.http.delete<ResponseOk>(this.url + "/delete/" + id);
  }
}
