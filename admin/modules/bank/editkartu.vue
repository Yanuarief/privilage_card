<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Edit Kartu</h6>
	        <div id="form-input-edit-kartu"></div>
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
        var id = vue.$route.params.id
		$('#form-input-edit-kartu').createForm({
            vue: vue,
            action: 'edit',
            rest: {
                api: rest["editkartu"],
                databyid: `${rest["byidfull"]}?id=${vue.$route.params.id}`
            },
            back: 'bank',
            form(datas){
                var datas = datas.data.data;
                return [
                    $.html(`<div class="row" id="header"><div class="col-12"><div class="row"><div class="col-md-6">`),
                    $.inptext('Nama Bank','namaBank','namaBank',false,{
                        placeholder: 'Nama Bank',
                        value:datas[0].nama_bank,
                    }),
                    $.html(`</div>`),
                    $.html(`<div class="col-md-6">`),
                    $.inpselect2('Nama Produk','namaProduk','namaProduk',true,{
                        placeholder: 'Nama Produk',
                        api:rest["listprod"]+`?id=${id}`
                    }),
                    $.html(`</div></div></div></div>`),

                    $.html(`<div class="row" id="boxs"><div class="col-12" data-idbox="0"><div class="row"><div class="col-md-5">`),
                    $.inptext('Nama Jenis Kartu','namaJenis[]','namaJenis',true,{
                        placeholder: 'Nama Jenis Kartu',
                        value: ''
                    }),
                    $.html(`</div>`),
                    $.html(`<div class="col-md-5">`),
                    $.inpnumber('Nomor BIN','noBin[]','noBin',true,{
                        placeholder: 'Nomor BIN',
                        value:''
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

        $("#form-input-edit-kartu").on("click","#boxs .plus", function(e){
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

      $("#form-input-edit-kartu").on("click","#boxs .min",function(e){
         e.preventDefault();
         var idx =  parseInt($(this).data('iddel'))
         $(`#boxs > div[data-idbox=${idx}]`).remove()
      })

      $("#form-input-edit-kartu").find("#namaBank").prop("readonly", true);

      $("#form-input-edit-kartu").on("change","#namaProduk",  async function(e){
            e.preventDefault();
            $("#form-input-edit-kartu").find("#boxs > div").remove()
            $(`#boxs`).append(`
                <div class="col-12" data-idbox="0">
                    <div class="row">
                        <div class="col-md-5">
                            <div class="form-group">
                                <label>Nama Jenis Kartu</label>
                                <input type="text" name="namaJenis[]" id="namaJenis" value="" placeholder="Nama Jenis Kartu" class="form-control">
                                <div id="namaJenis-error"></div>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="form-group">
                                <label>Nomor BIN</label>
                                <input type="number" name="noBin[]" id="noBin" value="" placeholder="Nomor BIN" class="form-control">
                                <div id="noBin-error"></div>
                            </div>
                        </div> 
                        <div class="form-group">
                            <label>Action</label>
                            <div class="row">
                                <div class="col-12"><a href="#" class="btn btn-success mr-2 plus">+</a></div>
                            </div>
                        </div>
                    </div>
                </div>
             `);
            var getProdText = $('#namaProduk').find(':selected').text();

            const edit = await axios.get(rest["byidfull"] + `?id=${id}&produk=${getProdText}`);
            var datas = edit.data.data;
            var setJenis = datas[0].nama_jenis == '-' ? '' : datas[0].nama_jenis
            var setBin = datas[0].bin == '-' ? '' : datas[0].bin
            $("#form-input-edit-kartu").find("#boxs > div[data-idbox=0] #namaJenis").val(`${setJenis}`);
            $("#form-input-edit-kartu").find("#boxs > div[data-idbox=0] #noBin").val(`${setBin}`);
            
            var longs = datas.length;
            var temp = ``
            
            for(var i=1; i < longs; i++){
                temp += `<div class="col-12" data-idbox="${i}">
                    <div class="row">
                        <div class="col-md-5">
                            <div class="form-group">
                                <input type="text" name="namaJenis[]" id="namaJenis" value="${datas[i].nama_jenis}" placeholder="Nama Jenis Kartu" class="form-control" />
                                <div id="namaJenis-error"></div>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="form-group">
                                <input type="number" name="noBin[]" id="noBin" value="${datas[i].bin}" placeholder="Nomor BIN" class="form-control" />
                                <div id="noBin-error"></div>
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
            $(`#boxs`).append(temp);
      })
      
	}
};
</script>