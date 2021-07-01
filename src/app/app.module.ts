import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { NbThemeModule, NbTabsetModule, NbCardModule, NbDialogModule } from '@nebular/theme';
import { EmployeeListComponent } from './home/employee-list/employee-list.component';
import { AddEmployeeComponent } from './home/add-employee/add-employee.component';
import { EmployeeEditComponent } from './home/employee-list/employee-edit/employee-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    EmployeeEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    NbThemeModule.forRoot(),
    NbTabsetModule,
    NbCardModule,
    NbDialogModule.forRoot(),
    NbDialogModule.forChild()

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
