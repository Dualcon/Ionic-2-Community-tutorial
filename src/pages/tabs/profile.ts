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
