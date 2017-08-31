import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  @ViewChild('lineCanvas') public lineCanvas: ElementRef
  lineChart: any
  @ViewChild('lineCanvas1') public lineCanvas1: ElementRef
  lineChart1: any

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  rand(){
    let rand = Math.floor(Math.random()*100)+1
    return rand
  }

  ionViewDidLoad() {    
    this.lineChart = new Chart(this.lineCanvas.nativeElement,{
      type: 'pie',
      data: {
        datasets: [{
          data: [this.rand(), this.rand(), this.rand()],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ]
      }
    })
    this.lineChart1 = new Chart(this.lineCanvas1.nativeElement, {
      type: 'line',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [this.rand(),this.rand(),this.rand(),this.rand(),this.rand(),this.rand()],
          backgroundColor: [
            'gray'
          ],
          borderColor: [
            'red'
          ],
          borderWidth: 1
        }]
      }
    })
  }
}
