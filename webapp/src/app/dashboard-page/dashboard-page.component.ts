import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {UserDataService} from '../user-data/user-data.service';

@Component({
    selector: 'dashboard-page',
    templateUrl: './app/dashboard-page/dashboard-page.html'
})
export class DashboardPageComponent implements OnInit{

	constructor(
		private _router: Router,
		private _userDataService: UserDataService
	){};

	ngOnInit() {
		if (this._userDataService.isSignedIn != null)
			this.checkIfSignedIn();
	};

	checkIfSignedIn = function() {
		this._userDataService.isSignedIn(
			function() { },
			this.userNotSignedIn
		);
	};

	userNotSignedIn = function() {
		//  Route to user dashboard
		console.log('Routing to welcome!');
		this._router.navigate(['Welcome']);
	};

	getTeams = function() {
		//	Get teams for the user and display them on page
	};


}