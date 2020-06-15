<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Add Souvenir</h6>
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
			api: rest["addsouvenir"],
			vue: vue,
			action: 'add',
			back: 'souvenir'
        }


		$('#form-input').createForm(act,
		[
            $.inpimage('Image', 'image', 'image',true, {
                path: 'souvenir',
                accept: ['jpg','png','jpeg'],
                height: 250,
                width: 250,
			   }),
            $.inptext('Nama Souvenir','namaSouvenir','namaSouvenir',true,{
				placeholder: 'Nama Souvenir'
            }),
            $.inptext('Harga','harga','harga',true,{
				placeholder: 'Harga'
            }),
            $.inptext('Point','point','point',true,{
				placeholder: 'Point'
            }),
            $.inptext('Stock','stock','stock',true,{
				placeholder: 'Stock'
            }),
            $.inptextarea('Keterangan','keterangan','keterangan',true,{
                placeholder: 'Keterangan'
            }),
		]);
	}
};
</script>