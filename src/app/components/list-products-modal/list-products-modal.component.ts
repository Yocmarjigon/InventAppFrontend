import { NzInputModule } from 'ng-zorro-antd/input';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Product } from '../../models/product/product';
import { UtilsService } from '../../service/utils.service';
import { ProductService } from '../../service/product.service';
import { NzCheckboxComponent, NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { log } from 'ng-zorro-antd/core/logger';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
  ],
  templateUrl: './list-products-modal.component.html',
  styleUrl: './list-products-modal.component.scss',
})
export class ListProductsModalComponent implements OnInit {
  product: Product[] = [];
  productsSale: Product[] = [];
  @Output() isAddProducts = new EventEmitter<Product[]>();
  @ViewChildren(NzCheckboxComponent) checkbox!: QueryList<NzCheckboxComponent>;
  isOkLoading = false;
  isVisible = false;
  isActive = false;
  checkboxes: { nzChecked: boolean }[] = [];
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
      .subscribe({ next: (res) => {
        this.product = res;
        this.initializeCheckboxes()
      } });
  }

  public addProductList(product: Product, isChecked: boolean): void {
    if (isChecked) {
      if (!this.productsSale.includes(product)) {
        this.productsSale.push(product);
      }
    } else {
      const index = this.productsSale.indexOf(product);
      if (index > -1) {
        this.productsSale.splice(index, 1);
      }
    }
  }

  public addProdcutSale() {
    this.isAddProducts.emit([...this.productsSale]);
    this.utilsService.openModal.next(false);
  }
  private initializeCheckboxes(): void {
    this.checkboxes = this.product.map(() => ({ nzChecked: false }));
  }

  close() {
    this.utilsService.openModal.next(false);
  }
}
