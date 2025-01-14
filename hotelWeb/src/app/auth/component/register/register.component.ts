import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import {NzMessageService} from 'ng-zorro-antd/message';
@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    RouterModule,

    
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm!: FormGroup;
  constructor(private fb:FormBuilder,
    private authService: AuthService,
    private message:NzMessageService,
    private router: Router,

  ){}

  ngOnInit(){
    this.registerForm=this.fb.group({
      email:[null,[Validators.email,Validators.required]],
      password: [null,[Validators.required]],
      name: [null,[Validators.required]]
    })
  }

  submitForm(){
    this.authService.register(this.registerForm.value).subscribe(res=>{
      if(res.id != null){
        this.message.success("Signup successfull",{nzDuration: 5000});
        this.router.navigateByUrl("/");
      }else{
        this.message.error(`${res.message}`,{nzDuration: 5000})
      }
    })
  }
}
