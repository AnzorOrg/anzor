import {Announcement} from '../announcement-data/announcement'

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
}