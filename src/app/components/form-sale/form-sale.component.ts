import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-form-sale',
  standalone: true,
  imports: [
    NzButtonModule,
    NzModalModule,
    NzFormModule,
  ],
  templateUrl: './form-sale.component.html',
  styleUrl: './form-sale.component.scss'
})
export class FormSaleComponent {
  @Input() isVisible = false;
  @Output() notVisible = new EventEmitter()
  isOkLoading = false;

  public openCreate() {
    this.isVisible = !this.isVisible;

  }
  public closeModal(){
    this.notVisible.emit(false)
    this.isVisible = false
  }
}
