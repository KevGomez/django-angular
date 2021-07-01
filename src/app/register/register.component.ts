import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicService } from '../services/public.service';
import {first} from 'rxjs/operators'
import { catchError, map } from 'rxjs/operators'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm!: FormGroup;
  conditionStatus:any;
  wrongCred:any;
  constructor(private pService: PublicService, private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser') != null){
      this.router.navigate(['home']); 
    }
    
    this.myForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
    })
    this.myForm.statusChanges.subscribe(status=>{
      if(status="VALID"){
        this.conditionStatus = false
        this.wrongCred=false
      }
     });
  }

  // get f(){
  //   return this.myForm.controls;
  // }

  onSubmit(){
    if(this.myForm.status === "INVALID"){
      this.conditionStatus = true
      this.wrongCred=false
    }
    else{
      this.pService.register(this.myForm.value).pipe(first(),
      catchError((err) => {
        console.log('Error caught in controller: ', Object.values(err)[1])
        if(Object.values(err)[1] == 400){
          this.conditionStatus = false
          this.wrongCred=true
        };
        console.error(err);
        return err
        })
      ).subscribe(
        data=>{
        console.log("Register Success!", data);
        this.router.navigate(['login']); 
      })
    }
  }


}
