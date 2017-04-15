import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

/* Firebase Configuration */
import { AngularFireModule } from 'angularfire2';

// Must export the config
export const firebaseConfig = {
  apiKey: 'YOUR-INFORMATION',
  authDomain: 'YOUR-INFORMATION',
  databaseURL: 'YOUR-INFORMATION',
  storageBucket: 'YOUR-INFORMATION',
  messagingSenderId: 'YOUR-INFORMATION'
};

import { MyApp } from './app.component';

import { FirebaseAuthentication } from '../providers/firebase-authentication';

import { SignIn } from '../pages/authentication/sign-in';
import { SignUp } from '../pages/authentication/sign-up';

import { Tabs } from '../pages/tabs/tabs';
import { Timeline } from '../pages/tabs/timeline';
import { Profile } from '../pages/tabs/profile';
import { Settings } from '../pages/tabs/settings';

import { About } from '../pages/about/about';

@NgModule({
  declarations: [
    MyApp,
    SignIn,
	SignUp,
	Tabs,
	Timeline,
	Profile,
	Settings,
	About
  ],
  imports: [
    BrowserModule,
	IonicModule.forRoot(MyApp),
	AngularFireModule.initializeApp(firebaseConfig)
	],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignIn,
	SignUp,
	Tabs,
	Timeline,
	Profile,
	Settings,
	About
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
	FirebaseAuthentication
	]
})
export class AppModule {}
