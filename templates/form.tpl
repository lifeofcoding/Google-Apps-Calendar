<%
	var eventData = arguments[0] || null;

	function dateFormat(date){
		return moment(date).format('MM/DD/YYYY h:mm:ss a');
	}
%>
<form>
  <div class="form-group">
    <label for="event-title">Event Title</label>
    <input type="email" class="form-control" id="event-title" name="title" value="<%= eventData !== null ? eventData.get('summary') : '' %>">
  </div>

<div class="form-group">
<label for="datetimepickerStart">Start Date & Time</label>
	<div class='input-group date' id='datetimepickerStart'>
            <input type='text' class="form-control" name='start' value="<%= eventData !== null ? (dateFormat(eventData.get('start').dateTime) || dateFormat(eventData.get('start').date)) : '' %>"/>
            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
            </span>
        </div>
</div>

<div class="form-group">
<label for="datetimepickerEnd">End Date & Time</label>
	<div class='input-group date' id='datetimepickerEnd'>
            <input type='text' class="form-control" name='end' value="<%= eventData !== null ? (dateFormat(eventData.get('end').dateTime) || dateFormat(eventData.get('end').date)) : '' %>"/>
            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
            </span>
        </div>
</div>

  <div class="form-group">
    <label for="location">Event Location</label>
    <input type="text" class="form-control" name="location" id="location" value="<%= eventData !== null ? eventData.get('location') : '' %>">
  </div>

</form>
