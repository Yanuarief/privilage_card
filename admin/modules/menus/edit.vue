<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Edit menus</h6>
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

		const edit = await axios.get(rest["menusbyid"] + `?id=${this.$route.params.id}`);
		var datas = edit.data.data

		var input = [
			$.inpimage('Image', 'image', 'image',true, {
                path: 'menus',
                accept: ['jpg','png','jpeg'],
                height: 150,
                width: 450,
                value: datas.image.large
			}),
			$.inptext('Title','title','title',true,{
				placeholder: 'Title',
				value: datas.title
			}),
		]

		var vue = this
		var act = {
			api: rest["editmenus"],
			vue: vue,
			action: 'edit',
			back: 'menus'
		}

		$('#form-input').createForm(act,input);
	}
};
</script>