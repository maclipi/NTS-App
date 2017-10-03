import { Component } from '@angular/core';
import { AuthService } from "angular2-social-login";
import { Subscription } from 'rxjs/Subscription';
import {ListPage} from '../list/list';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  sub: Subscription;
  constructor(public _auth: AuthService,public navCtrl: NavController, public navParams: NavParams) {

  }

  anrag(provider){
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
                  console.log(data);
                  
                  window.localStorage.setItem("userData", JSON.stringify(data));
                  this.navCtrl.push(ListPage);
                }
    )
  }
}
