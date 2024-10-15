import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category/category';
import { ResponseOk } from '../models/response-ok';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = "https://inventappbackend.onrender.com/category"
  constructor(private readonly http: HttpClient) { }

  public findAll():Observable<Category[]>{
    return this.http.get<Category[]>(`${this.url}/find-all`);
  }

  public save(category: any): Observable<ResponseOk>{
    return this.http.post(this.url + "/save", category);
  }
}
