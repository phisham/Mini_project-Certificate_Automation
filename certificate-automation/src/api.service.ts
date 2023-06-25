import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl='http://localhost:3000';

  constructor(private http:HttpClient) { }

  getUser(userType:string){
    return this.http.get(this.baseUrl+'/get/'+userType);
  }

  acceptUser(id:string,body:any){
    return this.http.patch(this.baseUrl+'/acceptUser/'+id,body);
  }

  forward(id:string,body:any){
    return this.http.patch(this.baseUrl+'/forward/'+id,body);
  }

  getApplicationForms(id:string){
    return this.http.get(this.baseUrl+'/getApplicationForms/'+id);
  }
}
