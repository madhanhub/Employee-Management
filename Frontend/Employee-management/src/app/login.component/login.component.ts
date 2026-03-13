import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

 user:any={};

  constructor(private api:ApiService){}

  login(){

    this.api.login(this.user).subscribe((res:any)=>{

      console.log("Login responce ",res);
      
      const token =res.user_token || res.token

      if(token){
      localStorage.setItem("token",token);

      alert("Login Success");
}else{
  alert('Token not received from server')
}
    })
  }

}