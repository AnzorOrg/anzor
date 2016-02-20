import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {WelcomePageComponent} from './welcome-page/welcome-page.component';


@Component({
    selector: 'my-app',
    template: `
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/welcome', name: 'Welcome', component: WelcomePageComponent},
    { path: '/', redirectTo: ['/Welcome'] }
])
export class AppComponent {}