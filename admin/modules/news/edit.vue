<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Edit News</h6>
	        <div id="form-news"></div>
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

        const edit = await axios.get(rest["newsbyid"] + `?id=${this.$route.params.id}`);
		var datas = edit.data.data;

        var vue = this
		var act = {
			api: rest["editnews"],
			vue: vue,
			action: 'edit',
			back: 'news'
		}

		$('#form-news').createForm(act,
		[
			$.inpimage('Image', 'image', 'image',true, {
                path: 'news',
                accept: ['jpg','png','jpeg'],
                height: 250,
                width: 250,
                value: datas.image.large,
			}),
			$.inptext('Title','tittle','tittle',true,{
				value: datas.tittle
			}),
            $.inpckeditor('Description','description','description',true,{
                value: datas.deskripsi
			}),
			$.inpcheckbox(`Active ?`,`active`,`active`,false,{
				 value : datas.status
			}),
            
		]);
	}
};
</script>