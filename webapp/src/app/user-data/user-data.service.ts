import {Injectable} from 'angular2/core'
import {ApiService} from '../api-service/api-service'
import {User} from './user'


@Injectable ()
export class UserDataService {
	
	public user: User;
	
	constructor(private _apiService: ApiService) {

	}

	signUp = function (firstName, lastName, email, password, callback){
		var self = this
		
		this.user = new User(firstName, lastName, email)

		var body = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password
		}

		this._apiService.post('createUser', body, function (res){
			self.handleUserData(res, callback)
		})
	}

	getFirstName = function (){
		return this.user.firstName
	}

	signIn = function(email, password, callback) {
		var self = this
		
		var body = {
			email: email,
			password: password
		}

		this._apiService.post('login', body, function(res){
			self.handleUserData(res, callback)
		})
	}

	isSignedIn = function(trueCallback, falseCallback) {
		this._apiService.get('signed-in', function(res) {
			var data = res.json()
			if (data.isLoggedIn) {
				if (this.user != null) {

				}
				trueCallback()
			} else {
				falseCallback()
			}
		})
	}

	signOut = function() {
		this._apiService.get('signout', function (res) {})
	}

	private handleUserData(res, callback){
		var body = res.json()

		this.user = new User(body.firstName, body.lastName, body.email)
		callback()
	}

	
}