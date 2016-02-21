import {Component, OnInit} from 'angular2/core';
import {ModalComponent} from '../modal/modal.component';
import {SignInFormComponent} from '../sign-in-form/sign-in-form.component';
import {SignUpFormComponent} from '../sign-up-form/sign-up-form.component';

@Component({
    selector: 'welcome-page',
    templateUrl: './app/welcome-page/welcome-page.html',
    directives: [ModalComponent, SignInFormComponent, SignUpFormComponent]
})
export class WelcomePageComponent{}