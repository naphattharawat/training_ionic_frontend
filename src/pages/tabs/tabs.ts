import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DashboardPage } from '../dashboard/dashboard';
import { SettingPage } from '../setting/setting';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tabHome: any
  tabDashboard: any
  tabSetting: any
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabHome = HomePage
    this.tabDashboard = DashboardPage
    this.tabSetting = SettingPage
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }
}
