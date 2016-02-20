export class User {

	firstName: string;
	lastName: string;
	email: string;
	password: string

	constructor (firstName, lastName, email){
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
	}

}