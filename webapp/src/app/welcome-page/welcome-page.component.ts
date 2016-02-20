import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {UserDataService} from '../user-data/user-data.service';

@Component({
    selector: 'welcome-page',
    templateUrl: './app/welcome-page/welcome-page.html'
})
export class WelcomePageComponent implements OnInit {

	constructor(
        private _router: Router,
		private _userDataService: UserDataService
	) {}

	ngOnInit(){
		if (this._userDataService.isSignedIn != null)
			this.checkIfSignedIn();
	};

	checkIfSignedIn = function() {
		var self = this;
		this._userDataService.isSignedIn(
			function(){self.userSignedIn()},
			function(){}
		);
	};

	signUp = function(firstName, lastName, email, password) {
		var self = this;
		this._userDataService.signUp(firstName, lastName, email, password, function(){self.userSignedIn()});
	};

	signIn = function(email, password) {
		var self = this;
		this._userDataService.signIn(email, password, function(){self.userSignedIn()});
	};

	userSignedIn = function() {
		//  Route to user dashboard
		console.log('Routing to dashboard!');
		this._router.navigate(['Dashboard']);
	};
}