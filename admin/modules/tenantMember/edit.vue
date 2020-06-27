<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Edit Tenant</h6>
	        <div id="form-tenantMember"></div>
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
        $('#form-tenantMember').createForm({
            rest:{
            	api: rest["edittenantMember"],
            	databyid: rest["tenantMemberbyid"] + `?id=${vue.$route.params.id}`,
            },
			vue: vue,
			action: 'edit',
			back: 'tenantMember',
			form(datas){
        		var datas = datas.data.data;
				return [
					$.inptext('Nama Tenant','namaTenant','namaTenant',true,{
		                placeholder: 'Nama Tenant',
		                value: datas.tenant
		            }),
		            $.inptext('Nama Pemilik','namaPemilik','namaPemilik',true,{
						placeholder: 'Nama Pemilik',
		                value:datas.pemilik
		            }),
		            $.inpemail('Alamat E-mail','alamatEmail','alamatEmail',false,{
						placeholder: 'Alamat E-mail',
		                value:datas.email
		            }),
		            $.inpnumber('No. Telepon','noTelepon','noTelepon',true,{
						placeholder: 'No. Telepon',
		                value:datas.telp
		            }),
		        ]
			}
        })
	}
};
</script>