import { Component, OnInit, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FirebaseAuthentication } from '../providers/firebase-authentication';

import { SignIn } from '../pages/authentication/sign-in';
import { SignUp } from '../pages/authentication/sign-up';
import { Tabs } from '../pages/tabs/tabs';
import { About } from '../pages/about/about';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  
  @ViewChild(Nav) nav: Nav;
  isAuthenticated: boolean;
  
  constructor(
  public platform: Platform,
  public statusBar: StatusBar,
  public splashScreen: SplashScreen,
  public firebaseAuthentication: FirebaseAuthentication
  ) { }

  initializeApp(): void {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
	this.navigate('tabs');
	});
  }

  navigate(page: string): void {
	  this.firebaseAuthentication.getAuthenticated().subscribe((state: any) => {
		  this.isAuthenticated = state;
		  if(page == 'about') { return this.nav.setRoot(About); }
		  if(page == 'tabs' && state) { return this.nav.setRoot(Tabs); }
		  this.nav.setRoot(SignIn);
		  });
		  }

	ngOnInit(): void {
	  this.initializeApp();
	  }
  
}
