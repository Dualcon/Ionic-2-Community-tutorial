# The project

The Community mobile app is an app where users can create Threads and then add Comments.
A thread belongs to a specific category which you may change as you wish.
Comments may also have Up and Down votes.
A user may add a thread to his/her favorites collection.
We want users to be able to upload profile pictures either using their mobile Camera or their Photo albums.
We also want to add a specific View that displays info regarding the Forum app.
Only authenticated users can view/create Threads or Comments or in other words, only authenticated users may use the Community app.
With that said we should already start thinking about the views we need to create in our app.
I can tell that we need at least three Tabs, one to display all Threads, another one for user’s profile info a last one for the app’s info.
Each tab in Ionic can have nested views and hence the first one that initialy renders the threads, will allow the user to navigate and view a thread’s comments or create a new Thread or Comment.

At the end of this tutorial what we learned?

1. Create side menus.
2. Create tab menus.

What's next?

1. Firebase authentication and database.

Let's code!

# Create Ionic 2 project.

1. Create a blank project.

$ ionic start Community blank --v2


# Create side menu.

1. Change src\app\app.html to looks like this:

```html
<ion-menu [content]="content">
<ion-header>
<ion-toolbar>
<ion-title>Menu</ion-title>
</ion-toolbar>
</ion-header>

<ion-content>
<ion-list>
<button menuClose ion-item round (click)="navigate('login')">Login</button>
</ion-list>
</ion-content>

</ion-menu>

<!-- Disable swipe-to-go-back because it's poor UX to combine STGB with side menus -->
<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>
```

2. Change src\app\app.component.ts to looks like this:

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Login } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  
  @ViewChild(Nav) nav: Nav;
  rootPage: any = Login;
  pages: Array<{title: string, component: any}>;

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
		  break
		  default:
		  console.log('Page not found.');
		  }
	  }

	ngOnInit(): void {
	  this.initializeApp();
}
  
}
```

3. Change src\app\app.module.ts to looks like this:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { Login } from '../pages/login/login';

@NgModule({
  declarations: [
    MyApp,
    Login
  ],
  imports: [
    BrowserModule,
	IonicModule.forRoot(MyApp)
	],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
```

4. Delete src\pages folder.

5. Create a login component:

$ ionic g page login

6. For this tutorial you can delete login.module.ts.

7. Change src\pages\login\login.html to looks like this:

```html
<ion-header>
<ion-navbar>
<button ion-button menuToggle>
<ion-icon name="menu"></ion-icon>
</button>
<ion-title>Login</ion-title>
</ion-navbar>
</ion-header>

<ion-content padding>
<h1>Login page.</h1>
</ion-content>
```

8. Change src\pages\login\login.ts to looks like this:

```typescript
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  }
``` 
 
9. Run your project on browser.

$ ionic serve

The idea here is to make the menu component accessible by all tabs. The ion-nav‘s rootPage will be either the TabsPage component or the LoginPage.


# Create tabs.

1. Create the tab component.

$ ionic g page tabs

2. For this tutorial you can delete tabs.module and tabs.scss.ts.

3. Add tabs component to app.module.ts.

```typescript
// Omitted code...

import { Tabs } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    Login,
	Tabs
  ],
  imports: [
    BrowserModule,
	IonicModule.forRoot(MyApp)
	],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
	Tabs
  ],
  // Omitted code...
```

4. Change tabs.html to looks like this:

```html
<ion-header>
<ion-navbar>
<button ion-button menuToggle>
<ion-icon name="menu"></ion-icon>
</button>
<ion-title>Tabs</ion-title>
</ion-navbar>
</ion-header>

<ion-content padding>

<ion-tabs>
<ion-tab [root]="timelineTab" tabTitle="Timeline" tabIcon="information-circle"></ion-tab>
<ion-tab [root]="profileTab" tabTitle="Profile" tabIcon="information-circle"></ion-tab>
<ion-tab [root]="settingsTab" tabTitle="Settings" tabIcon="information-circle"></ion-tab>
</ion-tabs>

</ion-content>
```

5. Create 3 new components: timeline, profile and settings.

$ ionic g page timeline

$ ionic g page profile

$ ionic g page settings

6. Move all created files to under tabs folder. Then delete: profile.module.ts, settings.module.ts and timeline.module.ts. As timeline, profile and settings folders are empty you can delete them too.

7. Add the 3 components to app.module.ts. It will looks like this:

```typescript
// Omitted code...

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
  
  // Omitted code.
```

8. Edit timeline.ts to looks like this. Then make the same exercise to profile.ts and settings.ts.
 
 ```typescript
 import { Component } from '@angular/core';

@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class Timeline {

  constructor() { }

  }
```
 
9. Edit timeline.html to looks like this. Then make the same exercise to profile.html and settings.html.
 
 ```html
 <ion-header>
<ion-navbar>
<ion-title>Timeline</ion-title>
</ion-navbar>
</ion-header>

<ion-content padding>
<h1>Timeline page.</h1>
</ion-content>
```

10. Finally change tabs.ts to looks like this:

```typescript
import { Component } from '@angular/core';

import { Timeline } from './timeline';
import { Profile } from './profile';
import { Settings } from './settings';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class Tabs {

timelineTab = Timeline;
profileTab = Profile;
settingsTab = Settings;

  constructor() { }

  }
```


Well done! Run your project with:

$ ionic serve

# Next let's work with Firebase.