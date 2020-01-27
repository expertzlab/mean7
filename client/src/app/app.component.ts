import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient){

  }

  message
  title = 'client';
  user = 'Raj'

  ngOnInit(){

     this.http.get('/rest/welcome/'+this.user).subscribe((data)=>{
      this.message = data
     })

  }
}
