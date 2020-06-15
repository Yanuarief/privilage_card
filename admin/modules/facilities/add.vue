<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Add facilities</h6>
	        <div id="form-input"></div>
	      </div>
	    </div>
	  </div>
	</div>
</template>

<script>

module.exports = {
	data() {
		return {}
	},
	computed:{
	},
	methods: {
	},
	mounted(){
		var input = [
			$.inpimage('Image', 'image', 'image',true, {
                path: 'facilities',
                accept: ['jpg','png','jpeg'],
                height: 250,
                width: 250,
			}),
			$.inptext('Title','facilities','facilities',true,{
				placeholder: 'Title'
			}),
			$.inptext('Description','desc_facilities','desc_facilities',true,{
				placeholder: 'Description'
			}),
		]

		var vue = this
		var act = {
			api: rest["addfacilities"],
			vue: vue,
			action: 'add',
			back: 'facilities'
		}

		$('#form-input').createForm(act,input);
	}
};
</script>