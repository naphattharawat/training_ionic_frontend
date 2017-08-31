import { AvatarProvider } from './../../providers/avatar/avatar';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Platform } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
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
  map: GoogleMap;
  mapElement: HTMLElement;
  lat: string;
  lng: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController, private avatarProvider: AvatarProvider,
    private alertController: AlertController
    , private googleMaps: GoogleMaps, private platform: Platform,
    private zone: NgZone
  ) {
    this.u = this.navParams.data
    this.hospcode = this.navParams.get('HOSPCODE');
    this.pid = this.navParams.get('PID');

    this.lat = this.navParams.get('LAT');
    this.lng = this.navParams.get('LNG');

    this.platform.ready().then(() => {
      this.loadMap();
    });

  }

  ionViewDidLoad() {
    this.loadMap();
  }
  async updatePerson() {
    const loading = this.loadingCtrl.create({
      content: 'Loading...'
    })
    try {
      loading.present()
      const resp = await this.avatarProvider.updatePerson(this.name, this.lname, this.sex, this.typearea, this.hospcode, this.pid, this.lat, this.lng)
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
  deleteAlertConfirm() {
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



  loadMap() {
    this.mapElement = document.getElementById('map');

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create(this.mapElement, mapOptions);

    this.map.setMapTypeId("MAP_TYPE_HYBRID")  //รูปแบบแผนที่
    this.map.setMyLocationEnabled(true); //ปุ่มมาปัจจุบัน
    this.map.setClickable(true);//คลิกแผนที่ได้

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        this.setCurrentLocation();

        this.map.on(GoogleMapsEvent.MAP_CLICK)
          .subscribe((latLng) => {
            this.zone.run(() => {
              this.lat = latLng.lat;
              this.lng = latLng.lng;
            });
            this.map.clear()
              .then(() => {
                this.setMarker(latLng);

              });
          });
        // Now you can use all methods safely.


      });
  }
  setCurrentLocation() {
    if (this.lat && this.lng) {

      this.map.setMarker({ lat: +this.lat, lng: +this.lng });
      this.map.setCameraTarget({ lat: +this.lat, lng: +this.lng })
    } else {
      this.map.getMyLocation().then((location) => {
        this.map.setCameraTarget(location.latLng);
      });
    }

  }
  setMarker(latLng: any) {

    this.map.addMarker({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: latLng
    })
      .then(marker => {
        marker.on(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(() => {

            // alert('clicked');
          });
      });
  }
}
