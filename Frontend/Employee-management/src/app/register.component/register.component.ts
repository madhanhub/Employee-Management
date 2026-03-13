import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  // user = {
  //   name: '',
  //   email: '',
  //   password: ''
  // };

   user:any={};

  constructor(private api:ApiService){}

  register(){
    this.api.register(this.user).subscribe((res:any)=>{
      alert("User Registered");
    })
  }

}