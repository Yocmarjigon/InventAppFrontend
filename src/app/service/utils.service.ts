import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
public openModal = new BehaviorSubject(false);
public openModalCategory = new BehaviorSubject(false);
  constructor() { }

}
