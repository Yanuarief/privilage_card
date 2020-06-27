<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Add Kartu</h6>
	        <div id="form-input-kartu"></div>
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
		$('#form-input-kartu').createForm({
      rest:{
        api: rest["addkartu"],
      },
      vue: vue,
      action: 'add',
      back: 'bank',
      form(){
        return [
          $.html(`<div class="row" id="header"><div class="col-12"><div class="row"><div class="col-md-6">`),
          $.inpselect2('Nama Bank','namaBank','namaBank',true,{
                    placeholder: 'Nama Bank',
                    api:rest["listbank"]
                }),
                $.html(`</div>`),
                $.html(`<div class="col-md-6">`),
                $.html(`<div class="form-group" id="namaProduk">
                </div>`),
                $.html(`</div></div></div></div>`),

          $.html(`<div class="row" id="boxs"><div class="col-12" data-idbox="0"><div class="row"><div class="col-md-5">`),
          $.inptext('Nama Jenis Kartu','namaJenis[]','namaJenis',true,{
            placeholder: 'Nama Jenis Kartu'
          }),
                $.html(`</div>`),
                $.html(`<div class="col-md-5">`),
                $.inpnumber('Nomor BIN','noBin[]','noBin',true,{
            placeholder: 'Nomor BIN'
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
          $.html(`</div></div></div>`),
        ]
      }
    });

	  $("#form-input-kartu").on("click","#boxs .plus", function(e){
         e.preventDefault();
         var idx = $("#boxs > div.col-12").length
         var idn = $( "#boxs > div.col-12" ).eq( parseInt(idx) - 1 ).data("idbox");
         var idele = parseInt(idn) + 1
         var set_val = idele + 1
         var set_id = `
         <div class="col-12" data-idbox="${idele}">
            <div class="row">
                <div class="col-md-5">
                    <div class="form-group">
                        <input type="text" name="namaJenis[]" id="namaJenis" placeholder="Nama Jenis Kartu" class="form-control" />
                        <div id="namaJenis-error"></div>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="form-group">
                        <input type="number" name="noBin[]" id="noBin" placeholder="Nomor BIN" class="form-control" />
                        <div id="noBin-error"></div>
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

      $("#form-input-kartu").on("click","#boxs .min",function(e){
         e.preventDefault();
         var idx =  parseInt($(this).data('iddel'))
         $(`#boxs > div[data-idbox=${idx}]`).remove()
      })

      $("#form-input-kartu").on("change","#namaBank",  async function(e){
            e.preventDefault();
            $("#namaProduk").html(`
            <label>Nama Produk Kartu</label>
                <select class="form-control js-example-basic-single" id="namaProduk_select" name="namaProduk"}>
                    </select>
                    <div id="namaProduk_select-error"></div>
                <div id="namaProduk"></div>`
            )

            var getBank = $('#namaBank').find(':selected').val();
            var getBankText = $('#namaBank').find(':selected').text();
            var el = $("#form-input-kartu").find("#namaProduk_select");
            $(el).val("");

            $(el).select2({
                placeholder: {
                    id: '0',
                    text: `- Pilih Produk Kartu ${getBankText} -`
                },
                allowClear: false,
                enable: true,
                tags: false,
                dropdownParent: $("#namaProduk"),
                ajax: {
                    url: rest["listprod"]+`?id=${getBank}`,
                    method: "GET",
                    data: function(params) {
                        var keyword = params.term;
                        if (keyword === undefined) {
                            keyword = "";
                        }
                        var query = {
                            column: "text",
                            value: keyword,
                            page: params.page || 1
                        }
                        return query;
                    },
                    processResults: function(data) {
                        return {
                            results: $.map(data.data, function(obj) {
                                var placeId = obj.id;
                                var placeName = obj.text;
                                return {
                                    id: placeId,
                                    text: placeName
                                }
                            }),
                            pagination: {
                                more: (data.next_page==data.current_page?false:true)
                            }
                        }
                    }
                }
            });
            

      })
      
	}
};
</script>