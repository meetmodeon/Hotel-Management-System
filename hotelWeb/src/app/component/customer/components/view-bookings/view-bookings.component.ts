import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-view-bookings',
  imports: [
      CommonModule,
        NzTableModule,
        NzPaginationModule,
        NzTagModule,
        NzIconModule,
        NzCardModule,
  ],
  templateUrl: './view-bookings.component.html',
  styleUrl: './view-bookings.component.scss'
})
export class ViewBookingsComponent {
  currentPage:any=1;

  total:any;
  bookings: any;


  constructor(private customerService:CustomerService,
    private message:NzMessageService,

  ){
    this.getBookings();
  }

  getBookings(){
    this.customerService.getMyBookings(this.currentPage-1).subscribe(res=>{

      this.bookings=res.reservationDtoList;
      this.total=res.totalPages*5;
    }, error=>{
      this.message.error(`${error.error}`,{nzDuration:5000})
    })
  }

  pageIndexChange(value:any){
    this.currentPage=value;
    this.getBookings();
  }

}
