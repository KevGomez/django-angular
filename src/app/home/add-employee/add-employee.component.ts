import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AsyncValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicService } from '../../services/public.service';
import {first} from 'rxjs/operators'
import { catchError, map } from 'rxjs/operators'

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  myForm!: FormGroup;
  sendData: any={};
  handleError:any;
  checkCurrent: any;
  conditionStatus:any;
  wrongEmpCode:any;
  vals: any={};
  success: any;
  currentUser: any;
  constructor(private pService: PublicService, private router: Router) {
  }

  ngOnInit(): void {
    // To get the employee list
    if(localStorage.getItem('currentUser') == null){
      this.router.navigate(['login']); 
    }
    this.myForm = new FormGroup({
      empCode: new FormControl('', Validators.required),
      empName: new FormControl('', Validators.required),
      empMobile: new FormControl('', Validators.required)
    });

    this.myForm.statusChanges.subscribe(status=>{
      if(status="VALID"){
        this.conditionStatus = false
        this.wrongEmpCode=false
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

        this.currentUser = localStorage.getItem('currentUser');
        const items = JSON.parse(this.currentUser) 

        if(this.myForm.status === "INVALID"){
          this.conditionStatus = true
          this.wrongEmpCode=false
        }
        else{
            this.vals= {
              empCode: this.myForm.controls['empCode'].value,
              empName: this.myForm.controls['empName'].value,
              empMobile: this.myForm.controls['empMobile'].value,
              user: items['firstname']
            };
            this.pService.addEmployee(this.vals)
            .pipe(first(),
            catchError((err) => {
            console.log('Error caught in controller: ', Object.values(err)[1]);
            if(Object.values(err)[1] == 400){
              this.conditionStatus = false
              this.wrongEmpCode=true
            };
            console.error(err);
            return err;
            })
            )
            .subscribe(data=>{
              console.log("Employee added successfully ", data);
              this.success = true
              window.location.reload()
            });
          
        }

  } 

}
