import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginProvider {

  constructor(public http: Http) {

  }

  async doLogin(username: string, password: string) {
    const url = 'http://192.168.100.112:3000/login' // ถ้าใช้ในโทรศัพท์ให้ใส่ ip เครื่อง/Login
    const resp = await this.http.post(url, {
      username: username,
      password: password
    }).toPromise()

    return resp.json()
  }
}
