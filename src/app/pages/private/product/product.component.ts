import { Component, OnInit } from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Product } from '../../../models/product/product';
import { ProductService } from '../../../service/product.service';
import { UtilsService } from '../../../service/utils.service';
import { FormProductComponent } from '../../../components/form-product/form-product.component';
import { CategoryService } from '../../../service/category.service';
import { Category } from '../../../models/category/category';
import { FormCategoryComponent } from '../../../components/form-category/form-category.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-product',
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
    NzInputModule,
    NzFlexModule,
    NzPopconfirmModule,
  //--------------------
    FormProductComponent,
    FormCategoryComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  product: Product[] = [];
  categories: Category[] = [];
  complete = true;
  isVisible = false;
  isOkLoading = false;

  constructor(
    private readonly productService: ProductService,
    private readonly utilsService: UtilsService,
    private readonly categoryService: CategoryService
  ) {}
  ngOnInit(): void {

    this.loadProduct()

  }

  public openCreate() {
    this.utilsService.openModal.next(true)
  }
  public loadProduct(){
    this.productService.findAll().subscribe({
      next: (res) => {
        this.product = res;
        this.complete = false
      },
    });
  }
  public deleteProduct(id:string){
    this.productService.delete(id).subscribe({next: (res)=>{
      this.loadProduct()
    },
    error: (err)=>{
      console.log(err)
    }
  })
  }
}
