<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Edit Tenant</h6>
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
	mounted: async function(){

		$('#myDropify').on('change', this.prepareUpload);

		const edit = await axios.get(rest["tenantbyid"] + `?id=${this.$route.params.id}`);
		var datas = edit.data.data;
		
		var vue = this
		var act = {
			api: rest["edittenant"],
			vue: vue,
			action: 'edit',
			back: 'tenant'
		}

		$('#form-input').createForm(act,
		[
			$.inpimage('Image', 'image', 'image',true, {
                path: 'tenant',
                accept: ['jpg','png','jpeg'],
                height: 250,
                width: 250,
                value: datas.image.large,
			}),
			$.inptext('Title','tenant','tenant',true,{
				placeholder: 'Title',
                value: datas.tenant,
			}),
			$.inpselect2(`Category`,`category`,`category`,true,{
				placeholder : `Choose Category`,
				api : rest["sel2tenantcat"],
				selected: [{
		        	id: datas.category.id,
		        	text: datas.category.name_category
		        }]
			}),
			$.inpselect2(`Location`,`location`,`location`,true,{
				placeholder : `Choose Location`,
				api : rest["sel2floormaps"],
				selected: [{
		        	id: datas.floormaps.id,
		        	text: datas.floormaps.full_name
		        }]
			}),
		]);
	}
};
</script>