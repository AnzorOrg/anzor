import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {UserDataService} from '../user-data/user-data.service';

@Component({
	selector: 'sign-up-form',
	templateUrl: './app/sign-up-form/sign-up-form.html'
})
export class SignUpFormComponent
{
	constructor(
		private _userDataService: UserDataService,
		private _router: Router
	){}

	signUp = function(firstName, lastName, email, password) {
		var self = this;
		this._userDataService.signUp(firstName, lastName, email, password, function() { 
			self._router.navigate(['Dashboard']); 
		});
	};
}