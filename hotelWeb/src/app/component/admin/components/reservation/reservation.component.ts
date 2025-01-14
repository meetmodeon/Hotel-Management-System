import { Component } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import {NzTableModule} from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import {NzTagModule} from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { error } from 'console';

@Component({
  selector: 'app-reservation',
  imports: [
    CommonModule,
    NzTableModule,
    NzPaginationModule,
    NzTagModule,
    NzIconModule,
    NzCardModule,


  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {

  currentPage:any=1;
  total:any;
  reservations: any;

  constructor(private adminService: AdminService,
    private message:NzMessageService
  ){
    this.getReservations();
  }

  getReservations(){
    this.adminService.getReservations(this.currentPage-1).subscribe(res=>{
      console.log(res);
      this.reservations = res.reservationDtoList;
      this.total=res.totalPages*5;

    })
  }

  pageIndexChange(value:any){
    this.currentPage=value;
    this.getReservations();
  }

  changeReservationStatus(bookingId:number,status:string){
    this.adminService.changeReservationStatus(bookingId,status).subscribe(res=>{
      this.message.success(`Reservation status updated successfully`,{nzDuration: 5000});
      this.getReservations();
    },
  error=>{
    this.message.error(`${error.error}`,{nzDuration:5000});
  })
  }
}
