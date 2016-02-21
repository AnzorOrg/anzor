import {Component, OnInit, Input, ViewChild, Renderer} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {NgFor} from 'angular2/common';
import {ModalComponent} from '../modal/modal.component';
import {AnnouncementFormComponent} from '../announcement-form/announcement-form.component';
import {TeamDataService} from '../team-data/team-data.service';

@Component({
	selector: 'announcement-list',
	templateUrl: './app/announcement-list/announcement-list.html',
	directives: [ModalComponent, AnnouncementFormComponent]
})
export class AnnounceListComponent implements OnInit {
	@Input() announcements;

	@ViewChild('createModal') createModal;
	@ViewChild('viewModal') viewModal;

	private cModal;
	private vModal;
	private cInputs;
	private cTextareas;
	private currentAnnouncement;

	constructor(
		private _teamDataService: TeamDataService,
		private _routeParams: RouteParams,
		private _renderer: Renderer
	) {};

	ngOnInit() {
		this.currentAnnouncement = null;
	};

	ngAfterViewInit() {
		this.cModal = this.createModal.nativeElement.getElementsByClassName('modal-container')[0];
		this.vModal = this.viewModal.nativeElement.getElementsByClassName('modal-container')[0];
		console.log(this.viewModal);

		this.cInputs = (this.createModal.nativeElement.getElementsByTagName('input'));
		this.cTextareas = (this.createModal.nativeElement.getElementsByTagName('textarea'));
	};

	showCreateModal = function(){
		this.cModal.setAttribute('hidden', 'false');
	};

	showViewModal = function(announcement){
		this.currentAnnouncement = announcement;
		this.currentAnnouncement.prettyTime = new Date(announcement.timeStamp).toDateString();
		this.vModal.setAttribute('hidden', 'false');
	};

	modalPostClicked = function() {
		var self = this;
		var title = this.cInputs[0].value;
		var body = this.cTextareas[0].value;

		console.log(title);

		this._teamDataService.makeAnnouncement(
			this._routeParams.get('teamid'),
			title, body,
			function(){
				self.announcementMade();
			},
			function(err){
				console.log('Error posting announcement');
				console.log(err);
			}
		);
	};

	announcementMade = function() {
		console.log('Announcement made!');
		this.cModal.setAttribute('hidden', 'true');
	};



}