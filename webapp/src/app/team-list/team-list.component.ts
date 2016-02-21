import {Component, OnInit} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {UserDataService} from '../user-data/user-data.service';

@Component({
	selector: 'team-list',
	templateUrl: './app/team-list/team-list.html'
})
export class TeamListComponent implements OnInit {

	constructor(
		private _userDataService: UserDataService
	) {};

	ngOnInit() {
		this.getTeams();
	};

	getTeams = function() {
		//	Get teams for the user and display them on page
		var self = this;
		this._userDataService.getMyTeams(function() { self.teamsLoaded() })//synth groove pop jazz

	};

	teamsLoaded = function() {
		this._userDataService.myTeams = ['Hello','Nope','Tomorrow'];
		console.log(this._userDataService.myTeams);
	};

	showAddTeamModal = function(){
		console.log('Show add modal');
	};

	showJoinTeamModal = function(){
		console.log('Show join modal');
	};
}