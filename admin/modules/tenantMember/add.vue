<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Add Tenant</h6>
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
			api: rest["addtenantMember"],
			vue: vue,
			action: 'add',
			back: 'tenantMember'
        }


		$('#form-input').createForm(act,
		[
            $.inptext('Nama Tenant','namaTenant','namaTenant',true,{
				placeholder: 'Nama Tenant'
            }),
            $.inptext('Nama Pemilik','namaPemilik','namaPemilik',true,{
				placeholder: 'Nama Pemilik'
            }),
            $.inpemail('Alamat E-mail','alamatEmail','alamatEmail',false,{
				placeholder: 'Alamat E-mail'
            }),
            $.inpnumber('No. Telepon','noTelepon','noTelepon',true,{
				placeholder: 'No. Telepon'
            }),
            
		]);
	}
};
</script>