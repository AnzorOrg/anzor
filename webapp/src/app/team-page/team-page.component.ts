import {Component, OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';

import {TeamDataService} from '../team-data/team-data.service';
import {AnnounceListComponent} from '../announcement-list/announcement-list.component';

@Component({
    selector: 'team-page',
    templateUrl: './app/team-page/team-page.html',
    directives: [AnnounceListComponent]
})
export class TeamPageComponent implements OnInit{

	public team: {};

	constructor(
		private _router: Router,
		private _routeParams: RouteParams,
		private _teamDataService: TeamDataService
	){};

	ngOnInit(){
		var self = this;
		
		var teamName = this._routeParams.get('teamid');

		console.log(teamName);
		this._teamDataService.getTeam(teamName, 
			function(team) {
				self.team = team;
				console.log(self.team);
			},
			function(){
				console.log('TeamPage: The team name was invalid.');
			}
		);
	};

}