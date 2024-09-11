import { Component } from '@angular/core';
import { Supplier } from '../../../models/supplier/supplier';
import { SupplierService } from '../../../service/supplier.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { UtilsService } from '../../../service/utils.service';
import { FormSupplierComponent } from '../../../component/form-supplier/form-supplier.component';

@Component({
  selector: 'app-supplier',
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
    FormSupplierComponent,
  ],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss',
})
export class SupplierComponent {
  supplier: Supplier[] = [];
  complete = false;
  isVisible = false;
  isOkLoading = false;
  constructor(
    private readonly supplierService: SupplierService,
    private readonly utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }
  public open() {
    this.utilsService.openModal.next(true);
  }
  public loadSuppliers() {
    this.supplierService.findAll().subscribe({
      next: (res) => (this.supplier = res),
      complete: () => (this.complete = true),
    });
  }
}
