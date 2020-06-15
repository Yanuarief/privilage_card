<template>
    <section>
        <div class="text-right pb-4">
            <router-link :to="{name:'hadiah_action_add',params:{ action: 'add'}}" class="btn btn-success btn-icon-text">
              <i class="btn-icon-prepend" data-feather="plus-square"></i>
              Add New
            </router-link>
        </div>
        <div class="card mb-3">
            <div class="card-body">
                <h6 class="card-title">Search</h6>
                <div id="search-form">
                </div>
            </div>
        </div>
        <div id="table-hadiah"></div>
        
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="modalBody">
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
        $.inptext('Paket','paket','paket',true,{
            placeholder: 'Nama Paket'
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
    const urldel = rest['delhadiah']
    const redit = 'hadiah_action_edit'
    $.table('table-hadiah',router,async function(param){
        var url = rest['hadiah'] + param;
        var title = 'List Member'
        var column = ['Nama Paket', 'Detail']
        var value = ['paket', 'detail']
        var custom = [
            false,
            `<button type="button" id="btn" data-id="{{'<~this.id~>'}}" data-toggle="modal" data-target="#exampleModal" class="btn btn-xs btn-primary">Detail</button>`
        ]

        const list = await axios.get(url)
        const datas = list.data;

        return {
            title:title,
            datas:datas,
            column:column,
            value:value,
            custom:custom,
            search:false,
            action:{
                delall:false,
            }
        }
    },urldel,redit,'search-form');

    $("#table-hadiah").on("click","#btn", async function(e){
        var id = $(this).data("id")
        const edit = await axios.get(rest["hadiahbyid"] + `?id=${id}`);
        var datas = edit.data.data;

        var len = edit.request.response.length
        
        if(len > 14){
            $("#modalLabel").text(datas.paket);
            var longs = datas.nama.length
            var body = ``
            for(var i=0; i < longs; i++){
                body += `   <div class="col-lg-8">${datas.nama[i]}</div>
                            <div class="col-lg-2">${datas.urutan[i]}</div>
                            <div class="col-lg-2">${datas.stock[i]}</div> `
            }
            $("#modalBody").html(`<div class="row">
                                <div class="col-lg-8"><b>Nama</b></div>
                                <div class="col-lg-2"><b>Urutan</b></div>
                                <div class="col-lg-2"><b>Jumlah</b></div> 
                                <br><br>
                                ${body}
                            </div>`)

        }else{
            $("#modalLabel").text("No Data");
        }
        
    });
    
}}
</script>