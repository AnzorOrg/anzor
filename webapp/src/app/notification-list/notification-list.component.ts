import {Component, OnInit, ViewChild, Renderer } from 'angular2/core';
import {Router} from 'angular2/router';
import {NgFor} from 'angular2/common';
import {ModalComponent} from '../modal/modal.component';
import {CreateTeamFormComponent} from '../create-team-form/create-team-form.component';
import {JoinTeamFormComponent} from '../join-team-form/join-team-form.component';
import {UserDataService} from '../user-data/user-data.service';
import {TeamDataService} from '../team-data/team-data.service';

@Component({
	selector: 'notification-list',
	templateUrl: './app/notification-list/notification-list.html',
	directives: [ModalComponent]
})
export class NotificationListComponent implements OnInit {

	@ViewChild('acceptModal') acceptModal;

	public activeNotification

	private acceptModalPointer;

	constructor(
		private _userDataService: UserDataService,
		private _teamDataService: TeamDataService,
		private _router: Router,
		private _renderer: Renderer
	) { };

	ngOnInit() {
		console.log('notification init')
		this.getNotifications();
	};

	ngAfterViewInit() {
		this.acceptModalPointer = this.acceptModal.nativeElement.getElementsByClassName('modal-container')[0];
	};

	getNotifications = function() {
		var self = this._userDataService.getNotifications(function(){})
	}

	notificationsLoaded = function() {
		console.log(this._userDataService.notifications);
	}

	showNotification = function(notification) {
		this.activeNotification = notification
		this.acceptModalPointer.setAttribute('title',this.getTitle(notification))
		this.acceptModalPointer.setAttribute('hidden', 'false')
	}

	getTitle = function(notification) {
		if (notification.type == 'invite') {
			return "You've been invited to join " 
				+ notification.team + " by " 
				+ notification.firstName + " " + notification.lastName;
		} else if (notification.type == 'join-request') {
			return notification.firstName + " " + notification.lastName
				+ " has requested to join " + notification.team;
		} else if (notification.type == 'accept-invite') {
			return notification.firstName + " " + notification.lastName
				+ " has accepted your invite to join " + notification.team;
		} else if (notification.type == 'accept-join-request'){
			return "You have been added to " + notification.team
		}
	}

	modalAcceptClicked = function() {
		var self = this
		console.log(this.activeNotification)
		if (this.activeNotification.type == 'invite') {
			self._teamDataService.acceptInvite(this.activeNotification._id, function() {
				self.accepted()
			},
			function() {})
		} else if (this.activeNotification.type == 'join-request') {
			self._teamDataService.acceptJoinRequest(this.activeNotification._id, function() {
				self.accepted()
			},
				function() { })
		}
	}

	accepted = function () {
		console.log('accepted notification')
		this.acceptModalPointer.setAttribute('hidden', 'true')
	}
}