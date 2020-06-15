<template>
    <section>
        <div class="text-right pb-4">
            <router-link :to="{name:'bank_action_add',params:{ action: 'add'}}" class="btn btn-success btn-icon-text">
              <i class="btn-icon-prepend" data-feather="plus-square"></i>
              Add New Produk
            </router-link>
            <router-link :to="{name:'bank_action_add_kartu',params:{ action: 'add'}}" class="btn btn-success btn-icon-text">
              <i class="btn-icon-prepend" data-feather="plus-square"></i>
              Add New Kartu
            </router-link>
        </div>
        <div class="card mb-3">
            <div class="card-body">
                <h6 class="card-title">Search</h6>
                <div id="search-form">
                </div>
            </div>
        </div>
        <div id="table-bank"></div>

        <!-- Modal -->
        <div class="modal fade" id="bankModal" tabindex="-1" role="dialog" aria-labelledby="bankModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="modalBody"></div>
            <div class="modal-footer" id="modalFooter">
            </div>

            </div>
        </div>
        </div>

    </section>
</template>
<script>
module.exports = {
data() {
    return {
    }
},
methods: {
    
},
mounted: function(){
    var search = [
        $.html(`<div class="row"><div class="col-md-12"><div class="row">`),
        $.html(`<div class="col-md-12">`),
        $.inptext('Bank','bank','bank',true,{
            placeholder: 'Nama Bank'
        }),
        $.html(`</div>`),
        $.html(`</div></div></div>`),
    ]

    var act = {
        vue: this,
        action: `search`,
        back: false,
        reset: true
    }

    $('#search-form').createForm(act,search);

    const router = this.$router
    const urldel = rest['delbank']
    const redit = 'bank_action_edit'
    const editkartu = 'bank_action_edit_kartu'
    $.table('table-bank',router,async function(param){
        var url = rest['bank'] + param;
        var title = 'List Bank'
        var column = ['Nama bank', 'Produk Kartu', 'Detail']
        var value = ['nama_bank', 'produk', '']

        const list = await axios.get(url)
        const datas = list.data;

        var longs = datas.data
        
        var custom = [
            false,
            `<ul style="padding-left:15px;" data-id="{{<~this.id~>}}" id="bank-{{<~this.id~>}}" class="bank-data" data-value="{{'<~this.produk~>'!=''?'<~this.produk~>':'emptyy'}}"></ul>`,
            `<button type="button" id="btn" data-id="{{'<~this.id~>'}}" data-toggle="modal" data-target="#bankModal" class="btn btn-xs btn-primary">Detail</button>`
        ]

        $( "#table-bank" ).find('#table-bank-content > tr').ready( function(){

            $("#table-bank").find('#table-bank-content > tr > td > .bank-data').each(function( index ) {
                var idx = $(this).attr('id');
                var val = $(this).data('value')
                var lenval = val.split(",").length
                    val = val.split(",")
                    var ul = ``;
                    val.map(function(val, index){
                        ul += `<li>${val}</li>`
                    })
                    ul = val != 'emptyy' ? `${ul}`:`<li>Produk Kosong</li>` 
                    $(`#${idx}`).append(ul)
            });
        })
        
        return {
            title:title,
            datas:datas,
            column:column,
            custom:custom,
            value:value,
            search:false,
            action:{
                delall:false,
                delsingle:true,
                editsingle:false
            }
        }
    },urldel,redit,'search-form');

    $("#table-bank").on("click","#btn", async function(e){
        var id = $(this).data("id")
        const edit = await axios.get(rest["byidfull"] + `?id=${id}`);
        var datas = edit.data.data;
        
        if(datas[0].nama_produk != null){
            $("#modalLabel").text(datas[0].nama_bank);
            var longs = datas.length
            var body = ``
            for(var i=0; i < longs; i++){
                body += `
                            <tbody>
                                <tr>
                                    <td>${datas[i].nama_produk}</td>
                                    <td>${datas[i].nama_jenis}</td>
                                    <td>${datas[i].bin}</td>
                                </tr>
                            </tbody>
            `}

            $("#modalBody").html(`<table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Nama Produk</th>
                                                <th>Nama Jenis Kartu</th>
                                                <th>No BIN</th>
                                            </tr>
                                        </thead>
                                    ${body}
                                </table>
                                
            `)
            $("#modalFooter").html(`
                <button type="button" id = "btnProdKartu" data-id="${datas[0].id_bank}" class="btn btn-primary" data-dismiss="modal">Edit Produk Kartu</button>
                <button type="button" id = "btnJenKartu" data-id="${datas[0].id_bank}" class="btn btn-danger" data-dismiss="modal">Edit Jenis Kartu</button>`
            )

        }else{
            $("#modalLabel").text(datas[0].nama_bank);
            $("#modalBody").html(`Produk Kosong`)
            var btnEditJenis = ``

            if(datas[0].id_produk == null){
                btnEditJenis = btnEditJenis
            }else{
                btnEditJenis = `<button type="button" id = "btnJenKartu" data-id="${datas[0].id_bank}" class="btn btn-danger" data-dismiss="modal">Edit Jenis Kartu</button>`
            }

            $("#modalFooter").html(`
                <button type="button" id = "btnProdKartu" data-id="${datas[0].id_bank}" class="btn btn-primary" data-dismiss="modal">Edit Produk Kartu</button>
                ${btnEditJenis}`
            )
        }
        

    });

    $(`#modalFooter`).on('click', `#btnProdKartu`, async function() {
        var idedit = $(this).data('id');
        router.push({name:redit,params:{ action: 'edit', id: idedit}});
    })
    
    $(`#modalFooter`).on('click', `#btnJenKartu`, async function() {
        var idedit = $(this).data('id');
        router.push({name:editkartu,params:{ action: 'edit', id: idedit}});
    })
}}
</script>