import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { navigationCancelingError } from '@angular/router/src/shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  self = this
  user = {username: '', password: ''};
  _router:Router 
  constructor(private _http: HttpClient, router: Router) { 
      this._router = router
      console.log('router:injected',this._router == undefined)
  }

  ngOnInit() {
  }

  save(){
    console.log('user:', this.user)
    this._http.post('/rest/user/login', this.user)
    .subscribe({
      next(result:{token:''}){
        //alert("Login Result:"+JSON.stringify (result))
        console.log('identified authentication success')
        localStorage.loginStatus = true
        if( result.token ){
          localStorage.token = result.token
        }
        
        self.location.href = 'http://localhost:8080/'
      },
      error(err){
        console.log('error:', err)
        localStorage.loginStatus = false
        self.location.href = 'http://localhost:8080/'
      }
    })
      
  }
}