import { ProductSold } from './../../../models/product-sold';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
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
import { SaleService } from '../../../service/sale.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NotificationService } from '../../../service/notification.service';

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
  //Atributos
  @ViewChildren(NzInputNumberComponent)
  inputNumbers!: QueryList<NzInputNumberComponent>;
  public products: Product[] = [];
  public productsSale: ProductSold[] = [];
  public inputsValues: number[] = [];
  public priceTotal: number = 0;
  public priceTotalFormater = '0';


  constructor(
    private readonly router: Router,
    private readonly utilsService: UtilsService,
    private readonly saleService: SaleService,
    private readonly noti: NotificationService
  ) {}

  ngOnInit(): void {}

  //Función que carga de las ventas
  public loadProducts(event: Product[]) {
    this.products = event;
    if (this.products.length > 0) {
      this.inputsValues = Array(this.products.length).fill(1);
    }

    this.calculationTotal();
  }

  //Función que lee los valores de los inputs numbers
  public initializeInputsNumbers(index: number, value: number) {
    console.log('index: ' + index + ' ' + 'value: ' + value);
    this.inputsValues[index] = value;
    this.calculationTotal();
  }

  //Función para calcular el total de la venta
  public calculationTotal() {
    this.priceTotal = 0;
    let mutiplyPrice = 0;
    if (this.products.length !== 0) {
      let productsClone = this.products.map((product) => ({ ...product }));

      for (let i = 0; i < productsClone.length; i++) {
        productsClone[i].price = productsClone[i].price
          .slice(1, productsClone[i].price.length)
          .replace(/[.,]/g, '');

        let price = parseFloat(
          productsClone[i].price.slice(0, productsClone[i].price.length - 2)
        );

        mutiplyPrice = this.inputsValues[i] * price;
        this.priceTotal = this.priceTotal + mutiplyPrice;

        let priceFormat = new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 2,
        }).format(this.priceTotal);
        this.priceTotalFormater = priceFormat;
      }
    } else {
      this.priceTotalFormater = '0';
    }
  }

//Función para generar una venta
  public generateSale() {
    if (this.products.length !== 0) {
      let produts = {
        products: this.productsSale,
      };
      for (let i = 0; i < this.products.length; i++) {
        let id = this.products[i].id;
        let number = this.inputsValues[i];
        console.log(number);
        let productsSold: ProductSold = {
          product: {
            id: id,
          },
          numberSale: number,
        };

        let exists = this.productsSale.some(
          (sale) => sale.product === productsSold.product
        );
        if (!exists) {
          this.productsSale.push(productsSold);
        }
      }

      this.saveSale(produts);
      this.productsSale = [];
    } else {
      this.noti.notificationOpen(
        'Error',
        'La venta debe contener pro lo menos un producto',
        '#D91215'
      );
    }
  }
//Función que guarda la venta en base de datos
  private saveSale(products: any) {
    this.saleService.save(products).subscribe({
      next: (res) => {
        this.noti.notificationOpen(
          'OK',
          'La venta se creo correctamente',
          '#809730'
        );
       this.redirectSaleList()
      },
      error: (err) => {
        this.noti.notificationOpen("Erro", err.error.userMessage, "#D91215")
      },
    });
  }

  //Función que elimina un producto de la venta
  public deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.products = [...this.products];
    this.calculationTotal();
  }
  //Finción que refirige a las ventas
  public redirectSaleList() {
    this.router.navigate(['sale-list']);
  }
  //Función que abre el modal con los productos para agregar a la venta
  open() {
    this.utilsService.openModal.next(true);
  }
}
