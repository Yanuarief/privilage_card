<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Edit Promo</h6>
	        <div id="form-promo"></div>
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

        const edit = await axios.get(rest["promobyid"] + `?id=${this.$route.params.id}`);
		var datas = edit.data.data;

		var tenant_value = [{
        	id: datas.tenant.id,
        	text: datas.tenant.tenant
        }]

        var vue = this
		var act = {
			api: rest["editpromo"],
			vue: vue,
			action: 'edit',
			back: 'promo'
		}

		$('#form-promo').createForm(act,
		[
			$.inpimage('Image', 'image', 'image',true, {
                path: 'promo',
                accept: ['jpg','png','jpeg'],
                height: 250,
                width: 250,
                value: datas.image.large,
			}),
			$.html(`<div class="row"><div class="col-md-6">`),
			$.inpdate('Start Date','start_date','start_date',true,{
				value: datas.start_date
			}),
			$.html(`</div><div class="col-md-6">`),
			$.inpdate('End Date','end_date','end_date',true,{
				value: datas.end_date
			}),
			$.html(`</div></div>`),
			$.inptext('Title','promo','promo',true,{
				placeholder: 'Title',
                value: datas.promo,
			}),
			$.inpselect2(`Tenant`,`tenant`,`tenant`,true,{
				 placeholder : `Choose Tenant`,
				 api : rest["sel2tenant"],
				 selected: tenant_value
			}),
		]);
	}
};
</script>