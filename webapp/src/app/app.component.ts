import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {NavbarComponent} from './navbar/navbar.component';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';


@Component({
    selector: 'my-app',
    template: `
    	<navbar></navbar>
    	<div class="page">
        	<router-outlet></router-outlet>
        </div>
    `,
    directives: [NavbarComponent, ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/welcome', name: 'Welcome', component: WelcomePageComponent},
    { path: '/', redirectTo: ['/Welcome'] }
])
export class AppComponent {}