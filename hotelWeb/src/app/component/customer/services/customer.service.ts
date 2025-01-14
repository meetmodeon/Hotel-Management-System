import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from '../../../auth/component/storage/user-storage.service';
import { Observable } from 'rxjs';

const BASIC_URL="http://localhost:8080/";
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getRoom(pageNumber: number):Observable<any>{
      const token=UserStorageService.getToken();
      const headers=new HttpHeaders({
        'X-Requested-With' : 'XMLHttpRequest',
        'Content-Type':'application/json',
        'Authorization' : `Bearer ${token}`
      });
      return this.http.get(BASIC_URL + `api/customer/rooms/${pageNumber}`,{
        headers,
        responseType:'json'
      })
      
    }

    bookRoom(bookingDto: any):Observable<any>{
      const token=UserStorageService.getToken();
      const headers=new HttpHeaders({
        'X-Requested-With' : 'XMLHttpRequest',
        'Content-Type':'application/json',
        'Authorization' : `Bearer ${token}`
      });
      return this.http.post(BASIC_URL + `api/customer/book`,bookingDto,{
        headers,
        responseType:'json'
      })
      
    }

    getMyBookings(pageNumber: number):Observable<any>{
      const userId=UserStorageService.getUserId();
      const token=UserStorageService.getToken();
      const headers=new HttpHeaders({
        'X-Requested-With' : 'XMLHttpRequest',
        'Content-Type':'application/json',
        'Authorization' : `Bearer ${token}`
      });
      return this.http.get(BASIC_URL + `api/customer/bookings/${userId}/${pageNumber}`,{
        headers,
        responseType:'json'
      })
      
    }

}
