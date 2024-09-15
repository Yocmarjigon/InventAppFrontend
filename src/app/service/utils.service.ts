import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product/product';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
public openModal = new BehaviorSubject(false);
public openModalCategory = new BehaviorSubject(false);
public products = new BehaviorSubject<Product[]>([]);
  constructor() { }


}
