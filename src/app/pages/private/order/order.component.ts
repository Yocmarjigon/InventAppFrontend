import { Component, EventEmitter, Output } from '@angular/core';
import { Order } from '../../../models/order/order';
import { OrderService } from '../../../service/order.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormOrderComponent } from "../../../components/form-order/form-order.component";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    NzTableModule,
    NzDividerModule,
    NzSpinModule,
    NzAlertModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzSpaceModule,
    NzIconModule,
    FormOrderComponent
],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  order: Order[] = [];
  complete = false;
  isVisible = false;
  isOkLoading = false;

  constructor(private readonly supplierService: OrderService) {}

  ngOnInit(): void {
    this.loadOrder();
  }

  public loadOrder() {
    this.supplierService.findAll().subscribe({
      next: (res) => (this.order = res),
      complete: () => (this.complete = true),
    });
  }

  public openCreate() {
    this.isVisible = !this.isVisible;
  }
  public close(val: boolean){
    this.isVisible = val;
  }
}
