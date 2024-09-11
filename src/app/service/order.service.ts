import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = "http://localhost:8080/order"
  constructor(
    private readonly http: HttpClient
  ) { }
  public findAll():Observable<Order[]>{
    return this.http.get<Order[]>(this.url + "/find-all")
  }
}
