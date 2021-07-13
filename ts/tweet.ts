class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
				this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
				let loweredText:string = this.text.toLowerCase();

				if(loweredText.startsWith('just completed') || loweredText.startsWith('just posted')) {
					return "completed_event";
				}
				else if(loweredText.includes('live')) {
					return "live_event";
				}
				else if(loweredText.startsWith('achieved')) {
					return "achievement";
				}
				else {
					return "miscellaneous";
				}
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
				if(this.text.includes('-')) {
					return true;
				}
				else {
					return false;
				}
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
				//Cite: https://stackoverflow.com/questions/14867835/get-substring-between-two-characters-using-javascript
				let subString:string = this.text.substring(
		    this.text.lastIndexOf('- ') + 1,
		    this.text.lastIndexOf(' https')
				);

				return subString;
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
				let loweredText:string = this.text.toLowerCase();
				if(loweredText.includes(' ski run ')) {
					return 'skiing';
				}
				else if(loweredText.includes(' run ')) {
					return 'running';
				}
				else if(loweredText.includes(' walk ')) {
					return 'walking';
				}
				else if(loweredText.includes(' bike ')) {
					return 'biking';
				}
				else if(loweredText.includes(' yoga ')) {
					return 'yoga';
				}
				else if(loweredText.includes(' workout ')) {
					return 'workout';
				}
				else if(loweredText.includes(' hike ')) {
					return 'hiking';
				}
				else if(loweredText.includes(' chair ride ')) {
					return 'chair riding';
				}
				else if(loweredText.includes(' freestyle ')) {
					return 'freestyle';
				}
				else {
					return 'others';
				}
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
				let loweredText:string = this.text.toLowerCase();
				let parsedText:string[] = loweredText.split(' ');				//Split the words into tokens
				let getDistance:number = parseInt(parsedText[3]);				//Get the distance value
				let getUnit:string = parsedText[4];											//Get the unit distance

				//Check if it is distance or not
				if(isNaN(getDistance)) {
					return 0;
				}
				else {
					if(getUnit == 'km') {
						getDistance = getDistance * 0.621371;	//Convert to miles
						return getDistance;
					}
					else {
						return getDistance;
					}
				}
    }

		get getFirstText():string {
			let firstText:string;

			//Get the words before the URL
			firstText = this.text.substring(
			0,
			this.text.lastIndexOf(' https')
			);

			return firstText;
		}

		get getURL():string {
			let splittedString:Array<string> = this.text.split(' ');
			let url:string = '';

			//Get the URL
			for(let i:number=0; i < splittedString.length; i++) {
				if(splittedString[i].includes('https')) {
					url = splittedString[i];
				}
			}

			return '<a href="' +url+ '">'  +url+'</a>';
		}

		get getLastText():string {
			let lastText:string;

			//Get the words after the URL
			lastText = this.text.substring(
				this.text.lastIndexOf('#')
			)

			return lastText;
		}

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity

				//Function not used. This function is replaced with 3 functions above:
				//			-getFirstText():string
				//			-getURL():string
				//			-getLastText():string
        return '<tr></tr>';
    }
}
