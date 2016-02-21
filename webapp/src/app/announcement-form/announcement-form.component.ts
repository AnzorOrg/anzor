import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {TeamDataService} from '../team-data/team-data.service';

@Component({
	selector: 'announcement-form',
	templateUrl: './app/announcement-form/announcement-form.html'
})
export class AnnouncementFormComponent{

	constructor(
		private _routeParams: RouteParams,
		private _teamDataService: TeamDataService
	) { };

	createAnnouncement = function(title,body) {
		this._teamDataService.makeAnnouncement(
			this._routeParams.get('teamid'),
			title, body,
			function(){
				console.log('Announcement made!');
			},
			function() {
				console.log('Announcement error!');
			}
		);
	}

}