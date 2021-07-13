function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;


	//TWEET DATES
	//Cite: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
	var earliestTweetDate;
	var latestTweetDate;
	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

	for (let i of tweet_array) {
		//Find the earliest tweet date
		if(typeof earliestTweetDate == 'undefined') {
			earliestTweetDate = i.time.getTime();
		}
		else if(i.time.getTime() < earliestTweetDate) {
			earliestTweetDate = i.time.getTime();
		}
		//Find the latest tweet date
		if(typeof latestTweetDate == 'undefined') {
			latestTweetDate = i.time.getTime();
		}
		else if(i.time.getTime() > latestTweetDate) {
			latestTweetDate = i.time.getTime();
		}
  }

	earliestTweetDate = new Date(earliestTweetDate);
	latestTweetDate = new Date(latestTweetDate);

	//Assign the date to html file
	document.getElementById('firstDate').textContent = earliestTweetDate.toLocaleDateString('en-US', options);
	document.getElementById('lastDate').textContent = latestTweetDate.toLocaleDateString('en-US', options);


	//TWEET CATEGORIES
	completedEventsCnt = 0;
	liveEventsCnt = 0;
	achievementCnt = 0;
	miscellaneousCnt = 0;

	tweet_array.forEach((item) => {
		if(item.source == "completed_event") {
			completedEventsCnt++;
		}
		else if(item.source == "live_event") {
			liveEventsCnt++;
		}
		else if(item.source == "achievement") {
			achievementCnt++;
		}
		else if(item.source == "miscellaneous") {
			miscellaneousCnt++;
		}
	});

	//Assign the date to html file
	document.getElementsByClassName('completedEvents')[0].textContent = completedEventsCnt;
	document.getElementsByClassName('completedEventsPct')[0].textContent = ((completedEventsCnt / tweet_array.length) * 100).toFixed(2) + '%';
	document.getElementsByClassName('liveEvents')[0].textContent = liveEventsCnt;
	document.getElementsByClassName('liveEventsPct')[0].textContent = ((liveEventsCnt / tweet_array.length) * 100).toFixed(2) + '%';
	document.getElementsByClassName('achievements')[0].textContent = achievementCnt;
	document.getElementsByClassName('achievementsPct')[0].textContent = ((achievementCnt / tweet_array.length) * 100).toFixed(2) + '%';
	document.getElementsByClassName('miscellaneous')[0].textContent = miscellaneousCnt;
	document.getElementsByClassName('miscellaneousPct')[0].textContent = ((miscellaneousCnt / tweet_array.length) * 100).toFixed(2) + '%';


	//USER-WRITTEN TWEETS
	var writtenTweetsCnt = 0;
	tweet_array.forEach((item) => {
		if(item.written == true) {
			writtenTweetsCnt++;
		}
	});

	//Assign written tweets to html file
	document.getElementsByClassName('completedEvents')[1].textContent = completedEventsCnt;
	document.getElementsByClassName('written')[0].textContent = writtenTweetsCnt;
	document.getElementsByClassName('writtenPct')[0].textContent = ((writtenTweetsCnt / completedEventsCnt) * 100).toFixed(2) + '%';
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});
