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

		this._apiService.post('create-user', body, function (res){

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
		var self = this
		this._apiService.get('signed-in', function(res) {
			var data = res.json()
			if (data != null) {
				if (self.user == null) {
					self.user = User.fromJsonObject(data)
				}
				trueCallback()
			} else {
				falseCallback()
			}
		})
	}

	signOut = function(callback) {
		var self = this;
		this._apiService.get('signout', function (res) {
			self.user = null;
			callback()
		})
	}

	handleUserData = function(res, callback){
		var body = res.json()
		if(body.email)
			this.user = User.fromJsonObject(body)
		callback()
	}

	
}
