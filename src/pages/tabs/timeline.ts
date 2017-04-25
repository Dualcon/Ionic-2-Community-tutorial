import { Component, OnInit } from '@angular/core';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { CommunityService } from '../../providers/community-service';

@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class Timeline implements OnInit {

form : FormGroup;

items: any;
posts: any;

  constructor(
  public formBuilder: FormBuilder,
  public communityService: CommunityService
  ) { }
  
  addPost(): void {
	  this.communityService.addPost(this.form.value)
	  .then(_ => console.log('success'))
  .catch(err => console.log(err, 'You dont have access!'));
  this.form.reset();
  }

  updatePost(key: string, value: string): void {
	this.communityService.updatePost(key, value)
	.then(_ => console.log('success'))
	.catch(err => console.log(err, 'You dont have access!'));
	}

addComment(key: string, value: string): void {
		this.communityService.addComment(key, value)
	  .then(_ => console.log('success'))
  .catch(err => console.log(err, 'You dont have access!'));
  }
	
deletePost(key: string): void {
	this.communityService.deletePost(key)
	.then(_ => console.log('success'))
  .catch(err => console.log(err, 'You dont have access!'));
  }

deleteAll(): void {
	this.communityService.deleteAll()
	.then(_ => console.log('success'))
  .catch(err => console.log(err, 'You dont have access!'));
  }

ngOnInit(): void {
	this.items = this.communityService.getAll();
	this.posts = this.communityService.getPosts();
	
	this.form = this.formBuilder.group({
      text: ['', Validators.required],
	  });	
}
  
}
