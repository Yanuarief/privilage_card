<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Edit Bank</h6>
	        <div id="form-bank"></div>
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
		$('#form-bank').createForm({
			vue: vue,
			action: 'edit',
			rest:{
				api: rest["editbank"],
				databyid: `${rest["bankbyid"]}?id=${this.$route.params.id}`
			},
			back: 'bank',
			form(datas){
				var datas = datas.data.data;
				var longs = datas.produk.length;
				var temp = ``
				for(var i=1; i < longs; i++){
					temp += `<div class="col-12" data-idbox="${i}">
						<div class="row">
						<div class="col-md-10">
							<div class="form-group">
								<input type="text" name="namaProduk[]" id="namaProduk" value="${datas.produk[i]}" placeholder="Nama Produk Kartu" class="form-control" />
								<div id="namaProduk-error"></div>
							</div>
						</div>
						<div class="form-group">
							<div class="row">
								<div class="col-12"><a href="#" class="btn btn-success mr-2 plus">+</a><a href="#" class="btn btn-danger mr-2 min" data-iddel="${i}">-</a></div>
							</div>
						</div>
						</div>
					</div>`

				}
				return [     
					$.inptext('Nama Bank','namaBank','namaBank',true,{
						placeholder: 'Nama Bank',
						value: datas.bank 
					}),
					$.html(`<div class="row" id="boxs"><div class="col-12" data-idbox="0"><div class="row"><div class="col-md-10">`),
					$.inptext('Nama Produk Kartu','namaProduk[]','namaProduk',true,{
						placeholder: 'Nama Produk Kartu',
						value: datas.produk[0] == null ? '' : datas.produk[0] 
					}),
					$.html(`</div>`),
					$.html(`
		               <div class="form-group">
		                  <label>Action</label>
		                  <div class="row">
		                     <div class="col-12"><a href="#" class="btn btn-success mr-2 plus">+</a></div>
		                  </div>
		               </div>

					`),
					$.html(`</div></div>${temp}</div>`),
			  	]
			}
		});

		$("#form-bank").on("click","#boxs .plus", function(e){
			e.preventDefault();
			var idx = $("#boxs > div.col-12").length
			var idn = $( "#boxs > div.col-12" ).eq( parseInt(idx) - 1 ).data("idbox");
			var idele = parseInt(idn) + 1
			var set_val = idele + 1
			var set_id = `
			<div class="col-12" data-idbox="${idele}">
				<div class="row">
				<div class="col-md-10">
					<div class="form-group">
						<input type="text" name="namaProduk[]" id="namaProduk" placeholder="Nama Produk Kartu" class="form-control" />
						<div id="namaProduk-error"></div>
					</div>
				</div>
				<div class="form-group">
					<div class="row">
						<div class="col-12"><a href="#" class="btn btn-success mr-2 plus">+</a><a href="#" class="btn btn-danger mr-2 min" data-iddel="${idele}">-</a></div>
					</div>
				</div>
				</div>
			</div>`

			$(`#boxs`).append(set_id);
		})

		$("#form-bank").on("click","#boxs .min",function(e){
			e.preventDefault();
			var idx =  parseInt($(this).data('iddel'))
			$(`#boxs > div[data-idbox=${idx}]`).remove()
		})

	}
};
</script>