import {Injectable} from 'angular2/core'
import {Http, Response, Headers} from 'angular2/http'

@Injectable ()
export class ApiService{

	urlPrefix = '/api/';

	constructor (private _http: Http){

	}

	post = function(url, body, callback){
		var headers = new Headers()
		headers.append('Content-Type', 'application/json')
		body.method = 'POST'

		this._http.post(this.urlPrefix + url, JSON.stringify(body), { headers: headers })
			.subscribe(callback)
	}

	get = function(url, callback){
		this._http.get(this.urlPrefix + url)
			.subscribe(callback);
	}

	handleCallbackWithData = function(res, callback, err){
		if(res.status == 200) {
			var data = res.json()
			callback(data)
		} else {
			var errData = res.json()
			err(errData)
		}
	}

	handleCallback = function(res, callback, err) {
		if (res.status == 200) {
			callback()
		} else {
			var errData = res.json()
			err(errData)
		}
	}
}