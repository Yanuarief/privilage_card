<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Edit Event</h6>
	        <div id="form-eventMember"></div>
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
        var vue = this
        $('#form-eventMember').createForm({
			vue: vue,
			action: 'edit',
			rest: {
				api: rest["editeventMember"],
				databyid: rest["eventMemberbyid"] + `?id=${vue.$route.params.id}`
			},
			back: 'eventMember',
            form(datas){
        		var datas = datas.data.data;
            	return [
					$.inptext('Nama Event','namaEvent','namaEvent',true,{
						placeholder: 'Nama Event',
						value: datas.event
		            }),
		            $.inpnumber('Tahun Event','tahunEvent','tahunEvent',true,{
						placeholder: 'Tahun Event',
						value: datas.tahun
		            }),
		            $.inpselect(`Bulan Event`,`bulanEvent`,`bulanEvent`,true,{
						 placeholder : `Bulan Event`,
		                 option: [
		                     {value : '1', name: 'Januari'},
		                     {value : '2', name: 'Februari'},
		                     {value : '3', name: 'Maret'},
		                     {value : '4', name: 'April'},
							 {value : '5', name: 'Mei'},
							 {value : '6', name: 'Juni'},
		                     {value : '7', name: 'Juli'},
		                     {value : '8', name: 'Agustus'},
		                     {value : '9', name: 'September'},
		                     {value : '10', name: 'Oktober'},
		                     {value : '11', name: 'Novermber'},
		                     {value : '12', name: 'Desember'},
						 ],
						 value: datas.bulan
					}),
					$.inpdate('Tanggal Mulai','tanggalMulai','tanggalMulai',true,{
						value: datas.mulai
					}),
					$.inpdate('Tanggal Selesai','tanggalSelesai','tanggalSelesai',true,{
						value: datas.selesai
					}),
		            $.inpradiobox('Status Event','statusEvent','statusEvent',true,{
		            	option: [
			            	{
			            		name: 'Active',
			            		value: 'y'
			            	},
			            	{
			            		name: 'Not Active',
			            		value: 'n'
			            	}
		            	],
		            	value: datas.status
		            }),  
				]
            }
        })
	}
};
</script>