<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Edit Event</h6>
	        <div id="form-event"></div>
	        <!-- <form method="post" class="forms-sample" id="add-events" enctype="multipart/form-data" v-on:submit="submitAct($event)">
				<div class="row">
					<div class="col-sm-12">
						<div class="form-group" id="imagedrop" style="display:none;">
							<label>Image</label>
						    <input type="file" name="images" id="myDropify" data-height="250" class="border" accept=".png, .jpg, .jpeg"/>
		                </div>
	                </div>
	            </div>
				<div class="row">
					<div class="col-md-6">
						<div class="form-group">
							<label>Start Date Event</label>
							<div class="input-group date datepicker" id="start-date">
					          <input type="text" name="start_date" class="form-control" required><span class="input-group-addon"><i data-feather="calendar"></i></span>
					        </div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label>End Date Event</label>
							<div class="input-group date datepicker" id="end-date">
					          <input type="text" name="end_date" class="form-control" required><span class="input-group-addon"><i data-feather="calendar"></i></span>
					        </div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<label>Title</label>
					<input type="text" name="events" class="form-control" autocomplete="off" placeholder="Title" required>
				</div>
				<div class="form-group">
					<label>Location</label>
					<input type="text" name="location" class="form-control" autocomplete="off" placeholder="Location" required>
				</div>

				<div class="form-group">
					<label>Floormaps</label>
					<div class="select-2-wrapper" style="width:100%" id="floormaps">
	                    <select class="form-control js-example-basic-single" id="floormaps_select" name="floormaps" required>
	                    </select>
	                </div>
	            </div>
				<div id="loading-submit" style="display:none;">
					<div class="progress">
					  <div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
					</div>
				</div>
				<div id="loading-action" style="display:show;">
					<button type="submit" class="btn btn-primary mr-2">Edit</button>
					<router-link :to="{path: `/events` }" class="btn btn-light">Cancel</router-link>
		        </div>
	        </form> -->
	      </div>
	    </div>
	  </div>
	</div>
</template>

<script>

module.exports = {
	/*data() {
		return {
		  file: [],
		}
	},
	computed:{
	    values(){
	        return {
	            file: this.file
	        }
	    }
	},
	methods: {
	},*/
	mounted: async function(){

        const edit = await axios.get(rest["eventsbyid"] + `?id=${this.$route.params.id}`);
		var datas = edit.data.data;

		var floormaps_value = [{
        	id: datas.floormaps.id,
        	text: datas.floormaps.full_name
        }]

        var input = [
			$.inpimage('Image', 'image', 'image',true, {
                path: 'events',
                accept: ['jpg','png','jpeg'],
                height: 250,
                width: 250,
                value: datas.image.large
			}),
			$.html(`<div class="row"><div class="col-md-6">`),
			$.inpdate('Start Date','start_date','start_date',true,{
				value: datas.start_date
			}),
			$.html(`</div><div class="col-md-6">`),
			$.inpdate('End Date','end_date','end_date',true,{
				value: datas.end_date
			}),
			$.html(`</div></div>`),
			$.inptext('Title','events','events',true,{
				placeholder: 'Title',
				value: datas.events
			}),
			$.inptext('Location','location','location',true,{
				placeholder: 'Location',
				value: datas.location
			}),
			$.inpselect2(`Floormaps`,`floormaps`,`floormaps`,true,{
				 placeholder : `Choose Floormaps`,
				 api : rest["sel2floormaps"],
				 selected : floormaps_value,
			}),
		]

		var act = {
			api: rest["editevents"],
			vue: this,
			action: 'edit',
			back: 'events'
		}

		$('#form-event').createForm(act,input);
	}
};
</script>