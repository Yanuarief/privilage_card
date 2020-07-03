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

		function html_card(opt = {}){
			
			var number = opt.number,
				id_prod = opt.id_prod?opt.id_prod:0,
				namaProduk = opt.namaProduk?opt.namaProduk:``,
				hid_prod = 0

			if(opt.label){
				var label = opt.label.status==false?``:`<label>${opt.label.name}</label>`
			}

			if(opt.id_prod){
				hid_prod = id_prod>0?id_prod:0
			}

			if(number>0){
				return `
				<div class="col-12" data-idbox="${number}">
					<div class="row">
						<div class="col-md-10">
							<div class="form-group">
								<input type="hidden" name="id_prod[]" value="${hid_prod}">
								<input type="text" name="namaProduk[]" id="namaProduk" value="${namaProduk}" placeholder="Nama Produk Kartu" class="form-control" />
								<div id="namaProduk-error"></div>
							</div>
						</div>
						<div class="form-group">
							<div class="row">
								<div class="col-12">
									<a href="#" class="btn btn-success mr-2 plus">+</a>
									<a href="#" class="btn btn-danger mr-2 min" data-iddel="${number}">-</a>
								</div>
							</div>
						</div>
					</div>
				</div>`;
			}else{
				return `
				<div class="form-group">
					${label}
					<input type="hidden" name="id_prod[]" value="${hid_prod}">
					<input type="text" name="namaProduk[]" id="namaProduk" value="${namaProduk}" placeholder="Nama Produk Kartu" class="form-control" />
					<div id="namaProduk-error"></div>
				</div>`;
			}
		};
		
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
				var first_id = datas.produk[0].id == null ? '' : datas.produk[0].id
				var first_name = datas.produk[0].name == null ? '' : datas.produk[0].name
				var longs = Object.keys(datas.produk).length;
				console.log(longs);
				var temp = ``
				for(var i=1; i < longs; i++){
					var number = i+1;
					temp += html_card({
						number: number,
						id_prod: datas.produk[i].id,
						namaProduk: datas.produk[i].name,
					});
				}

				return [     
					$.inptext('Nama Bank','namaBank','namaBank',true,{
						placeholder: 'Nama Bank',
						value: datas.bank 
					}),
					$.html(`<div class="row" id="boxs"><div class="col-12" data-idbox="0"><div class="row"><div class="col-md-10">`),
					$.html(`${html_card({
						number: 0,
						id_prod: first_id,
						namaProduk: first_name,
						label: {
							status: true,
							name: `Nama Produk Kartu`
						}	
					})}`),
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
			var set_id = html_card({
				number: idele	
			})

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