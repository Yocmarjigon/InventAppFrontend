import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order/order';
import { ResponseOk } from '../models/response-ok';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = "https://inventappbackend.onrender.com/order"
  constructor(
    private readonly http: HttpClient
  ) { }

  public findAll():Observable<Order[]>{
    return this.http.get<Order[]>(`${this.url}/find-all`)
  }

  public save(order:Order):Observable<ResponseOk>{
    return this.http.post<ResponseOk>(`${this.url}/save`, order);
  }

  public delete(id:string):Observable<ResponseOk>{
    return this.http.delete(`${this.url}/delete/${this.url}`);
  }
}
