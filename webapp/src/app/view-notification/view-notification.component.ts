import {Component, Input} from 'angular2/core';
import {Router} from 'angular2/router';
import {TeamDataService} from '../team-data/team-data.service';

@Component({
	selector: 'view-notification',
	templateUrl: './app/view-notification/view-notification.html'
})
export class ViewNotificationFormComponent {
	@Input() hideButton;

	constructor(
		private _teamDataService: TeamDataService,
		private _router: Router
	) { }

	signIn = function(email, password) {
		var self = this;
		this._userDataService.signIn(email, password, function() {
			self._router.navigate(['Dashboard']);
		});
	};

	acceptInvite = function(notificationId) {
		var self = this
	}
}