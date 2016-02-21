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
}