import {Component, OnInit, ViewChild, Renderer} from 'angular2/core';
import {Router} from 'angular2/router';
import {UserDataService} from '../user-data/user-data.service';

import {ModalComponent} from '../modal/modal.component';
import {SignInFormComponent} from '../sign-in-form/sign-in-form.component';

@Component({
	selector: 'navbar',
	templateUrl: './app/navbar/navbar.html',
	directives: [ModalComponent, SignInFormComponent]
})
export class NavbarComponent implements OnInit {

	@ViewChild('signInModal') signInModal;
	inputs;
	modal;

	constructor(
		private _router: Router,
		private _userDataService: UserDataService,
        private _renderer: Renderer
	){};

	ngOnInit() {
		if (this._userDataService.isSignedIn != null)
			this.checkIfSignedIn();
	};

	ngAfterViewInit() {
		this.modal =
			this.signInModal.nativeElement.getElementsByClassName('modal-container')[0];

		this.inputs = this.modal.getElementsByTagName('input');
	}

	checkIfSignedIn = function() {
		var self = this;
		this._userDataService.isSignedIn(
			function(){},
			function() {
				self._router.navigate(['Welcome']);
			}
		);
	};

	showDropdown = function(dropdown) {
		dropdown.setAttribute('hidden', 'false');
	}

	hideDropdown = function(dropdown) {
		dropdown.setAttribute('hidden', 'true');
	}

	signIn = function() {
		this.modal.setAttribute('hidden', 'false');
	};

	modalSignInClicked = function() {
		var self = this;
		var email = this.inputs[0].value;
		var password = this.inputs[1].value;
		this._userDataService.signIn(email, password, function() {
			self.modal.setAttribute('hidden', 'true');
			self.userSignedIn(); 
		});
	};

	signOut = function(){
		var self = this;
		console.log('signout')
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