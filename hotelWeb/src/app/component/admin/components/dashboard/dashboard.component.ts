import { Component, TemplateRef } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
 import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-dashboard',
  imports: [
    
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
  providers: [NzModalService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  currentPage=1;
  rooms:any[]=[];
  total:any;
actionEdit!: TemplateRef<void>;
actionDelete!: TemplateRef<void>;
  
  constructor(private adminService: AdminService,
    private message: NzMessageService,
    private modelService: NzModalService
  ){
    this.getRooms();
  }

  getRooms(){
    this.adminService.getRoom(this.currentPage-1).subscribe(res=>{
      console.log(res);
      this.rooms=res.roomDtoList;
      this.total=res.totalPages * 1;
    })
  }
  pageIndexChange(value:any){
    this.currentPage=value;
    this.getRooms();
  }
  showConfirm(roomId:number){
    this.modelService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Do you want to delete this room?',
      nzOkText: 'Delete',
      nzCancelText: 'Cancel',
      nzOnOk: ()=>this.deleteRoom(roomId)
    })
  }

  deleteRoom(roomId:number){
    this.adminService.deleteRoomById(roomId).subscribe(res=>{
      this.message.success(`Room Deleted Successfully`,{nzDuration: 5000});
      this.getRooms();

    },error=>{
      this.message.error(`${error?.error || 'Error deleting room'}`, { nzDuration: 5000 });
    })
  }
}
