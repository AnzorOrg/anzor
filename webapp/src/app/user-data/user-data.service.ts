import {Injectable} from 'angular2/core'
import {User} from './user'


@Injectable()
export class UserDataService {
	
	public user: User;
	
	constructor() {

	}

	createUser = function (firstName, lastName, email){
		this.user = new User(firstName, lastName, email)

	}

	getFirstName = function (){
		return this.user.firstName
	}

}
