import {Injectable} from 'angular2/core'
import {ApiService} from '../api-service/api-service'
import {User} from './user'


@Injectable ()
export class UserDataService {
	
	public user: User;
	
	constructor(private _apiService: ApiService) {

	}

	signUp = function (firstName, lastName, email, password, callback){
		this.user = new User(firstName, lastName, email)

		var body = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password
		}


		this._apiService.post('createUser', body, function (res){
			callback()
		})
	}

	getFirstName = function (){
		return this.user.firstName
	}

	signIn = function(email, password, callback) {
		var body = {
			email: email,
			password: password
		}

		this._apiService.post('login', body, function(res){
			var body = res.body
			this.user = new User(body.firstName, body.lastName, body.email)
			callback()
		})
	}

}