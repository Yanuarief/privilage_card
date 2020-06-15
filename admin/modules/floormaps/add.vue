<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Add Floormaps</h6>
	        <div id="form-input"></div>
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
	},
	methods: {
	},
	mounted(){
		var vue = this
		var act = {
			api: rest["addfloormaps"],
			vue: vue,
			action: 'add',
			back: 'floormaps'
		}

		$('#form-input').createForm(act,
		[
			$.inpimage('Image', 'image', 'image',true, {
                path: 'floormaps',
                accept: ['jpg','png','jpeg'],
                height: 250,
                width: 362,
			}),
			$.inptext('Name','floormaps','floormaps',true,{
				placeholder: 'Name'
			}),
			$.inptext('Code Maps','code_maps','code_maps',true,{
				placeholder: 'Code Maps'
			}),
		]);
	}
};
</script>