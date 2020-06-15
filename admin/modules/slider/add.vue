<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Add slider</h6>
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
                path: 'slider',
                accept: ['jpg','png','jpeg'],
                height: 250,
                width: 450,
			}),
			$.inpcheckbox('Publish','publish','publish'),
		]

		var vue = this
		var act = {
			api: rest["addslider"],
			vue: vue,
			action: 'add',
			back: 'slider'
		}

		$('#form-input').createForm(act,input);
	}
};
</script>