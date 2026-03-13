import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone:true,
  imports :[FormsModule,CommonModule],
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit{

  employee:any={}
  list:any=[]

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getEmployee()
  }

  addEmployee(){
    this.api.addEmployee(this.employee).subscribe((res:any)=>{
      alert("Employee Added")
      this.getEmployee()
    })
  }

  getEmployee(){
    this.api.getEmployee().subscribe((res:any)=>{
      this.list=res.data
    })
  }

  //delete

  deleteEmployee(){
  this.api.deleteEmployee().subscribe((res:any)=>{
    alert("Employee Deleted")
    this.getEmployee()
  })
}

//update

editEmployee(emp:any){
  this.employee = {...emp}
}

updateEmployee(){
  this.api.updateEmployee(this.employee._id,this.employee)
  .subscribe((res:any)=>{
    alert("Employee Updated")
    this.employee={}
    this.getEmployee()
  })
}







}