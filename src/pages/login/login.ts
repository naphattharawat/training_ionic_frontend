import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginProvider } from '../../providers/login/login';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string
  password: string

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loginProvider: LoginProvider,
    private alertController: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async doLogin(){
    try {
      const resp = await this.loginProvider.doLogin(this.username,this.password)
      if(resp.ok) {
        localStorage.setItem('token', resp.token)
        this.navCtrl.push(TabsPage)
      }else {
        this.showAlert()
      }
    } catch (error) {
      
    }
  }
  
  showAlert(){
    let alert = this.alertController.create({
      title: 'ไม่สามารถล็อกอินได้',
      subTitle: 'ชื่อผู้ใช้งาน / รหัสผ่านไม่ถูกต้อง',
      buttons: ['ยกเลิก']
    })
    alert.present()
  }
}