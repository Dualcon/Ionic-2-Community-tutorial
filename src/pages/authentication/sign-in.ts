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
