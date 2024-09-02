import { Component, OnInit } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SaleService } from '../../../service/sale.service';
import { Sale } from '../../../models/sale.interface';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [NzTableModule, NzDividerModule, NzSpinModule, NzAlertModule],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent implements OnInit{
  sales: Sale[] =[];
  complete = false
  constructor(private readonly saleService: SaleService){

  }
  ngOnInit(): void {
      this.saleService.findAll().subscribe({
        next: (res)=> this.sales = res,
        complete: ()=> this.complete = true
      })
  }

}
