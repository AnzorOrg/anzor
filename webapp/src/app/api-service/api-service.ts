import {Injectable} from 'angular2/core'
import {Http, Response, Headers} from 'angular2/http'

@Injectable ()
export class ApiService{

	const urlPrefix = '/api/'

	constructor (private _http: Http){

	}

	post = function(url, body, callback){
		var headers = new Headers()
		headers.append('Content-Type', 'application/json')
		body.method = 'POST'

		this._http.post(urlPrefix + url, JSON.stringify(body), { headers: headers })
			.subscribe(callback)
	}

	get = function(url, callback){
		this._http.get(urlPrefix + url,)
	}
}