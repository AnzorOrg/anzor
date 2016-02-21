import {Announcement} from '../announcement-data/announcement'
import {User} from '../user-data/user'

export class Team {
	teamName: string
	admins: [string]
	members: [string]
	announcements: [Announcement]

	constructor(teamName, admins, members, announcements){
		this.teamName = teamName
		this.admins = admins
		this.members = members
		this.announcements = announcements
	}

	static fromJsonObject = function(jsonObject) {

		var announements = Announcement.fromJsonArray(jsonObject.announcements)
		var admins = jsonObject.admins
		var members = User.fromJsonArray(jsonObject.members)
		var newTeam = new Team(jsonObject.teamName, admins, members, announements)
		return newTeam;
	}

	static fromJsonArray = function(jsonArray) {
		var teams = []
		for (var i = 0; i < jsonArray.length; i++) {
			teams.push(User.fromJsonObject(jsonArray[i]))
		}
		return teams
	}
}