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
import { Router } from '@angular/router';
import { DetailsSaleModalComponent } from './details-sale-modal/details-sale-modal.component';

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
    FormSaleComponent,
    DetailsSaleModalComponent,
  ],

  templateUrl: './sale-list.component.html',
  styleUrl: './sale-list.component.scss',
})
export class SaleListComponent {
  sales: Sale[] = [];
  complete = false;
  isVisibleDetails = false;
  isOkLoading = false;
  sale!: Sale;

  constructor(
    private readonly saleService: SaleService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    this.loadSale()
  }
  public loadSale() {
  this.saleService.findAll().subscribe({
      next: (res) => {
        this.sales = res;
        console.log(res);
      },
      complete: () => (this.complete = true),
    });
  }

  public redirectCreateSale() {
    this.router.navigate(['/sale']);
  }
  public closeModal(value: boolean) {
    this.isVisibleDetails = value;
  }
  public openModalDetails(sale: Sale) {
    this.isVisibleDetails = true;
    this.sale = sale;
  }
  public deleteSale(id: string) {
    this.saleService.delete(id).subscribe({
      next: (res) =>{
        console.log(res);
        this.loadSale()

      },
      error: (err) => console.log(err),
    });
  }
}
