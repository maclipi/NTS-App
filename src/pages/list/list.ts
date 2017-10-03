import { Component,OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

import {$WebSocket} from 'angular2-websocket/angular2-websocket'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {


  userName:string;
  userPic:string;
  publicDeals: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  }

  ngOnInit(){
var pubArray =[];

    let ws = new $WebSocket('ws://localhost:8080');

    (ws.onMessage(
      (msg: MessageEvent)=> {
          console.log("onMessage ", msg.data);
          this.publicDeals.push(""+msg.data+"");
    },
    
  ));

  

  var data = JSON.parse(window.localStorage.getItem("userData"));

  console.log(data);
  this.userName = data.name;
  this.userPic = data.image;



  }

}
