import {Component} from 'angular2/core';
import {UserDataService} from '../user-data/user-data.service';

@Component({
    selector: 'welcome-page',
    templateUrl: './app/welcome-page/welcome-page.html'
})
export class WelcomePageComponent {

	constructor(private _userDataService: UserDataService) {}

	signUp = function(firstName, lastName, email, password) {
		this._userDataService.signUp(firstName, lastName, email, password, this.userSignedIn);
	};

	signIn = function(email, password) {
		this._userDataService.signIn(email, password, this.userSignedIn);
	};

	userSignedIn = function() {
		//  Route to user dashboard
		console.log('Routing to dashboard!');
	};
}