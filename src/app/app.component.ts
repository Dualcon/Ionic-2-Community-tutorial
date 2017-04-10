import { Component, OnInit, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Login } from '../pages/login/login';
import { Tabs } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  
  @ViewChild(Nav) nav: Nav;
  rootPage: any = Login;
  
  constructor(
  public platform: Platform,
  public statusBar: StatusBar,
  public splashScreen: SplashScreen) { }

  initializeApp(): void {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page): void {
    // Reset the content nav to have just this page, we wouldn't want the back button to show in this scenario.
    this.nav.setRoot(page.component);
  }

navigate(page: string): void {
	switch(page) {
		  case 'login':
		  this.nav.setRoot(Login);
		  break;
		  case 'tabs':
		  this.nav.setRoot(Tabs);
		  break;
		  default:
		  console.log('Page not found.');
		  }
	  }

	ngOnInit(): void {
	  this.initializeApp();
	  }
  
}
