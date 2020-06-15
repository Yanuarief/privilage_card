<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Add Promo</h6>
	        <div id="form-promo"></div>
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
			api: rest["addpromo"],
			vue: vue,
			action: 'add',
			back: 'promo'
		}

		$('#form-promo').createForm(act,
		[
			$.inpimage('Image', 'image', 'image',true, {
                path: 'promo',
                accept: ['jpg','png','jpeg'],
                height: 250,
                width: 250,
			}),
			$.html(`<div class="row"><div class="col-md-6">`),
			$.inpdate('Start Date','start_date','start_date',true),
			$.html(`</div><div class="col-md-6">`),
			$.inpdate('End Date','end_date','end_date',true),
			$.html(`</div></div>`),
			$.inptext('Title','promo','promo',true,{
				placeholder: 'Title'
			}),
			$.inpselect2(`Tenant`,`tenant`,`tenant`,true,{
				 placeholder : `Choose Tenant`,
				 api : rest["sel2tenant"],
			}),
		]);
	}
};
</script>