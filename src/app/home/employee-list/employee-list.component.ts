import { Component, OnInit, TemplateRef } from '@angular/core';
import { PublicService } from '../../services/public.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { catchError, map } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, AsyncValidator } from '@angular/forms';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})

export class EmployeeListComponent implements OnInit {
  myForm!: FormGroup;
  vals: any={};
  username: any;
  currentUser: any;
  empName:any;
  empCode: any;
  mobile:any;
  id: any;

  constructor(private pService: PublicService, private router: Router, private modalService: NgbModal) { }

  open(content: any, name: any, code: any, mobile: any, id: any) {
    this.empName = name;
    this.empCode = code;
    this.mobile = mobile;
    this.id = id;

    this.myForm = new FormGroup({
      empCode: new FormControl(this.empCode, Validators.required),
      empName: new FormControl(this.empName, Validators.required),
      empMobile: new FormControl(this.mobile, Validators.required)
    });

    this.modalService.open(content)
    
  }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser') == null){
      this.router.navigate(['login']); 
    }
    else
    {
      this.currentUser = localStorage.getItem('currentUser');
      const items = JSON.parse(this.currentUser);
      this.username = items['firstname']
    }
    
    this.pService.getEmployeeList().pipe(
      catchError((err) => {
        console.log('Error caught in controller: ', Object.values(err)[1]);
        console.error(err);
        return err;
        }))
        .subscribe(data=>{
          console.log("Employee list receieved ", data);
          this.vals = data
    });
  }

  reload(){
    window.location.reload()
  }
  update(content:any){
    console.log("ID is ", this.id)
    this.currentUser = localStorage.getItem('currentUser');
    const items = JSON.parse(this.currentUser) 

    this.vals = {
      empCode: this.myForm.controls['empCode'].value,
              empName: this.myForm.controls['empName'].value,
              empMobile: this.myForm.controls['empMobile'].value,
              user: items['firstname']
    }

    this.pService.updateEmployee(this.vals, this.id)
            .pipe(first(),
            catchError((err) => {
            console.log('Error caught in controller: ', Object.values(err)[1]);
            console.error(err);
            return err;
            })
            )
            .subscribe(data=>{
              console.log("Employee edited successfully ", data);
            });

    this.modalService.dismissAll(content)
    this.reload()
  }

  delete(id:any){
    this.pService.deleteEmployee(id).pipe(
      catchError((err) => {
        console.log('Error caught in controller: ', Object.values(err)[1]);
        console.error(err);
        window.location.reload()
        return err;
        }))
        .subscribe(data=>{
          this.vals = data
          console.log(data)
          window.location.reload()
        });
  }

}
