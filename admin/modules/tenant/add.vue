<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Add Tenant</h6>
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
			api: rest["addtenant"],
			vue: vue,
			action: 'add',
			back: 'tenant'
		}

		$('#form-input').createForm(act,
		[
			$.inpimage('Image', 'image', 'image',true, {
                path: 'tenant',
                accept: ['jpg','png','jpeg'],
                height: 250,
                width: 250,
			}),
			$.inptext('Title','tenant','tenant',true,{
				placeholder: 'Title'
			}),
			$.inpselect2(`Category`,`category`,`category`,true,{
				 placeholder : `Choose Category`,
				 api : rest["sel2tenantcat"],
			}),
			$.inpselect2(`Location`,`location`,`location`,true,{
				 placeholder : `Choose Location`,
				 api : rest["sel2floormaps"],
			}),
		]);
	}
};
</script>