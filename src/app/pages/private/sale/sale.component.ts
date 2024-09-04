import { NzButtonModule } from 'ng-zorro-antd/button';
import { Component, OnInit } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SaleService } from '../../../service/sale.service';
import { Sale } from '../../../models/sale.interface';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-sale',
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
    NzIconModule
  ],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss',
})
export class SaleComponent implements OnInit {
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
}
