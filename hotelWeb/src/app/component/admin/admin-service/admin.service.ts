import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../../auth/component/storage/user-storage.service';

const BASIC_URL="http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private http:HttpClient) { }

  postRoomDetails(roomDto:any):Observable<any>{
    const token=UserStorageService.getToken();
    const headers=new HttpHeaders({
      'X-Requested-With' : 'XMLHttpRequest',
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`
    });
    return this.http.post(BASIC_URL + "api/admin/room",roomDto,{
      headers,
      responseType:'json'
    })
    
  }

 getRoom(pageNumber: number):Observable<any>{
    const token=UserStorageService.getToken();
    const headers=new HttpHeaders({
      'X-Requested-With' : 'XMLHttpRequest',
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`
    });
    return this.http.get(BASIC_URL + `api/admin/rooms/${pageNumber}`,{
      headers,
      responseType:'json'
    })
    
  }

  getRoomById(id:number):Observable<any>{
    const token=UserStorageService.getToken();
    const headers=new HttpHeaders({
      'X-Requested-With' : 'XMLHttpRequest',
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`
    });
    return this.http.get(BASIC_URL + `api/admin/room/${id}`,{
      headers,
      responseType:'json'
    })
    
  }

  
  updateRoomDetails(id:number,roomDto:any):Observable<any>{
    const token=UserStorageService.getToken();
    const headers=new HttpHeaders({
      'X-Requested-With' : 'XMLHttpRequest',
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`
    });
    return this.http.put(BASIC_URL + `api/admin/room/${id}`,roomDto,{
      headers,
      responseType:'json'
    })
    
  }

  deleteRoomById(id:number):Observable<any>{
    const token=UserStorageService.getToken();
    const headers=new HttpHeaders({
      'X-Requested-With' : 'XMLHttpRequest',
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`
    });
    return this.http.delete(BASIC_URL + `api/admin/room/${id}`,{
      headers,
      responseType:'json'
    })
    
  }

  getReservations(pageNumber: number):Observable<any>{
    const token=UserStorageService.getToken();
    const headers=new HttpHeaders({
      'X-Requested-With' : 'XMLHttpRequest',
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`
    });
    return this.http.get(BASIC_URL + `api/admin/reservations/${pageNumber}`,{
      headers,
      responseType:'json'
    })
    
  }

  changeReservationStatus(reservationId: number,status:string):Observable<any>{
    const token=UserStorageService.getToken();
    const headers=new HttpHeaders({
      'X-Requested-With' : 'XMLHttpRequest',
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`
    });
    return this.http.get(BASIC_URL + `api/admin/reservation/${reservationId}/${status}`,{
      headers,
      responseType:'json'
    })
    
  }
  

}
