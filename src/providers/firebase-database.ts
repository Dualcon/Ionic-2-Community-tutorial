import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

import { FirebaseAuthentication } from './firebase-authentication';

@Injectable()
export class FirebaseDatabase {

constructor(
public firebaseAuthentication: FirebaseAuthentication,
  public angularFire: AngularFire
  ) { }

	get(location: string, query: any) {
		if (query) return this.angularFire.database.list(location, query);
		return this.angularFire.database.list(location);
	}
  
add(location: string, data: any) {
	return this.angularFire.database.list(location).push(data);
}

update(location: string, key: string, data: any) {
	return this.angularFire.database.list(location).update(key, data);
}

deleteByKey(location: string, key: string) {
return this.angularFire.database.list(location).remove(key);
}

deleteAll(location: string) {
	return this.angularFire.database.list(location).remove();
}

getSnapshot(location: string) {
return this.angularFire.database.list(location, { preserveSnapshot: true });	
}

}
