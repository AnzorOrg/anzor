import {Component, OnInit} from 'angular2/core';
import {SignInFormComponent} from '../sign-in-form/sign-in-form.component';
import {SignUpFormComponent} from '../sign-up-form/sign-up-form.component';

@Component({
    selector: 'welcome-page',
    templateUrl: './app/welcome-page/welcome-page.html',
    directives: [SignInFormComponent, SignUpFormComponent]
})
export class WelcomePageComponent{}