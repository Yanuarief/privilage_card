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
        const edit = await axios.get(rest["tenantMemberbyid"] + `?id=${this.$route.params.id}`);
		var datas = edit.data.data;

        var vue = this
		var act = {
			api: rest["edittenantMember"],
			vue: vue,
			action: 'edit',
			back: 'tenantMember'
		}

		$('#form-tenantMember').createForm(act,
		[
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
            
        ]);
	}
};
</script>