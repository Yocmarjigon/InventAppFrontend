import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { Sale } from '../../../../../models/sale.interface';
import { NzScrollService } from 'ng-zorro-antd/core/services';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-details-sale-modal',
  standalone: true,
  imports: [
    NzModalModule,
    NzTableModule
  ],
  templateUrl: './details-sale-modal.component.html',
  styleUrl: './details-sale-modal.component.scss'
})
export class DetailsSaleModalComponent implements OnInit{
public isOkLoading: boolean = false;
@Input() isVisible: boolean = false;
@Input() sale!: Sale;
@Output() isClosed: EventEmitter<boolean> = new EventEmitter(this.isVisible);

ngOnInit(): void {
  console.log(this.sale)
}

close() {
this.isVisible = false;
this.isClosed.emit(this.isVisible)
}



}
