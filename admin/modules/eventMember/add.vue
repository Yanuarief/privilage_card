<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Add Events</h6>
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
			api: rest["addeventMember"],
			vue: vue,
			action: 'add',
			back: 'eventMember'
        }


		$('#form-input').createForm(act,
		[
            $.inptext('Nama Event','namaEvent','namaEvent',true,{
				placeholder: 'Nama Event'
            }),
            $.inpnumber('Tahun Event','tahunEvent','tahunEvent',true,{
				placeholder: 'Tahun Event'
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
                 ]
			}),
			$.inpdate('Tanggal Mulai','tanggalMulai','tanggalMulai',true,{
			}),
			$.inpdate('Tanggal Selesai','tanggalSelesai','tanggalSelesai',true,{
			}),
			$.html(`<div class="form-group">
                        <label>Status Event</label>`),
            $.inpradiobox('Active','statusEvent','y',{
            }),
            $.inpradiobox('Not Active','statusEvent','n',{
            }),
            $.html(`</div>`),
            
		]);
	}
};
</script>