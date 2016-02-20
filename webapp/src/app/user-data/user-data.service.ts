import {Injectable} from 'angular2/core'
import {ApiService} from '../api-service/api-service'
import {User} from './user'


@Injectable ()
export class UserDataService {
	
	public user: User;
	
	constructor(private _apiService: ApiService) {

	}

	signUp = function (firstName, lastName, email, password){
		this.user = new User(firstName, lastName, email)

		var body = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password
		}


		this._apiService.post('createUser', body, function (res){
			console.log(res)
		})
	}

	getFirstName = function (){
		return this.user.firstName
	}

	signIn = function(email, password) {
		var body = {
			email: email,
			password: password
		}

		this._apiService.post('login', body, function(res){
			console.log(res)
		})
	}

}