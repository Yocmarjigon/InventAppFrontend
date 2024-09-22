import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
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
import { ListProductsModalComponent } from '../../../components/list-products-modal/list-products-modal.component';
import { UtilsService } from '../../../service/utils.service';
import {
  NzInputNumberComponent,
  NzInputNumberModule,
} from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { ProductSold } from '../../../models/product-sold';

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
    NzInputNumberModule,
    NzIconModule,
    NzSpaceModule,
    ListProductsModalComponent,
    FormsModule,
  ],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss',
})
export class SaleComponent implements OnInit {
  @ViewChildren(NzInputNumberComponent)
  inputNumbers!: QueryList<NzInputNumberComponent>;
  public products: Product[] = [];
  public productsSale: ProductSold[] = [];
  public inputsValues: number[] = [];
  public priceTotal: number = 0;
  public priceTotalFormater = '0';


  constructor(
    private readonly router: Router,
    private readonly utilsService: UtilsService
  ) {}

  ngOnInit(): void {}

  public loadProducts(event: Product[]) {
    this.products = event;
    if(this.products.length >0){
      this.inputsValues = Array(this.products.length).fill(1);
    }
    this.calculationTotal();
  }

  public initializeInputsNumbers(index: number, value: number) {
    console.log("index: "+index + " "+ "value: " + value  )
    this.inputsValues[index] = value;
    this.calculationTotal()
    /* console.log(this.inputNumbers);
    this.inputsValues = this.inputNumbers.map((value): number => {
      let num = Number(value.);
      console.log(num);
      if (isNaN(num)) return 1;
      return num;
    });
    console.log(this.inputsValues); */
  }

  public calculationTotal() {
    this.priceTotal = 0;
    let mutiplyPrice = 0;

    let productsClone = this.products.map((product) => ({ ...product }));

    for (let i = 0; i < productsClone.length; i++) {
      productsClone[i].price = productsClone[i].price
        .slice(1, productsClone[i].price.length)
        .replace(/[.,]/g, '');

      let price = parseFloat(
        productsClone[i].price.slice(0, productsClone[i].price.length - 2)
      );

      mutiplyPrice = this.inputsValues[i] * price;
      console.log(mutiplyPrice);
      this.priceTotal = this.priceTotal + mutiplyPrice;

      let priceFormat = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
      }).format(this.priceTotal);
      this.priceTotalFormater = priceFormat;
    }
  }

  public generateSale() {
    for (let i = 0; i < this.products.length; i++) {
      let id = this.products[i].id;
      let number = this.inputsValues[i];

      let productsSold: ProductSold = {
        product: id,
        numberSale: number,
      };

      let exists = this.productsSale.some(
        (sale) => sale.product === productsSold.product
      );
      if (!exists) {
        this.productsSale.push(productsSold);
      }
    }
  }

  public redirectSaleList() {
    this.router.navigate(['sale-list']);
  }
  open() {
    this.utilsService.openModal.next(true);
  }
}
