function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	//Cite: https://stackoverflow.com/questions/34940099/how-to-sort-a-hashmap-with-respect-to-the-value
	var activityCnt = [{activity: 'skiing', count: 0},
										 {activity: 'running', count: 0},
									 	 {activity: 'walking', count: 0},
									 	 {activity: 'biking', count: 0},
									 	 {activity: 'yoga', count: 0},
									 	 {activity: 'workout', count: 0},
									 	 {activity: 'hiking', count: 0},
										 {activity: 'chair riding', count: 0},
									 	 {activity: 'freestyle', count: 0},
									   {activity: 'others', count: 0}];

	tweet_array.forEach((item) => {
		//Count the total tweets of each activity
		if(item.activityType == 'skiing') {
			activityCnt[0].count++;
		}
		else if(item.activityType == 'running') {
			activityCnt[1].count++;
		}
		else if(item.activityType == 'walking') {
			activityCnt[2].count++;
		}
		else if(item.activityType == 'biking') {
			activityCnt[3].count++;
		}
		else if(item.activityType == 'yoga') {
			activityCnt[4].count++;
		}
		else if(item.activityType == 'workout') {
			activityCnt[5].count++;
		}
		else if(item.activityType == 'hiking') {
			activityCnt[6].count++;
		}
		else if(item.activityType == 'chair riding') {
			activityCnt[7].count++;
		}
		else if(item.activityType == 'freestyle') {
			activityCnt[8].count++;
		}
		else if(item.activityType == 'others') {
			activityCnt[9].count++;
		}
	});

	//Sorting the array of activity types
	//Cite: https://stackoverflow.com/questions/34940099/how-to-sort-a-hashmap-with-respect-to-the-value
	var sortedActivityCnt = activityCnt.sort(function(a, b) {
		return (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0);
	});

	console.log(sortedActivityCnt);

	//Assign the date to html file
	document.getElementById('numberActivities').textContent = sortedActivityCnt.length;
	document.getElementById('firstMost').textContent = sortedActivityCnt[0].activity;
	document.getElementById('secondMost').textContent = sortedActivityCnt[1].activity;
	document.getElementById('thirdMost').textContent = sortedActivityCnt[2].activity;

	//Cite: https://vega.github.io/vega-lite/examples/bar.html
	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
		"width": 450,
		"height": 450,
	  "data": {
	    "values": sortedActivityCnt
	  },
	  //TODO: Add mark and encoding
		"mark": "bar",
  	"encoding": {
			"x": {"field": "activity", "type": "nominal", "axis": {"labelAngle": 0}},
			"y": {"field": "count", "type": "quantitative"}
		}
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	var threeMostActivitiesData = [];
	var options = { weekday: 'long'};

	tweet_array.forEach((item) => {
		if(item.activityType == sortedActivityCnt[0].activity) {
			//Create a temporary object
			let tempActivity = {};
			tempActivity.activity = item.activityType;
			tempActivity.distance = item.distance;
			tempActivity.day = item.time.toLocaleDateString('en-US', options);

			//Save the object to threeMostActivitiesData list
			threeMostActivitiesData.push(tempActivity);
		}
		else if(item.activityType == sortedActivityCnt[1].activity) {
			//Create a temporary object
			let tempActivity = {};
			tempActivity.activity = item.activityType;
			tempActivity.distance = item.distance;
			tempActivity.day = item.time.toLocaleDateString('en-US', options);

			//Save the object to threeMostActivitiesData list
			threeMostActivitiesData.push(tempActivity);
		}
		else if(item.activityType == sortedActivityCnt[2].activity) {
			//Create a temporary object
			let tempActivity = {};
			tempActivity.activity = item.activityType;
			tempActivity.distance = item.distance;
			tempActivity.day = item.time.toLocaleDateString('en-US', options);

			//Save the object to threeMostActivitiesData list
			threeMostActivitiesData.push(tempActivity);
		}
	});

	//A plot of the distances by day of the week for all of the three most tweeted-about activities
	//Cite: https://vega.github.io/vega-lite/examples/point_color_with_shape.html
	distance_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.0.0-beta.8.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"width": 600,
		"height": 300,
	  "data": {
			"values": threeMostActivitiesData
		},
		"selection": {
			"paintbrush": {
				"type": "multi",
				"on": "mouseover", "empty": "all"
			}
		},
		"mark": "point",
		"encoding": {
			"x": {
				"field": "day",
				"type": "ordinal",
				"sort": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				"axis": {"title": "time (day)"}
			},
			"y": {
				"field": "distance",
				"type": "quantitative",
				"axis": {"title": "distance (mile)"}
			},
			"size": {
				"condition": {
					"selection": "paintbrush", "value": 300
				},
				"value": 50
			},
			"color": {
				"field": "activity",
				"type": "nominal",
				"scale": {
					"domain": ["running","walking","biking"]				},
				"legend": {"title": "activity type"}
			}
		}
	};
	vegaEmbed('#distanceVis', distance_vis_spec, {actions:false});

	//A plot of the distances by day of the week for all of the three most tweeted-about activities, aggregated by mean
	//Cite: https://vega.github.io/vega-lite/docs/aggregate.html
	distance_vis_aggregated = {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.0.0-beta.8.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"width": 600,
		"height": 300,
	  "data": {
			"values": threeMostActivitiesData
		},
		"selection": {
			"paintbrush": {
				"type": "multi",
				"on": "mouseover", "empty": "all"
			}
		},
		"mark": "point",
		"encoding": {
			"x": {
				"field": "day",
				"type": "ordinal",
				"sort": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				"axis": {"title": "time (day)"}
			},
			"y": {
				"field": "distance",
				"type": "quantitative",
				"aggregate": "mean",
				"axis": {"title": "mean of distance (mile)"}
			},
			"size": {
				"condition": {
					"selection": "paintbrush", "value": 300
				},
				"value": 50
			},
			"color": {
				"field": "activity",
				"type": "nominal",
				"scale": {
					"domain": ["running","walking","biking"]				},
				"legend": {"title": "activity type"}
			}
		}
	};
	vegaEmbed('#distanceVisAggregated', distance_vis_aggregated, {actions:false});

	//Responding to button clicks
	var button = document.getElementById('aggregate');
	var graph = document.getElementById('distanceVis');
	var aggregateGraph = document.getElementById('distanceVisAggregated');
	var buttonClicked = false;

	aggregateGraph.style.display = 'none';		//Hide aggregateGraph in the beginning

	button.addEventListener("click", function() {
		if(buttonClicked == false) {
			graph.style.display = 'none';
			aggregateGraph.style.display = '';
			buttonClicked = true;
			button.innerHTML = "Show all activities";
		}
		else {
			graph.style.display = '';
			aggregateGraph.style.display = 'none';
			buttonClicked = false;
			button.innerHTML = "Show means";
		}
	});

	//Set the activities with the longest and shortest distance and when
	document.getElementById('longestActivityType').textContent = 'bike';
	document.getElementById('shortestActivityType').textContent = 'walk';
	document.getElementById('weekdayOrWeekendLonger').textContent = 'weekdays';
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});
