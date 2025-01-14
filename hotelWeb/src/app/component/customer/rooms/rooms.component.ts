import { Component, TemplateRef } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { UserStorageService } from '../../../auth/component/storage/user-storage.service';
import { FormsModule } from '@angular/forms';  // Import this for ngModel binding
import { NzModalModule } from 'ng-zorro-antd/modal';  // Required for nz-modal
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';  // Required for nz-range-picker
import { error } from 'console';

@Component({
  selector: 'app-rooms',
  imports: [
    FormsModule,
    NzModalModule,
    NzDatePickerModule,
    ReactiveFormsModule, // For forms if required elsewhere // Required for NG-ZORRO animations
        RouterModule, // For routerLink directive
        NzButtonModule, // For buttons (nz-button)
        NzCardModule, // For card components (nz-card, nz-card-meta)
        NzAvatarModule, // For avatars (nz-avatar)
        NzSkeletonModule, 
        CommonModule,
        NzIconModule,
        NzPaginationModule,
      
  ],
  providers:[NzModalService],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {
  currentPage=1;
    rooms:any[]=[];
    total:any;

    actionEdit!: TemplateRef<void>;
    actionDelete!: TemplateRef<void>;
    
    constructor(private customerService: CustomerService,
      private message: NzMessageService,
      private modelService: NzModalService
    ){
      this.getRooms();
    }
  
    getRooms(){
      this.customerService.getRoom(this.currentPage-1).subscribe(res=>{
        console.log(res);
        this.rooms=res.roomDtoList;
        this.total=res.totalPages * 1;
      })
    }
    pageIndexChange(value:any){
      this.currentPage=value;
      this.getRooms();
    }

    isVisibleMiddle=false;
    date:Date[]=[];
    checkInDate!: Date;
    checkOutDate!: Date;
    id!:number;

    onChange(result: Date[]){
      if(result.length===2){
        this.checkInDate=result[0];
        this.checkOutDate=result[1];
      }
    }
    handleCancelMiddle(){
      this.isVisibleMiddle= false;

    }

    handleOkMiddle():void{
      const obj={
        userId:UserStorageService.getUserId(),
        roomId:this.id,
        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate
      }
      console.log(obj);

      this.customerService.bookRoom(obj).subscribe(res=>{
        this.message.success(`Request submitted for approval!`,{nzDuration: 5000});
        this.isVisibleMiddle= false;

      },error=>{
        this.message.error(`${error.error}`,{nzDuration: 5000});
      })
    }

    showModalMiddle(id:number){
      this.id=id;
      this.isVisibleMiddle=true;
    }

    
}
