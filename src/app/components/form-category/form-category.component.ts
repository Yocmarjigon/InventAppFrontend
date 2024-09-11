import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../models/category/category';

@Component({
  selector: 'app-form-category',
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
    ReactiveFormsModule
  ],
  templateUrl: './form-category.component.html',
  styleUrl: './form-category.component.scss'
})
export class FormCategoryComponent {
  isVisible = false;
  isOkLoading = false;
  @Output() createCategory = new EventEmitter();

  form = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  constructor(
    private readonly utilsService: UtilsService,
    private readonly categoryService: CategoryService
  ){

  }
  ngOnInit(): void {
    this.utilsService.openModalCategory.asObservable().subscribe({next: (value)=> this.isVisible = value})
  }
  public submit(){
    this.categoryService.save(this.form.value).subscribe({next: (res)=> {
      console.log(res)
      this.close()
      this.createCategory.emit()
    }
  })
    console.log(this.form.value)
  }
  public close(){
    this.utilsService.openModalCategory.next(false);
  }
}
