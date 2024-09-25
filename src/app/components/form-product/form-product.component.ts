import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { UtilsService } from '../../service/utils.service';
import { NzTextareaCountComponent } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Category } from '../../models/category/category';
import { CategoryService } from '../../service/category.service';
import { SupplierService } from '../../service/supplier.service';
import { Supplier } from '../../models/supplier/supplier';
import { FormCategoryComponent } from '../form-category/form-category.component';
import { ProductService } from '../../service/product.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-product',
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
    NzSelectModule,
    NzTextareaCountComponent,
    FormCategoryComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss',
})
export class FormProductComponent implements OnInit {
  categories?: Category[];
  suppliers?: Supplier[];
  isVisible = false;
  isOkLoading = false;
  isVisibleCategory = false;
  @Output() createdProduct = new EventEmitter();

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required]),
    supplier: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly utilsService: UtilsService,
    private readonly categoryService: CategoryService,
    private readonly supplierService: SupplierService,
    private readonly productService: ProductService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    /* this.utilsService.stateModal.subscribe({next: (value)=> this.isVisible = value}) */
    this.utilsService.openModal
      .asObservable()
      .subscribe({ next: (value) => (this.isVisible = value) });
    this.utilsService.openModalCategory
      .asObservable()
      .subscribe({ next: (value) => (this.isVisibleCategory = value) });
    this.loadCategory();
    this.supplierService
      .findAll()
      .subscribe({ next: (res) => (this.suppliers = res) });
  }
  public redirectSupplier(){
    this.router.navigate(["/supplier"])
  }
  public loadCategory() {
    this.categoryService.findAll().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => console.log(err),
    });
  }

  public close() {
    console.log(this.categories);
    this.utilsService.openModal.next(false);
  }
  public openModalCategory() {
    this.utilsService.openModalCategory.next(true);
  }

  public submit() {
    let product = {
      name: this.form.value.name,
      price: this.form.value.price,
      stock: this.form.value.stock,
      description: this.form.value.description,
      supplier:{
        id: this.form.value.supplier
      },
      category:{
        id: this.form.value.category
      }

    }
    this.productService.save(product).subscribe({
      next: (res) => {
        console.log(res);
        this.utilsService.openModal.next(false);
        this.createdProduct.emit();
      },
      error: (erro)=>{
        console.log(erro)
      }
    });
  }
}
