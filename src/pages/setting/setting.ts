import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private app: App
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  doLogout(){
    const nav = this.app.getRootNav()
    localStorage.removeItem('token')
    nav.setRoot(LoginPage)
  }
}
