import {bootstrap} from 'angular2/platform/browser'
import {ROUTER_PROVIDERS} from 'angular2/router'
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './app.component';
import {UserDataService} from './user-data/user-data.service';
import {TeamDataService} from './team-data/team-data.service';
import {ApiService} from './api-service/api-service'

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    UserDataService,
    TeamDataService,
    ApiService
]);
