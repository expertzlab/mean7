import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _http: HttpClient) { }

  ngOnInit() {

  }

  sendaRequest(){
    console.log('sending a request for jwt verification')
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'token ' + localStorage.token
      })
    };
    this._http.get('/rest/success', httpOptions).subscribe(() => {

    })
  }

}
