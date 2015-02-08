<?php
if(isset($_GET['debug'])){
	error_reporting(E_ALL);
}else{
	error_reporting(0);
}
$cacheNumber = rand(1000,99999999);
include('includes/config.php');
include('includes/bootstrap.php');
?>
<!DOCTYPE html>
<html lang="en">
  <head>
	<meta charset="UTF-8">
	<title>Mobiquity Calendar Example</title>
	<link rel="stylesheet" type="text/css" href="/css/fonts.css">
	<link rel="stylesheet" type="text/css" href="/css/app.css">
	<link rel="stylesheet" type="text/css" href="/libs/fullcalendar.css">
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
	<link rel="stylesheet" href="/css/bootstrap-datetimepicker.min.css">
	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">

	<script src="/includes/preloadData.php"></script>

  </head>
  <body>

	<div id="wrapper"></div>

	<!-- 3rd party Dependencies -->
	<script src="/libs/jquery.js"></script>
	<script src="/libs/moment.js"></script>
	<script src="/libs/underscore.js"></script>
	<script src="/libs/backbone.js"></script>
	<script src="/libs/backbone.marionette.js"></script>
	<script src="/libs/fullcalendar.js"></script>
	<script type="text/javascript" src="/libs/bootstrap-datetimepicker.min.js"></script>
	<script type="text/javascript" src="/libs/bootstrap-growl.js"></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jstimezonedetect/1.0.4/jstz.min.js"></script>

	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>

	<script src="/js/app.js?cache=<?php echo $cacheNumber; ?>"></script>
	<?php include('assets.php'); ?>
	<script src="/js/router.js?cache=<?php echo $cacheNumber; ?>"></script>
	<script src="/bootstrap.js?cache=<?php echo $cacheNumber; ?>"></script>
	<script src="https://apis.google.com/js/client.js?onload=handleClientLoad"></script>
	<?= loadTemplates(); ?>

  </body>
</html>
