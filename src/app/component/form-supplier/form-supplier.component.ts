import { Component, EventEmitter, Output, signal } from '@angular/core';
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
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupplierService } from '../../service/supplier.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-form-supplier',
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
    ReactiveFormsModule,
  ],
  templateUrl: './form-supplier.component.html',
  styleUrl: './form-supplier.component.scss',
})
export class FormSupplierComponent {
  isVisible = false;
  isOkLoading = false;
  isConfirmLoading = false;
  @Output() createdSupplier = new EventEmitter();
  form = signal<FormGroup>(
    new FormGroup({
      name: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  );

  constructor(
    private readonly utilsService: UtilsService,
    private readonly supplierService: SupplierService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    this.utilsService.openModal
      .asObservable()
      .subscribe({ next: (value) => (this.isVisible = value) });
  }

  public close() {
    this.utilsService.openModal.next(false);
  }

  public submit() {
    if (this.form().value != null) {
      this.supplierService.save(this.form().value).subscribe({
        next: (res) => {
          console.log(res);
          this.utilsService.openModal.next(false);
          this.createdSupplier.emit();
        },
        error: (error) => console.log(error),
      });
      console.log(this.form().value);
    }
  }
}
