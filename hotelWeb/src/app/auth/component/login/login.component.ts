import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import {  NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../services/auth/auth.service';
import { error } from 'console';
import { UserStorageService } from '../storage/user-storage.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
        NzFormModule,
        NzIconModule,
        NzFormModule,
        NzInputModule,
        RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;
  constructor(
    private fb:FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private authService: AuthService,
    private userStorage: UserStorageService
  ){}

  ngOnInit(){
    this.loginForm= this.fb.group({
      email: [null,[Validators.email,Validators.required]],
      password: [null,[Validators.required]]
    })
  }
  submitForm(){
    this.authService.login(this.loginForm.value).subscribe(
    (data:any)=>{
      console.log(data);
      if(data.userId !=null){
        const user= {
          id:data.userId,
          role:data.userRole
        }
        this.userStorage.saveUser(user);
        this.userStorage.saveToken(data.jwt);
        if(UserStorageService.isAdminLoggeIn()){
          this.router.navigateByUrl('/admin/dashboard');
        }else if(UserStorageService.isCustomerLoggedIn()){
          this.router.navigateByUrl('/customer/rooms');
        }
      }
      
      
    },
    (error:any)=>{
      this.message.error(`Bad credentials`,{nzDuration:5000});
    }
    
  )

  }

}
