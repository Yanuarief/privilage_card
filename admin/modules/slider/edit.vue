<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Edit slider</h6>
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


		const edit = await axios.get(rest["sliderbyid"] + `?id=${this.$route.params.id}`);
		var datas = edit.data.data

		var input = [
			$.inpimage('Image', 'image', 'image',true, {
                path: 'slider',
                accept: ['jpg','png','jpeg'],
                height: 250,
                width: 450,
                value: datas.image.large
			}),
			$.inpcheckbox('Publish','publish','publish',false,{
				value: datas.publish
			}),
		]

		var vue = this
		var act = {
			api: rest["editslider"],
			vue: vue,
			action: 'edit',
			back: 'slider'
		}

		$('#form-input').createForm(act,input);
        
	}
};
</script>