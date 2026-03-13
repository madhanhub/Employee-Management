import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api/service';

@Component({
 selector:'app-dashboard',
 standalone:true,
 imports:[FormsModule,CommonModule],
 templateUrl:'./dashboard.component.html'
})
export class DashboardComponent implements OnInit{

 employee:any={}
 list:any=[]

 constructor(private api:ApiService){}

 ngOnInit(){
  this.getEmployee()
 }

 addEmployee(){

   this.api.addEmployee(this.employee).subscribe(()=>{
     alert("Employee Added")
     this.getEmployee()
   })

 }

 getEmployee(){

   this.api.getEmployee().subscribe((res:any)=>{
     this.list=res.data
   })

 }

 deleteEmployee(){

   this.api.deleteEmployee().subscribe(()=>{
     alert("Employee Deleted")
     this.getEmployee()
   })

 }

 

 

}