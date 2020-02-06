import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {username: '', password: ''};

  constructor(private _http: HttpClient) { }

  ngOnInit() {
  }

  save(){
    console.log('user:', this.user)
    this._http.post('/rest/user/login', this.user).subscribe((result) => {
      console.log('Result:', result);
    })
  }
}
