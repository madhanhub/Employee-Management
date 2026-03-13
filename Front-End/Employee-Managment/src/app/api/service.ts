import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl="http://localhost:9999"

  constructor(private http:HttpClient) {}

  getHeaders(){
    return {
      headers:new HttpHeaders({
        Authorization:"Bearer "+localStorage.getItem("token")
      })
    }
  }

  register(data:any){
    return this.http.post(this.baseUrl+"/new/user",data)
  }

  login(data:any){
    return this.http.post(this.baseUrl+"/user/login",data)
  }

  addEmployee(data:any){
    return this.http.post(this.baseUrl+"/api/employee",data,this.getHeaders())
  }

  getEmployee(){
    return this.http.get(this.baseUrl+"/get/employee",this.getHeaders())
  }

  deleteEmployee(){
    return this.http.delete(this.baseUrl+"/delete/employee",this.getHeaders())
  }

  updateEmployee(data:any){
    return this.http.put(this.baseUrl+"/update/employee",data,this.getHeaders())
  }

}