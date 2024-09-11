import { Component } from '@angular/core';
import { FormSaleComponent } from '../../../../components/form-sale/form-sale.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Sale } from '../../../../models/sale.interface';
import { SaleService } from '../../../../service/sale.service';

@Component({
  selector: 'app-sale-list',
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
    FormSaleComponent
  ],

  templateUrl: './sale-list.component.html',
  styleUrl: './sale-list.component.scss'
})
export class SaleListComponent {
  sales: Sale[] = [];
  complete = false;
  isVisible = false;
  isOkLoading = false;
  constructor(private readonly saleService: SaleService) {}
  ngOnInit(): void {
    this.saleService.findAll().subscribe({
      next: (res) => (this.sales = res),
      complete: () => (this.complete = true),
    });
  }
  public openCreate() {
    this.isVisible = !this.isVisible;
  }
  public closeModal(value: boolean){
    this.isVisible = value
  }
}
