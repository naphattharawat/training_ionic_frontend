import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AvatarProvider {

  constructor(public http: Http) {
    console.log('Hello AvatarProvider Provider');
  }
  async getAvatars(){
    const resp = await this.http.get('https://randomuser.me/api/?results=10').toPromise()
    return resp.json() 
  }
  async getPerson(){
    const token = localStorage.getItem('token')
    const url = `http://192.168.100.112:3000/api/person?token=${token}`
    const resp = await this.http.get(url).toPromise()
    return resp.json() 
  }
  async getSearch(query:string){
    const token = localStorage.getItem('token')
    const url = `http://192.168.100.112:3000/api/person/search?token=${token}&query=${query}`
    const resp = await this.http.get(url).toPromise()
    return resp.json() 
  }
  async savePerson(name:string,lname:string,sex:string,typearea:string){
    const token = localStorage.getItem('token')
    const url = `http://192.168.100.112:3000/api/person/?token=${token}`
    const resp = await this.http.post(url,{
      name:name,
      lname:lname,
      sex:sex,
      typearea:typearea

    }).toPromise()
    return resp.json() 
  }
  async deletePerson(hospcode:string,pid:string){
    const token = localStorage.getItem('token')
    const url = `http://192.168.100.112:3000/api/person/${hospcode}/${pid}/?token=${token}`
    const resp = await this.http.delete(url).toPromise()
    return resp.json() 
  }
  async updatePerson(name:string,lname:string,sex:string,typearea:string,hospcode:string,pid:string){
    const token = localStorage.getItem('token')
    const url = `http://192.168.100.112:3000/api/person/?token=${token}`
    const resp = await this.http.put(url,{
      name:name,
      lname:lname,
      sex:sex,
      typearea:typearea,
      hospcode:hospcode,
      pid:pid
    }).toPromise()
    return resp.json() 
  }
}