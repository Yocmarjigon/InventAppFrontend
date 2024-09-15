import { NzInputModule } from 'ng-zorro-antd/input';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Product } from '../../models/product/product';
import { UtilsService } from '../../service/utils.service';
import { ProductService } from '../../service/product.service';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-list-products-modal',
  standalone: true,
  imports: [
    NzButtonModule,
    NzModalModule,
    NzTableModule,
    NzSpaceModule,
    NzCheckboxModule,
    NzInputModule,
    NzIconModule,
    NzFlexModule,
  ],
  templateUrl: './list-products-modal.component.html',
  styleUrl: './list-products-modal.component.scss',
})
export class ListProductsModalComponent implements OnInit {
  product: Product[] = [];
  productsSale: Product[] = [];
  @Output() isAddProducts = new EventEmitter<Product[]>();
  isOkLoading = false;
  isVisible = false;
  isActive = false;

  constructor(
    private readonly utilsService: UtilsService,
    private readonly productService: ProductService
  ) {}

  ngOnInit(): void {
    this.utilsService.openModal
      .asObservable()
      .subscribe({ next: (res) => (this.isVisible = res) });
    this.productService
      .findAll()
      .subscribe({ next: (res) => (this.product = res) });
  }

  public addProductList(product: Product) {
    if(!this.productsSale.includes(product)){
      this.productsSale.push(product);
    }

  }

  public addProdcutSale() {
    this.isAddProducts.emit([...this.productsSale]);
    this.utilsService.openModal.next(false);
  }

  close() {
    this.utilsService.openModal.next(false);
  }
}
