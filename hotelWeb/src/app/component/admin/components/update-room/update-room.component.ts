import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../admin-service/admin.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-update-room',
  imports: [
     ReactiveFormsModule,
        NzButtonModule,
        NzFormModule,
        NzInputModule,
  ],
  templateUrl: './update-room.component.html',
  styleUrl: './update-room.component.scss'
})
export class UpdateRoomComponent {

   updateRoomForm!: FormGroup;
    id!:number;
    constructor(private fb: FormBuilder,
      private message: NzMessageService,
      private router: Router,
      private adminService: AdminService,
      private activatedRoute: ActivatedRoute,
    ){
     
    }
    ngOnInit(){
      this.updateRoomForm=this.fb.group({
          name:['',[Validators.required]],
          type:['',Validators.required],
          price:['',Validators.required]
    });
    const parmsId=this.activatedRoute.snapshot.params['id'];
    this.id=parmsId?+parmsId:0;

    if(this.id){
      this.getRoomById();
    }
  }
    submitForm(){
      this.adminService.updateRoomDetails(this.id,this.updateRoomForm.value).subscribe(res=>{
        this.message.success(`Room updated Successfully`,{nzDuration: 5000});
        this.router.navigateByUrl("/admin/dashboard");
      },error=>{
        this.message.error(`${error.error}`,{nzDuration:5000});
      })
    }

    getRoomById() {
      console.log(this.id);
      this.adminService.getRoomById(this.id).subscribe(
        (res) => {
          // Ensure res contains the data you need to patch the form
          this.updateRoomForm.patchValue({
            name: res.name,
            type: res.type,
            price: res.price
          });
        },
        (error) => {
          // Show error message if there's an issue
          this.message.error(`${error?.error || 'An error occurred'}`, { nzDuration: 5000 });
        }
      );
    }
}
