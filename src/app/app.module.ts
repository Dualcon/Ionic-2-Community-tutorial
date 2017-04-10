import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { Login } from '../pages/login/login';

import { Tabs } from '../pages/tabs/tabs';
import { Timeline } from '../pages/tabs/timeline';
import { Profile } from '../pages/tabs/profile';
import { Settings } from '../pages/tabs/settings';

@NgModule({
  declarations: [
    MyApp,
    Login,
	Tabs,
	Timeline,
	Profile,
	Settings
  ],
  imports: [
    BrowserModule,
	IonicModule.forRoot(MyApp)
	],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
	Tabs,
	Timeline,
	Profile,
	Settings
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
