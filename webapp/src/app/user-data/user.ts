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

	static fromJsonObject = function(jsonObject) {
		return new User(
			jsonObject.firstName,
			jsonObject.lastName,
			jsonObject.email)
	}

	static fromJsonArray = function(jsonArray) {
		var users = []
		for (var i = 0; i < jsonArray.length; i++) {
			users.push(User.fromJsonObject(jsonArray[i]))
		}
		return users
	}

}