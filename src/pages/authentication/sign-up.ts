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
