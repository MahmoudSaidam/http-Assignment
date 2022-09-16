import { Iusers } from './../users.models';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

   urlapi:string="https://reqres.in/api/users";



   Getusers(pages:any):Observable<any>{

   return this.http.get(`${this.urlapi}?page=${pages}`,
    {
      headers : new HttpHeaders({"Content-Type":"application/json"}),
      observe:'body',
     });

   }

   create(body:Iusers):Observable<Iusers>{
    return this.http.post<Iusers>(this.urlapi,body,{
      headers:new HttpHeaders({"Content-Type":"application/json"}),
      observe:'body'
    });
   }

   getupdate(body:any,id:any):Observable<any>{
    return this.http.put(`${this.urlapi}/${id}`,body,{
      headers:new HttpHeaders({"Content-Type":"application/json"}),
      observe:'body'
    });
   }



   getuserid(id:any):Observable<any>{
    return this.http.get<Iusers>(`${this.urlapi}/${id}`,  {
      headers:new HttpHeaders({"Content-Type":"application/json"}),
      observe:'body'
     }).pipe(
      map((res:any)=>{
        return res.data;
      })
     );
   }

   Remove(id:number):Observable<any>{
    return this.http.delete(`${this.urlapi}/${id}`);

   }


}
