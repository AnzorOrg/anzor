import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {UserDataService} from '../user-data/user-data.service';

@Component({
	selector: 'sign-in-form',
	templateUrl: './app/sign-in-form/sign-in-form.html'
})
export class SignInFormComponent
{
	constructor(
		private _userDataService: UserDataService,
		private _router: Router
	){}

	signIn = function(email, password) {
		var self = this;
		this._userDataService.signIn(email, password, function() {
			self._router.navigate(['Dashboard']);
		});
	};
}