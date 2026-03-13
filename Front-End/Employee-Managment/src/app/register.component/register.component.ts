import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  user:any = {};

  constructor(private api: ApiService, private router: Router){}

  register(){
    console.log(this.user);

    this.api.register(this.user).subscribe({
      next:(res:any)=>{
        alert("User Registered");
        this.router.navigate(['/login']);
      },
      error:(err)=>{
        console.error(err);
        alert("Register Failed");
      }
    });
  }

}