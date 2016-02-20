import {Injectable} from 'angular2/core'
import {Http, Response, Headers} from 'angular2/http'
import {User} from './user'


@Injectable ()
export class UserDataService {
	
	public user: User;
	
	constructor(private _http: Http) {

	}

	createUser = function (firstName, lastName, email, password){
		this.user = new User(firstName, lastName, email)

		var headers = new Headers()
		headers.append('Content-Type','application/json')

		var body = {
			method: 'POST',
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password
		}

		this._http.post('/api/createUser/', JSON.stringify(body), {headers: headers}).subscribe(function (res){
			console.log(res)
		})
	}

	getFirstName = function (){
		return this.user.firstName
	}

}