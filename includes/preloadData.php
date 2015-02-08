<?php
	include('config.php');
	header('Content-type: text/javascript');

	/* Our Event class setting up our public variables for our $event object to use */
	class Event {
		public $id;
		public $summary;
		public $start;
		public $end;
		public $location;
	}

	$event1 = new Event(); //Create new object
	$event2 = new Event(); //Create new object
	$event3 = new Event(); //Create new object
	$events = array(); //create out events array

	//Dummy data - hard coded
	$event1->id = '01';
	$event1->summary = 'This is a test';
	$event1->start->dateTime = '2015-02-07T17:01:00-05:00';
	$event1->end->dateTime = '2015-02-07T17:02:00-05:00';
	$event1->location = 'Gainesville, FL';
	array_push($events, $event1);
	$event2->id = '02';
	$event2->summary = 'This is a test 2';
	$event2->start->dateTime = '2015-02-12T17:01:00-05:00';
	$event2->end->dateTime = '2015-02-12T17:02:00-05:00';
	$event2->location = 'Gainesville, FL';
	array_push($events, $event2);
	$event3->id = '03';
	$event3->summary = 'This is a test 3';
	$event3->start->dateTime = '2015-02-09T17:01:00-05:00';
	$event3->end->dateTime = '2015-02-09T17:02:00-05:00';
	$event3->location = 'Gainesville, FL';
	array_push($events, $event3);

	$initialData = json_encode($events); //print it as json string for out javascript to use
?>
window.preloadData = JSON.parse('<?=$initialData?>');
window.clientid = '<?=$website_config['clientid']?>';
