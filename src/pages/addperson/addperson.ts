import { AvatarProvider } from './../../providers/avatar/avatar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the AddpersonPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addperson',
  templateUrl: 'addperson.html',
})
export class AddpersonPage {
  name:string;
  lname:string;
  sex:string;
  typearea:string;

  constructor(public navCtrl: NavController,
    private loadingCtrl:LoadingController,
    public navParams: NavParams, 
    private avatarProvider: AvatarProvider,
    private alertController:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpersonPage');
  }
  async save() {
    const loading = this.loadingCtrl.create({
      content: 'Loading...'
    })
    try {
      loading.present()
      const resp = await this.avatarProvider.savePerson(this.name,this.lname,this.sex,this.typearea)
      if(resp.ok){
        this.navCtrl.pop();
      }
      else{
        let alert = this.alertController.create({
          title: 'error',
          subTitle: resp.error,
          buttons: ['ยกเลิก']
        })
        alert.present()

      }
      loading.dismiss()
    } catch (error) {
      loading.dismiss()
      let alert = this.alertController.create({
        title: 'error',
        subTitle: error.message,
        buttons: ['ยกเลิก']
      })
      alert.present()
    }

  }

}
