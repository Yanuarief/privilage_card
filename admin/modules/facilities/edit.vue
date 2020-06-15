<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Edit facilities</h6>
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
	mounted: async function(){

		const edit = await axios.get(rest["facilitiesbyid"] + `?id=${this.$route.params.id}`);
		var datas = edit.data.data
		
		var input = [
			$.inpimage('Image', 'image', 'image',true, {
                path: 'facilities',
                accept: ['jpg','png','jpeg'],
                height: 250,
                width: 250,
                value: datas.image.large
			}),
			$.inptext('Title','facilities','facilities',true,{
				placeholder: 'Title',
				value: datas.facilities
			}),
			$.inptext('Description','desc_facilities','desc_facilities',true,{
				placeholder: 'Description',
				value: datas.desc_facilities
			}),
		]

		var vue = this
		var act = {
			api: rest["editfacilities"],
			vue: vue,
			action: 'edit',
			back: 'facilities'
		}

		$('#form-input').createForm(act,input);
	}
};
</script>