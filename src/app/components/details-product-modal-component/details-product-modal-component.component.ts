import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Product } from '../../models/product/product';

@Component({
  selector: 'app-details-product-modal-component',
  standalone: true,
  imports: [
    NzModalModule,
    NzTableModule
  ],
  templateUrl: './details-product-modal-component.component.html',
  styleUrl: './details-product-modal-component.component.scss'
})
export class DetailsProductModalComponentComponent {
  public isOkLoading: boolean = false;
  @Input() isVisible: boolean = false;
  @Input() product!: Product;
  @Output() isClosed: EventEmitter<boolean> = new EventEmitter(this.isVisible);

  ngOnInit(): void {
    console.log(this.product)
  }

  close() {
  this.isVisible = false;
  this.isClosed.emit(this.isVisible)
  }

}
