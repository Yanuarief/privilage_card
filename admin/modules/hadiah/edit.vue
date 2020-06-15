<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Edit Paket</h6>
	        <div id="form-hadiah"></div>
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
         const edit = await axios.get(rest["hadiahbyid"] + `?id=${this.$route.params.id}`);
         var datas = edit.data.data;
         
         var vue = this
         var act = {
            api: rest["edithadiah"],
            vue: vue,
            action: 'edit',
            back: 'hadiah'
         }
        
        var longs = datas.nama.length;
        var temp = ``
        for(var i=1; i < longs; i++){
            temp += `<div class="col-12" data-idbox="${i}">
                <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <input type="text" name="namaHadiah[]" id="namaHadiah" value="${datas.nama[i]}" placeholder="Nama Hadiah" class="form-control" />
                        <div id="namaHadiah-error"></div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <input type="number" name="urutan[]" id="urutan" placeholder="Urutan" value="${datas.urutan[i]}" class="form-control" />
                        <div id="urutan-error"></div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <input type="number" name="jumlah[]" id="jumlah" placeholder="Jumlah" value="${datas.stock[i]}" class="form-control" />
                        <div id="jumlah-error"></div>
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

		$('#form-hadiah').createForm(act,
		[     $.inptext('Nama Paket','namaPaket','namaPaket',true,{
                placeholder: 'Nama Paket',
                value: datas.paket
            }),
            $.html(`<div class="row" id="boxs"><div class="col-12" data-idbox="0"><div class="row">`),
            $.html(`<div class="col-md-4">`),
            $.inptext('Nama Hadiah','namaHadiah[]','namaHadiah',true,{
                placeholder: 'Nama Hadiah',
                value: datas.nama[0]
            }),
            $.html(`</div>`),
            $.html(`<div class="col-md-3">`),
            $.inpnumber('Urutan','urutan[]','urutan',true,{
            placeholder: 'Urutan',
            value: datas.urutan[0]
            }),
            $.html(`</div>`),
            $.html(`<div class="col-md-3">`),
            $.inpnumber('Jumlah','jumlah[]','jumlah',true,{
            placeholder: 'Jumlah',
            value: datas.stock[0]
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
            
      ]);


      $("#form-hadiah").on("click","#boxs .plus", function(e){
         e.preventDefault();
         var idx = $("#boxs > div.col-12").length
         var idn = $( "#boxs > div.col-12" ).eq( parseInt(idx) - 1 ).data("idbox");
         var idele = parseInt(idn) + 1
         var set_val = idele + 1
         var set_id = `
         <div class="col-12" data-idbox="${idele}">
            <div class="row">
               <div class="col-md-4">
                  <div class="form-group">
                     <input type="text" name="namaHadiah[]" id="namaHadiah" placeholder="Nama Hadiah" class="form-control" />
                     <div id="namaHadiah-error"></div>
                  </div>
            </div>
            <div class="col-md-3">
                  <div class="form-group">
                     <input type="number" name="urutan[]" id="urutan" placeholder="Urutan" value="${set_val}" class="form-control" />
                     <div id="urutan-error"></div>
                  </div>
            </div>
            <div class="col-md-3">
                  <div class="form-group">
                     <input type="number" name="jumlah[]" id="jumlah" placeholder="Jumlah" value="1" class="form-control" />
                     <div id="jumlah-error"></div>
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

      $("#form-hadiah").on("click","#boxs .min",function(e){
         e.preventDefault();
         var idx =  parseInt($(this).data('iddel'))
         $(`#boxs > div[data-idbox=${idx}]`).remove()
      })
	}
};
</script>