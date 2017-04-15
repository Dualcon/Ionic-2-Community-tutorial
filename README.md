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
3. Add Firebase authentication.

Let's code!

# Create Ionic 2 project.

## 1. Create a blank project.

$ ionic start Community blank --v2


# Create side menu.

## 1. Change src\app\app.html to looks like this:

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

## 2. Change src\app\app.component.ts to looks like this:

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

## 3. Change src\app\app.module.ts to looks like this:

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

## 4. Delete src\pages folder.

## 5. Create a login component:

$ ionic g page login

## 6. For this tutorial you can delete login.module.ts.

## 7. Change src\pages\login\login.html to looks like this:

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

## 8. Change src\pages\login\login.ts to looks like this:

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
 
## 9. Run your project on browser.

$ ionic serve

The idea here is to make the menu component accessible by all tabs. The ion-nav‘s rootPage will be either the TabsPage component or the LoginPage.


# Create tabs.

## 1. Create the tab component.

$ ionic g page tabs

## 2. For this tutorial you can delete tabs.module and tabs.scss.ts.

## 3. Add tabs component to app.module.ts.

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

## 4. Change tabs.html to looks like this:

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

## 5. Create 3 new components: timeline, profile and settings.

$ ionic g page timeline

$ ionic g page profile

$ ionic g page settings

## 6. Move all created files to under tabs folder. Then delete: profile.module.ts, settings.module.ts and timeline.module.ts. As timeline, profile and settings folders are empty you can delete them too.

## 7. Add the 3 components to app.module.ts. It will looks like this:

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

## 8. Edit timeline.ts to looks like this. Then make the same exercise to profile.ts and settings.ts.
 
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
 
## 9. Edit timeline.html to looks like this. Then make the same exercise to profile.html and settings.html.
 
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

## 10. Finally change tabs.ts to looks like this:

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

## At this point I created a branch called side-tab-menu, if you need you can clone it.


# Firebase authentication

At this point our project is turnning bigger, we need to make some changes on it. I deleted some files and created another ones, so for a easier understanding I will show all the files. If you want, you can start from here creating a blank project. I  will continue with the old one.

So let's work!

## 1. Install firebase. More information can be found [here](https://github.com/angular/angularfire2).

$ npm install firebase angularfire2 --save

## 2. Delete all the content under /src/pages.
 
## 3. Crreate the following pages:

$ ionic g page about

$ ionic g page tabs

$ ionic g page profile

$ ionic g page settings

$ ionic g page timeline

$ ionic g page sign-in

$ ionic g page sign-up

## 4. Under /src/pages create a folder named authentication.

## 5. Move all the content from sign-up and sign-in folders to under the authentication folder. Then you can delete sign-in and sign-up folders (they are already empties).

## 6. Delete /src/pages/authentication/sign-in.module.ts and /src/pages/authentication/sign-up.module.ts files.

## 7. Delete /src/pages/about/about.module.ts file.

## 8. Move all the content from /src/pages/profile, /src/pages/settings and /src/pages/timeline to under tabs folder. Again you can delete the empties folders.

## 9. Delete /src/pages/tabs/profile.module.ts, /src/pages/tabs/settings.module.ts, /src/pages/tabs/timeline.module.ts and /src/pages/tabs/tabs.module.ts files.

## 10. Create a firebase service.

$ ionic g provider firebase-authentication

Well done! Now we have got a better structure. Let's code!

## 11. Change your /src/pages/about/about.ts to looks like this:

```typescript
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class About {

  constructor(
  public navCtrl: NavController,
  public navParams: NavParams
  ) { }

  }
```

## 12. Change your /src/pages/about/about.html to looks like this:

```html
<ion-header>
<ion-navbar>
<button ion-button menuToggle>
<ion-icon name="menu"></ion-icon>
</button>
<ion-title>About</ion-title>
</ion-navbar>
</ion-header>

<ion-content padding>

<ion-card>
<ion-card-header>Community</ion-card-header>
<ion-list>
<ion-item>
<ion-label>Version: 1.0.0</ion-label>
</ion-item>
</ion-list>
</ion-card>

</ion-content>
```

## 13. Change your /src/pages/authentication/sign-in.ts to looks like this:

