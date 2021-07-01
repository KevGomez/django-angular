import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AsyncValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {first} from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'
import { empty } from 'rxjs';
import { flatten } from '@angular/compiler';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // myForm: FormGroup;
  myForm!: FormGroup;
  sendData: any={};
  handleError:any;
  checkCurrent: any;
  conditionStatus:any;
  wrongCred:any;
  constructor(private aService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser') != null){
      this.router.navigate(['home']); 
    }

    this.myForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.myForm.statusChanges.subscribe(status=>{
      if(status="VALID"){
        this.conditionStatus = false
        this.wrongCred=false
      }
    }
    )
  }

  // get f(){
  //   return this.myForm.controls;
  // }

  Logout(){
    localStorage.removeItem('currentUser');
  }

  onSubmit(){
    
        if(this.myForm.status === "INVALID"){
          this.conditionStatus = true
          this.wrongCred=false
        }
        else{
          this.aService.login(this.myForm.controls['username'].value, this.myForm.controls['password'].value)
          .pipe(first(),
          catchError((err) => {
          console.log('Error caught in controller: ', Object.values(err)[1]);
          if(Object.values(err)[1] == 400){
            this.conditionStatus = false
            this.wrongCred=true
          };
          console.error(err);
          return err;
          })
        )
        .subscribe(data=>{
          console.log("Login Success with: ", data);
          this.router.navigate(['home']); 
        });
          
        }

  } 

}
