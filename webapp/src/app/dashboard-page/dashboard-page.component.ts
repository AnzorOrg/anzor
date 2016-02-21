import {Component, OnInit} from 'angular2/core';
import {TeamListComponent} from '../team-list/team-list.component';

@Component({
    selector: 'dashboard-page',
    templateUrl: './app/dashboard-page/dashboard-page.html',
    directives: [TeamListComponent]
})
export class DashboardPageComponent{}