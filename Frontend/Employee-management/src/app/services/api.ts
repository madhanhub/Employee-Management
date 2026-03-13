import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = "http://localhost:9999";

  constructor(private http: HttpClient) { }

  getToken() : string | null{
    if (typeof window !=='undefined' && window.localStorage){
    return localStorage.getItem("token");}
    return null
  }


  getHeaders(){
    const token=this.getToken()
if(!token){
 console.error('Token missing')
  
}

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token ?? ''}`
      })
    }
  }

  // USER REGISTER
  register(data:any){
    return this.http.post(this.baseUrl+'/new/user',data);
  }

  // LOGIN
  login(data:any){
    return this.http.post(this.baseUrl+'/user/login',data);
  }

  // USER DETAILS
  getUser(){
    return this.http.get(this.baseUrl+'/get/user',this.getHeaders());
  }

  // EMPLOYEE CREATE
  addEmployee(data:any){
    return this.http.post(this.baseUrl+'/api/employee',data,this.getHeaders());
  }

  // EMPLOYEE LIST
  getEmployee(){
    return this.http.get(this.baseUrl+'/get/employee',this.getHeaders());
  }

  // UPDATE
  updateEmployee(data:any){
    return this.http.put(this.baseUrl+'/update/employee',data,this.getHeaders());
  }

  // DELETE
  deleteEmployee(){
    return this.http.delete(this.baseUrl+'/delete/employee',this.getHeaders());
  }

}