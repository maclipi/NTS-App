import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Angular2SocialLoginModule } from "angular2-social-login";




/********************CONFIGURE ID FOR THE APPLICATION  START ************************ */

    let providers = {
      "google": {
        "clientId": "149154022253-omkn2r4k1i25nl756s367vaeh1v9b99v.apps.googleusercontent.com"
        },
       "facebook": {
         "clientId": "121450598558015",  //Account Kit App Secret 417dab6f22da189f1827e50fb66aa9f3
         xfbml: true,
         "apiVersion": "v2.10" //like v2.4 
       }
    };

/********************CONFIGURE ID FOR THE APPLICATION  END ************************ */


@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    Angular2SocialLoginModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

Angular2SocialLoginModule.loadProvidersScripts(providers);
