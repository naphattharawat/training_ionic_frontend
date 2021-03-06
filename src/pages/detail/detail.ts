import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.data)
    this.user = this.navParams.data
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
}
