import {Injectable} from 'angular2/core'
import {ApiService} from '../api-service/api-service'

@Injectable()
export class AnnouncementDataService {

	constructor (private _apiService: ApiService){}

}