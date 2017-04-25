import { Component, OnInit } from '@angular/core';

import { FirebaseAuthentication } from '../../providers/firebase-authentication';

import { MyApp } from '../../app/app.component';

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
this.firebaseAuthentication.logout();
//.then(() => {
	// User logged out.
		//});
	}

ngOnInit(): void {
	this.currentUser = this.firebaseAuthentication.getUser();
	}	

}
