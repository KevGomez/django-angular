import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PublicService {
  api_url = 'http://localhost:8000/accounts'
  api_url_emp = 'http://localhost:8000/emp'
  constructor(private http: HttpClient) { }

  // getMessage():Observable<any[]>{
  //   return this.http.get<any>(this.api_url+'/index/');
  // }

  register(val:any={}){
    return this.http.post(this.api_url + '/register/',val).pipe(
      map(val => {
        return val;
      }), 
      catchError((err) => {
        console.log('Error caught in service')
        return throwError(err);    
      })
    );
  }

  addEmployee(val:any={}){
    return this.http.post(this.api_url_emp + '/add/',val).pipe(
      map(val => {
        return val;
      }), 
      catchError((err) => {
        console.log('Error caught in service')
        return throwError(err);    
      })
    );
  }

  getEmployeeList(){
    return this.http.get(this.api_url_emp + '/getlist/').pipe(
      map(val => {
        return val;
      }), 
      catchError((err) => {
        console.log('Error caught in service')
        return throwError(err);    
      })
    );
  }

  deleteEmployee(id:any){
    return this.http.delete(this.api_url_emp + '/delete/' + id +'/').pipe(
      map(val => {
        return val;
      }), 
      catchError((err) => {
        console.log('Error caught in service')
        return throwError(err);    
      })
    );
  }

  updateEmployee(val: any={}, id:any){
    return this.http.put(this.api_url_emp + '/update/' + id +'/', val).pipe(
      map(val => {
        return val;
      }), 
      catchError((err) => {
        console.log('Error caught in service')
        return throwError(err);    
      })
    );
  }
}
