import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router) { }

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  registerMode = false

  ngOnInit(): void{
    const mrToken= this.cookieService.get('mr-token');
    if(mrToken){
      this.router.navigate(['/movies'])
    }
  }

  saveForm(){
    if(!this.registerMode){
      this.loginUser()
    } else {
      this.apiService.registerUser(this.authForm.value).subscribe({
        next:result=>{
          console.log('Result '+result)
          this.loginUser()
        },
        error:error=>{
          console.log(error)
        }
      });
    }
  }

  loginUser(){
    this.apiService.loginUser(this.authForm.value).subscribe({
      next:result=>{
        const token:any = Object.values(result)
        this.cookieService.set('mr-token', token[0]);
        this.router.navigate(['/movies'])
      },
      error:error=>{
        console.log(error)
      }
    });
  }

}