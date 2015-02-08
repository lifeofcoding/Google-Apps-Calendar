<!-- Create Event Modal -->
<div class="modal fade" id="createEvent" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Create Event</h4>
      </div>
      <div class="modal-body form-body"></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary submit">Save changes</button>
      </div>
    </div>
  </div>
</div>

<!-- Event Info Modal -->
<div class="modal fade" id="eventInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Event Info</h4>
      </div>
      <div class="modal-body form-body"></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary submit">Save changes</button>
      </div>
    </div>
  </div>
</div>

<!-- Go To Date Modal -->
<div class="modal fade" id="jumpToDate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Jump to Date</h4>
      </div>
      <div class="modal-body">

	<div class="form-group">
		<div class='input-group date' id='datetimepicker'>
		    <input type='text' class="form-control" name='datetimepicker'/>
		    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
		    </span>
		</div>
	</div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary submit">Go To Date</button>
      </div>
    </div>
  </div>
</div>
