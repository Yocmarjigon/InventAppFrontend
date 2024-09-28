import { Component, ViewChild } from '@angular/core';
import { FormSaleComponent } from '../../../../components/form-sale/form-sale.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Sale } from '../../../../models/sale.interface';
import { SaleService } from '../../../../service/sale.service';
import { Router } from '@angular/router';
import { DetailsSaleModalComponent } from './details-sale-modal/details-sale-modal.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';


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
    NzPopconfirmModule,
    FormSaleComponent,
    DetailsSaleModalComponent,
],

  templateUrl: './sale-list.component.html',
  styleUrl: './sale-list.component.scss',
})
export class SaleListComponent {
  sales: Sale[] = [];
  complete = true;
  isVisibleDetails = false;
  isOkLoading = false;
  sale!: Sale;
  constructor(
    private readonly saleService: SaleService,
    private readonly router: Router,
    private readonly modalService: NzModalService

  ) {}
  ngOnInit(): void {
    this.loadSale()
  }
  public loadSale() {
  this.saleService.findAll().subscribe({
      next: (res) => {
        this.sales = res;
      },
      complete: () => (this.complete = false),
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
    console.log(id)
/*     this.modalService.confirm({
      nzTitle: "Confirmar",
      nzContent: "Desea eliminar esta venta",
      nzOnOk: ()=>{
        this.saleService.delete(id).subscribe({
          next: (res) =>{
            console.log(res);
            this.loadSale()
            complete= true;
          },
          complete: ()=> complete = false,
          error: (err) => console.log(err),
        });
      },
      nzOkLoading: complete
    }) */
  }
}
