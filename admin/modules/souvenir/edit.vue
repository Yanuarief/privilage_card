<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Edit Souvenir</h6>
	        <div id="form-souvenir"></div>
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
        const edit = await axios.get(rest["souvenirbyid"] + `?id=${this.$route.params.id}`);
		var datas = edit.data.data;

        var vue = this
		var act = {
			api: rest["editsouvenir"],
			vue: vue,
			action: 'edit',
			back: 'souvenir'
		}

		$('#form-souvenir').createForm(act,
		[
			$.inpimage('Image', 'image', 'image',true, {
                path: 'souvenir',
                accept: ['jpg','png','jpeg'],
                height: 250,
                width: 250,
                value: datas.foto.large
			   }),
            $.inptext('Nama Souvenir','namaSouvenir','namaSouvenir',true,{
                placeholder: 'Nama Souvenir',
                value: datas.souvenir
            }),
            $.inptext('Harga','harga','harga',true,{
				placeholder: 'Harga',
                value: datas.harga
            }),
            $.inptext('Point','point','point',true,{
				placeholder: 'Point',
                value: datas.point
            }),
            $.inptext('Stock','stock','stock',true,{
				placeholder: 'Stock',
                value: datas.stock
            }),
            $.inptextarea('Keterangan','keterangan','keterangan',true,{
                placeholder: 'Keterangan',
                value: datas.keterangan
            }),
            
        ]);
	}
};
</script>