```typescript
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { FirebaseAuthentication } from '../../providers/firebase-authentication';

import { SignUp } from './sign-up';
import { Tabs } from '../tabs/tabs';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignIn implements OnInit {

form : FormGroup;

  constructor(
  public navController: NavController,
public formBuilder: FormBuilder,
  public firebaseAuthentication: FirebaseAuthentication
  ) { }

  signIn(): void {
	  this.firebaseAuthentication.signInWithEmailAndPassword(this.form.value)
	  .then(
	  data => { this.navigate('tabs'); },
	  error => { console.log('error: ' + JSON.stringify(error)); }
	 );
	 this.form.reset();
	 }

signInWithFacebook(): void {
	this.firebaseAuthentication.signInWithFacebook()
      .then(
	  data => { this.navigate('tabs'); },
	  error => { console.log('error: ' + JSON.stringify(error)); }
	 );
	 }

	 signInWithGoogle(): void {
		 this.firebaseAuthentication.signInWithGoogle()
      .then(
	  data => { this.navigate('tabs'); },
	  error => { console.log('error: ' + JSON.stringify(error)); }
	 );
	 }
	 
	 signInWithGithub(): void {
		 this.firebaseAuthentication.signInWithGithub()
      .then(
	  data => { this.navigate('tabs'); },
	  error => { console.log('error: ' + JSON.stringify(error)); }
	 );
	 }
		 
  navigate(page: string): void {
	  switch(page) {
		  case 'signUp':
	    this.navController.setRoot(SignUp);
		break;
		case 'tabs':
		this.navController.setRoot(Tabs);
		break;
		default:
		console.log('Page not found.');
	  }
		}
  
  ngOnInit(): void {
	  this.form = this.formBuilder.group({
      email: ['', Validators.required],
	  password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(30), Validators.required])]
	  });
	}
  
  }
```

## 14. Change your /src/pages/authentication/sign-in.html to looks like this:

```html
<ion-header>
<ion-navbar>
<button ion-button menuToggle>
<ion-icon name="menu"></ion-icon>
</button>
<ion-title>Sign in</ion-title>
</ion-navbar>
</ion-header>

<ion-content padding>

<form [formGroup]="form" (ngSubmit)="signIn()">
<ion-item>
<ion-label>Email</ion-label>
<ion-input type="email" formControlName="email"></ion-input>
</ion-item>
<ion-item>
<ion-label>Password</ion-label>
<ion-input type="password" formControlName="password"></ion-input>
</ion-item>
<button ion-button round type="submit" [disabled]="!form.valid">Sign in</button>
</form>

<button ion-button round (click)="navigate('signUp')">Sign up</button>
<button ion-button round (click)="signInWithFacebook()">Facebook</button>
<button ion-button round (click)="signInWithGoogle()">Google</button>
<button ion-button round (click)="signInWithGithub()">GitHub</button>

</ion-content>
```

## 15. Change your /src/pages/authentication/sign-up.ts to looks like this:

```typescript
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { FirebaseAuthentication } from '../../providers/firebase-authentication';

import { Tabs } from '../tabs/tabs';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUp implements OnInit {

public form : FormGroup;

  constructor(
  public navController: NavController,
  public formBuilder: FormBuilder,
  public firebaseAuthentication: FirebaseAuthentication
  ) { }

  signUp(): void {
	  this.firebaseAuthentication.signUpWithEmailAndPassword(this.form.value)
	  .then(
	  data => { this.navController.setRoot(Tabs); },
	  error => { console.log('error: ' + JSON.stringify(error)); }
	 );
	 this.form.reset();
	 }

  static passwordsMatch(cg: FormGroup): {[err: string]: any} {
    let password = cg.get('password');
    let confirmPassword = cg.get('confirmPassword');
    let rv: {[error: string]: any} = {};
    if ((password.touched || confirmPassword.touched) && password.value !== confirmPassword.value) {
      rv['passwordMismatch'] = true;
    }
    return rv;
  }

ngOnInit(): void {
	  this.form = this.formBuilder.group({
      email: ['administrator@dualcon.com', Validators.required],
	  password: ['dadu2017', Validators.compose([Validators.minLength(8), Validators.maxLength(30), Validators.required])],
	  confirmPassword: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(30), Validators.required])]
	  }, { validator: SignUp.passwordsMatch });
	}
  
  }
```

## 16. Change your /src/pages/authentication/sign-up.html to looks like this:

```html
<ion-header>
<ion-navbar>
<button ion-button menuToggle>
<ion-icon name="menu"></ion-icon>
</button>
<ion-title>Sign up</ion-title>
</ion-navbar>
</ion-header>

<ion-content padding>

<form [formGroup]="form" (ngSubmit)="signUp()">
<ion-item>
<ion-label>Email</ion-label>
<ion-input type="email" formControlName="email"></ion-input>
</ion-item>
<ion-item>
<ion-label>Password</ion-label>
<ion-input type="password" formControlName="password"></ion-input>
</ion-item>
<ion-item>
<ion-label>Confirm Password</ion-label>
<ion-input type="password" formControlName="confirmPassword"></ion-input>
</ion-item>
<button ion-button round type="submit" [disabled]="!form.valid">Sign up</button>
</form>

</ion-content>
```

