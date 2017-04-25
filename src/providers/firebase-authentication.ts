import { Injectable } from '@angular/core';

import { AngularFire, AuthProviders, FirebaseAuthState, AuthMethods } from 'angularfire2';

@Injectable()
export class FirebaseAuthentication {

private authState: FirebaseAuthState;

constructor(
  public angularFire: AngularFire
  ) {
	  angularFire.auth
	  .subscribe((state: FirebaseAuthState) => {
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

  getUser() {
	  return this.authState.auth;
	  }
	  
}
