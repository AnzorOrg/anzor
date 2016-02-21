import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {UserDataService} from '../user-data/user-data.service';

@Component({
	selector: 'navbar',
	templateUrl: './app/navbar/navbar.html'
})
export class NavbarComponent {

	constructor(
		private _router: Router,
		private _userDataService: UserDataService
	){};

	showDropdown = function(dropdown) {
		dropdown.setAttribute('hidden', 'false');
	}

	hideDropdown = function(dropdown) {
		dropdown.setAttribute('hidden', 'true');
	}

	signIn = function(){
		//	Show sign in modal
		console.log('Sign in modal!');
	};

	signOut = function(){
		var self = this;

		if(this._userDataService.signOut != null)
			this._userDataService.signOut(function(){self.userSignedOut()});
	};

	userSignedIn = function(){
		this._router.navigate(['Dashboard']);
	};

	userSignedOut = function() {
		this._router.navigate(['Welcome']);
	};

	profileClicked = function() {
		console.log('Settings!');
	}

}