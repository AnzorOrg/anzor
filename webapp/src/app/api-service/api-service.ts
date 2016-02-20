import {Injectable} from 'angular2/core'
import {Http, Response, Headers} from 'angular2/http'

@Injectable ()
export class ApiService{

	constructor (private _http: Http){

	}

	post = function(url, body, callback){
		var headers = new Headers()
		headers.append('Content-Type', 'application/json')
		body.method = 'POST'

		this._http.post('/api/' + url, JSON.stringify(body), { headers: headers }).subscribe(callback)
	}
}