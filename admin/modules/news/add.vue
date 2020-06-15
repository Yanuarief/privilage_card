<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Add News</h6>
	        <div id="form-news"></div>
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
			api: rest["addnews"],
			vue: vue,
			action: 'add',
			back: 'news'
		}

		$('#form-news').createForm(act,
		[
			$.inpimage('Image', 'image', 'image',true, {
                path: 'news',
                accept: ['jpg','png','jpeg'],
                height: 250,
                width: 250,
			}),
			$.inptext('Title','tittle','tittle',true,{
				placeholder: 'Title'
            }),
            $.inpckeditor('Description','description','description',true,{
            }),
		]);
	}
};
</script>