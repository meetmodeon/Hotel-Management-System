import { Routes } from '@angular/router';
import path from 'path';
import { RegisterComponent } from './auth/component/register/register.component';
import { LoginComponent } from './auth/component/login/login.component';
import { CustomerComponent } from './component/customer/customer.component';
import { AdminComponent } from './component/admin/admin.component';
import { DashboardComponent } from './component/admin/components/dashboard/dashboard.component';
import { RoomsComponent } from './component/customer/rooms/rooms.component';
import { PostRoomComponent } from './component/admin/components/post-room/post-room.component';
import { UpdateRoomComponent } from './component/admin/components/update-room/update-room.component';
import { ReservationComponent } from './component/admin/components/reservation/reservation.component';
import { ViewBookingsComponent } from './component/customer/components/view-bookings/view-bookings.component';

export const routes: Routes = [
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'',
        component:LoginComponent
    },
    {
        path:'customer',
        component:CustomerComponent,
    },
    {
        path:'admin',
        component:AdminComponent
    },
    {
        path:'admin/dashboard',
        component:DashboardComponent
    },
    {
        path:'customer/rooms',
        component:RoomsComponent
    },
    {
        path:'admin/room',
        component:PostRoomComponent
    },
    {
        path:"admin/room/:id/edit",
        component:UpdateRoomComponent
    },
    {
        path:'customer/rooms',
        component:RoomsComponent,
    },
    {
        path:'admin/reservation',
        component:ReservationComponent
    },
    {
        path:'customer/bookings',
        component:ViewBookingsComponent
    }
  
];
