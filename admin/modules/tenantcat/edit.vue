<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Edit Tenant Category</h6>
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
	        return {
	        }
	    }
	},
	methods: {
		
	},
	mounted: async function(){

		const edit = await axios.get(rest["tenantcatbyid"] + `?id=${this.$route.params.id}`);
		var datas = edit.data.data

        var vue = this
		var act = {
			api: rest["edittenantcat"],
			vue: vue,
			action: 'edit',
			back: 'tenantcat'
		}

		$('#form-tencat').createForm(act,
		[
			$.inptext('Title','tenantcat','tenantcat',true,{
				placeholder: 'Title',
				value: datas.category
			}),
		]);
	}
};
</script>