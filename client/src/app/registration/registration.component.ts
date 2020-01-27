import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user = new User()
  result: any = {users:[]}

  constructor(private _http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit(){
    
    const options = {
      headers: new HttpHeaders( {'Content-Type' : 'application/json'})
    }
    this._http.post('/rest/user/register', this.user, options)
              .subscribe((resp) => {
                 this.result = resp
                 console.log('user:', this.result)
              })
  }

  userEdit(uid) {
   for(let i = 0; i < this.result.users.length; i++) {
        if(uid == this.result.users[i].id) {
            this.user = this.result.users[i]
        }
   }
  }

  deleteUser(uid){
    for(let i = 0; i < this.result.users.length; i++) {
      if(uid == this.result.users[i].id) {
          this.result.users.splice(i,1)
      }
 }
  }
}

class User {

  name
  password
  profession
  id
}