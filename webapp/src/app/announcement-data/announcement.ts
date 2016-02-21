export class Announcement {
	title: string
	author: string
	body: string
	timeStamp: Date

	constructor (title, author, body, timeStamp){
		this.title=title;
		this.author=author;
		this.body=body;
		this.timeStamp=timeStamp;
	}

	static fromJsonObject = function (jsonObject) {
		return new Announcement(
			jsonObject.title,
			jsonObject.author,
			jsonObject.body,
			jsonObject.createdAt)
	}

	static fromJsonArray = function (jsonArray) {
		var announcements = []
		for (var i = 0; i < jsonArray.length;i++){
			console.log(jsonArray[i]);
			announcements.push(Announcement.fromJsonObject(jsonArray[i]))
		}
		return announcements;
	}
}