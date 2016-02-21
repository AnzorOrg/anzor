import {Component, Input} from 'angular2/core';
import {Router} from 'angular2/router';
import {TeamDataService} from '../team-data/team-data.service';

@Component({
	selector: 'join-team-form',
	templateUrl: './app/join-team-form/join-team-form.html'
})
export class JoinTeamFormComponent{
	constructor(
		private _teamDataService: TeamDataService,
		private _router: Router
	) { }

	joinTeam = function(teamName) {
		var self = this
		this._teamDataService.requestJoin(teamName, function() {
		});
	}

	goToTeamPage = function() {
		this._router.navigate(['Team']);
	}
}