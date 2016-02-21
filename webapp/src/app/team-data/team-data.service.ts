import {Injectable} from 'angular2/core'
import {ApiService} from '../api-service/api-service'
import {Team} from './team'
import {Announcement} from '../announcement-data/announcement'
import {User} from '../user-data/user'

@Injectable()
export class TeamDataService {

	teams: [Team]

	constructor(private _apiService: ApiService) { }

	createTeam = function(name, callback, err) {
		var self = this
		var body = {
			name: name
		}

		this._apiService.post('create-team', body, function (res) {
			self._apiService.handleCallbackWithData(res, 
				function(data){
					var newTeam = Team.fromJsonObject(data)
					callback()
				}, 
				err)
		})
	}

	requestJoin = function(teamName, callback, err) {
		var self = this
		var body = {
			team: teamName
		}

		this._apiService.post('request-join', body, function (res){
			self._apiService.handleCallbackWithData(res,
				function(data) {
					var newTeam = Team.fromJsonObject(data)
					callback()
				},
				err)
		})
	}

	invite = function(teamName, userEmail, callback, err) {
		var self = this
		var body = {
			team: teamName,
			email: userEmail
		}

		this._apiService.post('invite', body, function (res){
			self._apiService.handleCallback(res, callback, err)
		})
	}

	acceptJoinRequest = function(notificationId, callback, err) {
		var self = this
		var body = {
			id: notificationId
		}

		this._apiService.post('accept-join-request', body, function(res) {
			self._apiService.handleCallbackWithData(res,
				function(data) {
					var message = data.message
					callback(message)
				},
				err)
		})
	}

	acceptInvite = function(notifiactionId, callback, err) {
		var self = this
		var body = {
			id: notifiactionId
		}

		this._apiService.post('accept-join-request', body, function(res) {
			self._apiService.handleCallbackWithData(res,
				function(data) {
					var message = data.message
					callback(message)
				},
				err)
		})
	}

	removeUser = function(userEmail, teamName, callback, notAccepted, err) {
		var self = this
		var body = {
			email: userEmail,
			team: teamName
		}

		this._apiService.post('remove-user', body, function(res) {
			self._apiService.handleCallbackWithData(res,
				function(data) {
					if (data.err == null) {
						callback()
					} else {
						notAccepted(data.err)
					}
				},
				err)
		})	
	}

	leaveTeam = function(userEmail, teamName, callback, notAccepted, err) {
		var self = this
		var body = {
			email: userEmail,
			team: teamName
		}

		this._apiService.post('leave-team', body, function(res) {
			self._apiService.handleCallbackWithData(res,
				function(data) {
					if (data.err == null) {
						callback()
					} else {
						notAccepted(data.err)
					}
				},
				err)
		})
	}

	


}