import { AvatarProvider } from './../../providers/avatar/avatar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the EditpersonPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editperson',
  templateUrl: 'editperson.html',
})
export class EditpersonPage {
  u: any;
  name: string;
  lname: string;
  sex: string;
  typearea: string;
  hospcode: string;
  pid: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private avatarProvider: AvatarProvider, private alertController: AlertController) {
    this.u = this.navParams.data
    this.hospcode = this.navParams.get('HOSPCODE');
    this.pid = this.navParams.get('PID');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditpersonPage');
  }
  async updatePerson() {
    const loading = this.loadingCtrl.create({
      content: 'Loading...'
    })
    try {
      loading.present()
      const resp = await this.avatarProvider.updatePerson(this.name, this.lname, this.sex, this.typearea, this.hospcode, this.pid)
      if (resp.ok) {
        this.navCtrl.pop();
      }
      else {
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
  async deletePerson() {
    const loading = this.loadingCtrl.create({
      content: 'กำลังลบ...'
    })
    try {
      loading.present()
      const resp = await this.avatarProvider.deletePerson(this.hospcode, this.pid)
      if (resp.ok) {
        this.navCtrl.pop();
      }
      else {
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
  deleteAlertConfirm(){
    let confirm = this.alertController.create({
      title: 'กรุณายืนยัน',
      message: 'คุณต้องการลบ ใช่ หรือ ไม่?',
      buttons: [
        
        {
          text: 'ใช่',
          handler: () => {
            this.deletePerson();
          }
        },
        {
          text: 'ไม่ใช่',
          handler: () => {
            // console.log('Disagree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}
