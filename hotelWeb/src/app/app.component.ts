import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { UserStorageService } from './auth/component/storage/user-storage.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule,
    CommonModule,
    NzBreadCrumbModule,NzIconModule,NzLayoutModule,NzMenuModule
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hotelWeb';
  isCollapsed = false;

  isCustomerLoggedIn:boolean=UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn:boolean= UserStorageService.isAdminLoggeIn();

  constructor(private router:Router){}

  ngOnInit(){
    this.router.events.subscribe(event=>{
      if(event.constructor.name==='NavigationEnd'){
        this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
        this.isAdminLoggedIn = UserStorageService.isAdminLoggeIn();
      }
    })
  }

  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl("/");
  }
}
