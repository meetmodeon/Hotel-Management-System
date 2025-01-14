import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AdminService } from '../../admin-service/admin.service';

@Component({
  selector: 'app-post-room',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    
  ],
  templateUrl: './post-room.component.html',
  styleUrl: './post-room.component.scss'
})
export class PostRoomComponent {

  roomDetailsForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private adminService: AdminService
  ){
    this.roomDetailsForm= this.fb.group({
      name:['',[Validators.required]],
      type:['',Validators.required],
      price:['',Validators.required]
    })
  }

  submitForm(){
    this.adminService.postRoomDetails(this.roomDetailsForm.value).subscribe(res=>{
      this.message
      .success(
        `Room Posted Successfull`,
        {nzDuration: 5000}
      );
      this.router.navigateByUrl('/admin/dashboard');
    }, error=>{
      this.message.error(`${error.error}`,{nzDuration: 5000})
    }
  )
  }

  
}

