import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, Event, RoutesRecognized } from '@angular/router'

@Component({
  selector: 'nb-tabset-showcase',
  styles: [`
    :host nb-tab {
      padding: 1.25rem;
    }
  `],
  // selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: any;
  username: any;
  constructor(private router: Router) {
  }

  Logout(){
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']); 
  }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser')
    if(this.currentUser == null){
      this.router.navigate(['login'])
    }
    else{
      const dummy = JSON.parse(this.currentUser)
      this.username = dummy["firstname"]
    }
  }

}
