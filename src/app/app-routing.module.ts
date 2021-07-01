import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component'
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { EmployeeListComponent } from './home/employee-list/employee-list.component';
import { AddEmployeeComponent } from './home/add-employee/add-employee.component';
import { EmployeeEditComponent } from './home/employee-list/employee-edit/employee-edit.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent,
    children: [
      {path: 'add', component: AddEmployeeComponent},
      {
        path: 'getlist', component: EmployeeListComponent,
        children: [
          {path: 'edit/:id', component: EmployeeEditComponent},
        ]
      },
    ]
  },
  {
    path: 'register', component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
