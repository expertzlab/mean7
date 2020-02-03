import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user = new User();
  result: any = {users: []};
  message = {errors: {age: {}, username: {}},  success: ''};
  messageStyle = '';
  constructor(private _http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log('User:', this.user)
    const options = {
      headers: new HttpHeaders( {'Content-Type' : 'application/json'})
    }
    this._http.post('/rest/user/register', this.user, options)
              .subscribe((resp) => {
                 this.result = resp
                 console.log('user:', this.result)
                 
                 if(this.result != null && !this.result.errors){
                   this.message = this.result
                   this.message.errors = {age: null, username: null}
                   this.message.success = "saved successfully"
                   this.messageStyle = 'alert alert-success'
                  } else if(this.result != null) {
                    console.log('save failed')
                   this.message = this.result
                   this.message.success = "Save failed"
                   this.messageStyle = 'alert alert-danger'
                  } 
              })
  }

  userEdit(uid) {
   for(let i = 0; i < this.result.users.length; i++) {
        if(uid == this.result.users[i].id) {
            this.user = this.result.users[i]
        }
   }
  }

  reset(){
    this.message = null
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