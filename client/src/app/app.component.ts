import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient, private _router: Router){

  }

  message
  title = 'client';
  user = 'Raj'

  ngOnInit(){

     this.http.get('/rest/welcome/'+this.user).subscribe((data)=>{
      this.message = data
     })

     if(localStorage.loginStatus === "true"){
      this._router.navigate(['/home'])
     } else {
      this._router.navigate(['/login'])
     }
  }
}
