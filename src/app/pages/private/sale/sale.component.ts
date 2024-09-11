import { NzButtonModule } from 'ng-zorro-antd/button';
import { Component, OnInit } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormSaleComponent } from '../../../components/form-sale/form-sale.component';
import { Product } from '../../../models/product/product';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { Router } from '@angular/router';
import { ListProductsModalComponent } from "../../../components/list-products-modal/list-products-modal.component";
import { UtilsService } from '../../../service/utils.service';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [
    NzFlexModule,
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
    NzGridModule,
    ListProductsModalComponent
],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss',
})
export class SaleComponent implements OnInit {
  public products: Product[] = [];
  ngOnInit(): void {}

  constructor(
    private readonly router: Router,
    private readonly utilsService: UtilsService
  ) {}

  public redirectSaleList() {
    this.router.navigate(["sale-list"])
  }
  open(){
    this.utilsService.openModal.next(true)
  }
}
