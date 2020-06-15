<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Setting Point</h6>
	        <div id="form-input-setting-point"></div>
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
	async mounted (){
		var vue = this
		var act = {
			api: rest["post_point_setting"],
			vue: vue,
			action: 'Simpan',
			back: false
        }

        const getPointSet = await axios.get(rest["get_point_setting"]);
        var datas = getPointSet.data.data;

		$('#form-input-setting-point').createForm(act,
		[   
            $.html(`<div class="row">`),
            $.html(`<div class="col-md-12 text-center mt-2"><label>Setting Poin Pembayaran ETC</label><br></div>`),
            $.html(`</div>`),
            $.inpcurrency('Kelipatan Nominal','kelipantanNominalEtc','kelipantanNominalEtc',true,{
                placeholder: 'Kelipatan Nominal',
                value: datas.bank.kelipatan_nominal
            }),
            
            $.inpnumber('Jumlah Point','jmlPointEtc','jmlPointEtc',true,{
				placeholder: 'Jumlah Point',
                value: datas.bank.jumlah_point
            }),
            

            $.html(`<div class="row">`),
            $.html(`<div class="col-md-12 text-center mt-2"><label>Setting Poin Pembayaran CASH</label><br></div>`),
            $.html(`</div>`),
            $.inpcurrency('Kelipatan Nominal','kelipantanNominalCash','kelipantanNominalCash',true,{
				placeholder: 'Kelipatan Nominal',
                value: datas.cash.kelipatan_nominal
            }),
            
            $.inpnumber('Jumlah Point','jmlPointCash','jmlPointCash',true,{
				placeholder: 'Jumlah Point',
                value: datas.cash.jumlah_point
            }),
            
        ]);
      
      
	}
};
</script>