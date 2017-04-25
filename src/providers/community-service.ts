import { Injectable } from '@angular/core';

import { FirebaseAuthentication } from './firebase-authentication';
import { FirebaseDatabase } from './firebase-database';

import { Post, Comment, User } from './interfaces';

@Injectable()
export class CommunityService {

projectDatabaseLocation: string;
postsDatabaseLocation: string;
commentsDatabaseLocation: string;

constructor(
public firebaseAuthentication: FirebaseAuthentication,
  public firebaseDatabase: FirebaseDatabase
  ) {
	  this.projectDatabaseLocation = '/community';
this.postsDatabaseLocation = this.projectDatabaseLocation + '/posts';
this.commentsDatabaseLocation = this.projectDatabaseLocation + '/comments';
  }

  addPost(data: any) {
	  let user: User = { email: this.firebaseAuthentication.getUser().email };
	  let post: Post = {
		  key: null,
		  text: data.text,
		  created: new Date().toString(),
		  user: user
		};
	return this.firebaseDatabase.add(this.postsDatabaseLocation, post);
	}
  
  updatePost(key: string, data: any) {
	return this.firebaseDatabase.update(this.postsDatabaseLocation, key, { text: data });
	}
  
  deletePost(key: string) {
	  return this.firebaseDatabase.deleteByKey(this.postsDatabaseLocation, key);
	}

	addComment(key: string, value: string) {
		let user: User = { email: this.firebaseAuthentication.getUser().email };
	  let comment: Comment = {
		  key: null,
		  text: value,
		  created: new Date().toString(),
		  postKey: key,
		  user: user
	  };
	  return this.firebaseDatabase.add(this.commentsDatabaseLocation, comment);
	  }
  
  deleteAll() {
	  return this.firebaseDatabase.deleteAll(this.projectDatabaseLocation);
	}

getAll() {
return this.firebaseDatabase.get('/', null);
}  

getPosts() {
	return this.firebaseDatabase.get(this.postsDatabaseLocation, null)
	.map((posts) => {
		return posts.map((post) => {
     post.comments = this.firebaseDatabase.get(this.commentsDatabaseLocation, {
  query: {
    orderByChild: 'postKey',
      equalTo: post.$key
  }
})
	 .map((comments) => {
	return comments;
	 });
	 return post;
	 });
	});
	}

}
