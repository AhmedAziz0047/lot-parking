import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingServiceService {

  apiUrl="http://localhost:5000/api/"

  constructor( private http:HttpClient ){}

  getFreeSlotsNumber(type:string):Observable<any>{
    return this.http.get<any>(this.apiUrl + 'freeslots/' + type )
  }

  park(type:string, entryPoint:Number, hours:Number):Observable<any>{
    return this.http.get<any>(this.apiUrl + 'parkvehicle/' + entryPoint + '/' + type  + '/' + hours )
  }

  getOneTicket(id:string):Observable<any>{
    return this.http.get<any>(this.apiUrl + 'findoneticket/' + id )
  }

  unpark(id:string):Observable<any>{
    return this.http.post<any>(this.apiUrl + 'unparkvehicle/' + id, id  )
  }


}
