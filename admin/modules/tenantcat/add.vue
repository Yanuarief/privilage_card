<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Add Tenant Category</h6>
	        <div id="form-tencat"></div>
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
	    }
	},
	methods: {
		
	},
	mounted(){
		var vue = this
		var act = {
			api: rest["addtenantcat"],
			vue: vue,
			action: 'add',
			back: 'tenantcat'
		}

		$('#form-tencat').createForm(act,
		[
			$.inptext('Title','tenantcat','tenantcat',true,{
				placeholder: 'Title'
			}),
		]);
	}
};
</script>