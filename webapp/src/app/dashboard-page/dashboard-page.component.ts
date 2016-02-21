import {Component, OnInit} from 'angular2/core';
import {TeamListComponent} from '../team-list/team-list.component';
import {NotificationListComponent} from '../notification-list/notification-list.component';

@Component({
    selector: 'dashboard-page',
    templateUrl: './app/dashboard-page/dashboard-page.html',
    directives: [TeamListComponent, NotificationListComponent]
})
export class DashboardPageComponent{}