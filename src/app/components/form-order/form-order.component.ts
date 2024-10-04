import { Supplier } from './../../models/supplier/supplier';
import {
  Component,
  Input,
  signal,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SupplierService } from '../../service/supplier.service';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-form-order',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzModalModule,
    NzDatePickerModule,
    NzSelectModule,
    NzButtonModule
  ],
  templateUrl: './form-order.component.html',
  styleUrl: './form-order.component.scss',
})
export class FormOrderComponent implements OnInit {

  @Input() isVisible = false;
  isOkLoading = false;
  public suppliers: Supplier[] = [];
  @Output() isClosed = new EventEmitter(false);
  isConfirmLoading = false;
  date: any;

  constructor(private readonly supplierService: SupplierService) {}
  public form = new FormGroup({
      supplier: new FormControl(''),
      dateArribal: new FormControl(''),
    })


  ngOnInit(): void {
    this.loadSuppliers();
  }

  onChange($event: any) {
    throw new Error('Method not implemented.');
  }

  public loadSuppliers() {
    this.supplierService.findAll().subscribe({
      next: (res) => (this.suppliers = res),
      error: (err) => console.log(err),
    });
  }

  close() {
    this.isVisible = false;
    this.isClosed.emit(false);
  }

  submit() {
    console.log(this.form.value)
  }
}
