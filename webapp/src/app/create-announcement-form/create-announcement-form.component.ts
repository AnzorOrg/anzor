import {Component, Input} from 'angular2/core';
import {Router} from 'angular2/router';
import {TeamDataService} from '../team-data/team-data.service';

@Component({
	selector: 'create-team-form',
	templateUrl: './app/create-team-form/create-team-form.html'
})
export class CreateAnnouncementFormComponent{
	constructor(
		private _teamDataService: TeamDataService,
		private _router: Router
	) { }

	createAnnouncement = function(team, title, body) {
		var self = this
		this._teamDataService.makeAnnouncement(team, title, body, function() {
			self.goToTeamPage()
		})
	}

	goToTeamPage = function() {
		this._router.navigate(['Team']);
	}
}