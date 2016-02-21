import {Announcement} from '../announcement-data/announcement'

export class Team {
	teamName: string
	admins: [string]
	members: [string]
	announcements: [Announcement]
}