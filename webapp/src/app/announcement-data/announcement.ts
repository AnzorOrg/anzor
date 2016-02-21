export class Announcement {
	title: string
	author: string
	body: string
	timeStamp: Date

	constructor (title, author, body, timeStamp){
		this.title
	}

	static fromJsonObject = function (jsonObject) {
		return new Announcement(
			jsonObject.title,
			jsonObject.author,
			jsonObject.body,
			jsonObject.timeStamp)
	}

	static fromJsonArray = function (jsonArray) {
		var announcements = []
		for (var i = 0; i < jsonArray.length;i++){
			announcements.push(Announcement.fromJsonObject(jsonArray[i]))
		}
		return announcements
	}
}