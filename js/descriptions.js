var writtenTweet_array = [];

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//Get all the Tweets
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: Filter to just the written tweets
	tweet_array.forEach((item, i) => {
		if(item.written == true) {
			//Create a temporary object
			let tempActivity = {};
			tempActivity.activity = item.activityType;
			tempActivity.firstText = item.getFirstText;
			tempActivity.URL = item.getURL;
			tempActivity.lastText = item.getLastText;
			tempActivity.number = i + 1;

			//Save the object to writtenTweet_array list
			writtenTweet_array.push(tempActivity);
		}
	});

}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	let input = document.querySelector('input');			//Read the input from the search box
	let filterr;																			//Read the input from input
	var filtered_Array = [];													//Array that is filtered by the user input
	var filtered_ArrayCount;

	//POPULATE THE TABLE with the filtered_Array
	//Cite: https://www.w3schools.com/jsref/met_table_insertrow.asp

	// Find a <table> element with id="myTable":
	var table = document.getElementById("tweetTable");

	writtenTweet_array.forEach((item, i) => {
		// Create an empty <tr> element and add it to the 1st position of the table:
		var row = table.insertRow(i);

		// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);

		// Add some text to the new cells:
		cell1.innerHTML = item['number'];
		cell2.innerHTML = item['activity'];
		cell3.innerHTML = item['firstText'] + ' ' + item['URL'] + ' ' + item['lastText'];

		//Hide rows when table created
		row.style.display = 'none';
	});


	//FILTER BASED ON USER'S INPUT
	//Cite: https://www.w3schools.com/jsref/coll_table_cells.asp
	input.addEventListener('input', (item) => {
		filterr = item.target.value;
		filtered_ArrayCount = 0;


		var lst = document.getElementById("tweetTable").rows;
    for(let i = 0; i < lst.length; ++i) {
			if(filterr == '') {							//If search box is empty...
				lst[i].style.display = 'none';
			}
			else if(lst[i].cells[2].innerHTML.toLowerCase().includes(filterr) ||
				 lst[i].cells[1].innerHTML.toLowerCase().includes(filterr)) {
				lst[i].style.display = '';
				filtered_ArrayCount++;
			}
			else {
				lst[i].style.display = 'none';
			}
    }

		//Add the user's input to searchText
		document.getElementById('searchText').textContent = filterr;
		//Add the number of tweets containing the user's input
		document.getElementById('searchCount').textContent = filtered_ArrayCount;
	});

}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	//addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets).then(addEventHandlerForSearch);
});
