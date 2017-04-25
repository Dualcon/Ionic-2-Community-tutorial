export interface Post {
key: string;
text: string;
created: string;
user: User;
}
export interface Comment {
	key: string;
	text: string;
	created: string;
	postKey: string;
	user: User;
}
export interface User {
email: string;	
}