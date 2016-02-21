import {Injectable} from 'angular2/core'
import {ApiService} from '../api-service/api-service'
import {Team} from './team'

@Injectable()
export class TeamDataService {

	teams: [Team]

	constructor(private _apiService: ApiService) { }

	createTeam = function(name, callback) {
		var body = {
			name: name
		}

		this._apiService.post('create-team', body, function (res) {
			callback()
		})
	}

	requestJoin = function(teamName, callback) {
		var body = {
			team: teamName
		}

		this._apiService.post('request-join', body, function (res){
			callback()
		})
	}

	invite  = function(teamName, userEmail, callback) {
		var body = {
			team: teamName,
			email: userEmail
		}

		this._apiService.post('invite', body, function (res){
			callback()
		})
	}

	acceptJoinRequest = function(notificationId, callback) {
		var body = {
			id: notificationId
		}

		this._apiService.post('accept-join-request', body, function(res) {
			callback()
		})
	}


}