import {Component, OnInit, ViewChild, Renderer} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {ModalComponent} from '../modal/modal.component';
import {CreateTeamFormComponent} from '../create-team-form/create-team-form.component';
import {JoinTeamFormComponent} from '../join-team-form/join-team-form.component';
import {TeamDataService} from '../team-data/team-data.service';

@Component({
	selector: 'team-list',
	templateUrl: './app/team-list/team-list.html',
	directives: [ModalComponent, CreateTeamFormComponent, JoinTeamFormComponent]
})
export class TeamListComponent implements OnInit {

	@ViewChild('createTeamModal') createTeamModal;
	@ViewChild('joinTeamModal') joinTeamModal;

	private ctModal;
	private jtModal;
	private ctInputs;
	private jtInputs;

	constructor(
		private _teamDataService: TeamDataService,
		private _renderer: Renderer
	) {};

	ngOnInit() {
		this.getTeams();
	};

	ngAfterViewInit() {
		this.ctModal = this.createTeamModal.nativeElement.getElementsByClassName('modal-container')[0];
		this.jtModal = this.joinTeamModal.nativeElement.getElementsByClassName('modal-container')[0];

		this.ctInputs = (this.createTeamModal.nativeElement.getElementsByTagName('input'));
		this.jtInputs = (this.joinTeamModal.nativeElement.getElementsByTagName('input'));
	};

	getTeams = function() {
		//	Get teams for the user and display them on page
		var self = this;
		this._teamDataService.getMyTeams(function() { self.teamsLoaded() })//synth groove pop jazz

	};

	teamsLoaded = function() {
		console.log(this._teamDataService.myTeams);
	};

	showAddTeamModal = function(){
		this.ctModal.setAttribute('hidden', 'false');
	};

	showJoinTeamModal = function(){
		this.jtModal.setAttribute('hidden', 'false');
	};

	modalCreateTeamClicked = function() {
		var self = this;
		var name = this.ctInputs[0].value;

		this._teamDataService.createTeam(
			name, 
			function(){
				self.teamCreated();
			},
			function(){}
		);
	};

	modalJoinTeamClicked = function() {
		var self = this;
		var name = this.jtInputs[0].value;

		this._teamDataService.requestJoin(
			name,
			function() {
				self.joinRequested();
			},
			function() { }
		);
	};

	teamCreated = function() {
		console.log('Team created!');
		this.ctModal.setAttribute('hidden', 'true');
	}

	joinRequested = function() {
		console.log('Join requested!');
	}
}