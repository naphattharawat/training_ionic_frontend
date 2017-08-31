import { EditpersonPage } from './../editperson/editperson';
import { AddpersonPage } from './../addperson/addperson';
import { AvatarProvider } from '../../providers/avatar/avatar';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  avatars = []

  users = [
    { id: 1, name: 'สมชัย พิทักษ์กุล', age: '40' },
    { id: 2, name: 'สมชาย เชิงพงพัฒน์', age: '45' },
    { id: 3, name: 'สมควร ใจดี', age: '47' }
  ];
  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private avatarProvider: AvatarProvider,
    private loadingCtrl: LoadingController,
    private barcodeScanner: BarcodeScanner
  ) {

  }
  ionViewWillEnter() {
    this.getPerson()
    // console.log(this.avatars);
  }
  async getAvatars() {
    const loading = this.loadingCtrl.create({
      content: 'Loading...'
    })
    try {
      this.avatars = []
      loading.present()
      const resp = await this.avatarProvider.getAvatars()
      this.avatars = resp.results
      loading.dismiss()
    } catch (error) {
      loading.dismiss()
    }
  }
  async getPerson() {
    const loading = this.loadingCtrl.create({
      content: 'Loading...'
    })
    try {
      this.avatars = []
      loading.present()
      const resp = await this.avatarProvider.getPerson()
      this.avatars = resp
      loading.dismiss()
    } catch (error) {
      loading.dismiss()
    }
  }
  showme(u: any) {
    let alert = this.alertCtrl.create({
      title: 'กดทำไม',
      subTitle: 'กรุณาปิด',
      message: 'hello ' + u.name,
      buttons: ['ปิด']
    });
    alert.present();
  }
  edit(u: any) {
    this.navCtrl.push(EditpersonPage, u)
  }
  scanBarcode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log(barcodeData);
    }, (err) => {
      // An error occurred
    });
  }
  async search(event) {
    const query = event.target.value

      try {
        this.avatars = []
        const resp = await this.avatarProvider.getSearch(query)
        this.avatars = resp

      } catch (error) {

      }
    
  }
  addperson(){
    this.navCtrl.push(AddpersonPage);
  }
}