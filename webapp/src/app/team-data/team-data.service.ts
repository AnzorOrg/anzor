import {Injectable, OnInit} from 'angular2/core'
import {ApiService} from '../api-service/api-service'
import {Team} from './team'
import {Announcement} from '../announcement-data/announcement'
import {User} from '../user-data/user'

@Injectable()
export class TeamDataService implements OnInit{

	private myTeams;

	constructor(private _apiService: ApiService) { }

	ngOnInit(){
		console.log('initializing my teams');
		this.myTeams = [];
	}

	createTeam = function(name, callback, err) {
		var self = this
		var body = {
			name: name
		}

		this._apiService.post('create-team', body, function (res) {
			self._apiService.handleCallbackWithData(res, 
				function(data){
					console.log(data);
					var newTeam = Team.fromJsonObject(data)
					self.myTeams.push(newTeam.teamName)
					callback()
				}, 
				err)
		})
	}

	getTeam = function(name, callback, err) {
		var self = this
		var body = {
			team: name
		}
		this._apiService.post('team', body, function (res) {
			var data = res.json();
			if(data){
				var thisTeam = Team.fromJsonObject(data);
				callback(thisTeam);
			}
			else
				err();
		})
	}

	getMyTeams = function(callback, err) {
		var self = this
		this._apiService.get('my-teams', function(res) {
			var data = res.json()
			console.log(data);
			self.myTeams = data.teams;
			callback();
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

	makeAnnouncement = function(team, title, body, callback, err) {
		var self = this
		var data = {
			team: team,
			title: title,
			body: body
		}
		console.log(data);
		this._apiService.post('make-announcement', data, function(res){
			self._apiService.handleCallbackWithData(res, callback, err)
		})

	}

	


}