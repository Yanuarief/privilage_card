<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Add Event</h6>
	        <div id="form-event"></div>
	      </div>
	    </div>
	  </div>
	</div>
</template>

<script>

module.exports = {
	data() {
		return {
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
		
	},
	mounted(){

        var input = [
			$.inpimage('Image', 'image', 'image',true, {
                path: 'events',
                accept: ['jpg','png','jpeg'],
                height: 250,
                width: 250,
			}),
			$.html(`<div class="row"><div class="col-md-6">`),
			$.inpdate('Start Date','start_date','start_date',true),
			$.html(`</div><div class="col-md-6">`),
			$.inpdate('End Date','end_date','end_date',true),
			$.html(`</div></div>`),
			$.inptext('Title','events','events',true,{
				placeholder: 'Title'
			}),
			$.inptext('Location','location','location',true,{
				placeholder: 'Location'
			}),
			$.inpselect2(`Floormaps`,`floormaps`,`floormaps`,true,{
				 placeholder : `Choose Floormaps`,
				 api : rest["sel2floormaps"],
			}),
		]

		var vue = this
		var act = {
			api: rest["addevents"],
			vue: vue,
			action: 'add',
			back: 'events'
		}

		$('#form-event').createForm(act,input);
	}
};
</script>