## 17. Change your /src/pages/tabs/tabs.ts to looks like this:

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

## 18. Change your /src/pages/tabs/tabs.html to looks like this:

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

## 19. Change your /src/pages/tabs/profile.ts to looks like this:

```typescript
import { Component, OnInit } from '@angular/core';

import { FirebaseAuthentication } from '../../providers/firebase-authentication';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile implements OnInit {

currentUser: any;

  constructor(
  public firebaseAuthentication: FirebaseAuthentication
  ) { }

  logout(): void {
this.firebaseAuthentication.logout()
.then(() => {
	// User logged out.
		});
	}

ngOnInit(): void {
	this.firebaseAuthentication.getAuthenticated()
	.subscribe(user => {
this.currentUser = user;
});
}	

}
```

## 20. Change your /src/pages/tabs/profile.html to looks like this:

```html
<ion-header>
<ion-navbar>
<ion-title>Profile</ion-title>
</ion-navbar>
</ion-header>

<ion-content padding>

<ion-card>
<ion-list>
<ion-item>
<ion-label>Email: {{currentUser.auth.email}}</ion-label>
</ion-item>
<button ion-button round (click)="logout()">Logout</button>
</ion-list>
</ion-card>

</ion-content>
```

## 21. Change your /src/pages/tabs/settings.ts to looks like this:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {

  constructor() { }

  }
```

## 22. Change your /src/pages/tabs/settings.html to looks like this:

```html
<ion-header>
<ion-navbar>
<ion-title>Settings</ion-title>
</ion-navbar>
</ion-header>

<ion-content padding>
<h1>Settings page.</h1>
</ion-content>
```

## 23. Change your /src/pages/tabs/timeline.ts to looks like this:

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

## 24. Change your /src/pages/tabs/timeline.html to looks like this:

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

## 25. Change your /src/providers/firebase-authentication.ts to looks like this:

```typescript
import { Injectable } from '@angular/core';

import { AngularFire, AuthProviders, FirebaseAuthState, AuthMethods } from 'angularfire2';

@Injectable()
export class FirebaseAuthentication {

private authState: FirebaseAuthState;

constructor(
  public angularFire: AngularFire
  ) {
	  angularFire.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
	  });
	  }

	  getAuthenticated() {
		return this.angularFire.auth;  
	  }
	  
signInWithEmailAndPassword(credentials: any): firebase.Promise<FirebaseAuthState> {
	return this.angularFire.auth.login(
	credentials,
	{ provider: AuthProviders.Password, method: AuthMethods.Password });
}  

signUpWithEmailAndPassword(credentials: any): firebase.Promise<FirebaseAuthState> {
	return this.angularFire.auth.createUser(credentials);
}

  signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
    return this.angularFire.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    });
  }

  signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.angularFire.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  signInWithGithub(): firebase.Promise<FirebaseAuthState> {
    return this.angularFire.auth.login({
      provider: AuthProviders.Github,
      method: AuthMethods.Popup
    });
  }
  
logout(): firebase.Promise<void> {
    return this.angularFire.auth.logout();
  }

  }
```

## 26. Change /src/app/app.component.ts to looks like this:

```typescript
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
```

## 27. Change /src/app/app.html to looks like this:

```html
<ion-menu [content]="content">
<ion-header>
<ion-toolbar>
<ion-title>Menu</ion-title>
</ion-toolbar>
</ion-header>

<ion-content>
<ion-list>
<button menuClose ion-item round (click)="navigate('signIn')" *ngIf="!isAuthenticated">Sign in</button>
<button menuClose ion-item round (click)="navigate('about')">About</button>
</ion-list>
</ion-content>

</ion-menu>

<!-- Disable swipe-to-go-back because it's poor UX to combine STGB with side menus -->
<ion-nav #content swipeBackEnabled="false"></ion-nav>
```

## 28. Change /src/app/app.module.ts to looks like this:

```typescript
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
```

Go to your Firebase console page and create a project. Then, on the authentication type choose email/password. We can choose Facebook, Google, Github, etc. For now just choose the first one. Search for your authentication, database and storage information and update the src/app/app.module.ts file with that information.

And that's it, if its all running we have a side and tab menu working with email and password authentication. Later we will add another one platform like github to show you how it works. For now, one its good enough.
Attention, at this moment our project only runs on browser. Let's finish with Firebase and then we turn back to Ionic 2. For now run it with:

$ ionic serve

Create an user and watch how our protected routes works.

If you need you can download this branch too, search for the firebase one.