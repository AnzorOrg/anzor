import {Component} from 'angular2/core';
import {UserDataService} from '../user-data/user-data.service';

@Component({
    selector: 'welcome-page',
    templateUrl: './app/welcome-page/welcome-page.html'
})
export class WelcomePageComponent {

	constructor(private _userDataService: UserDataService) {}

	signUp = function(firstName, lastName, email) {
		this._userDataService.createUser(firstName, lastName, email);
		console.log(this._userDataService.getFirstName());
	};

}