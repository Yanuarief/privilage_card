<template>
    <section>
        <div class="text-right pb-4">
            <router-link :to="{name:'pelanggan_action_add',params:{ action: 'add'}}" class="btn btn-success btn-icon-text">
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
        <div id="table-pelanggan"></div>
    </section>
</template>
<script>
module.exports = {
data() {
    return {
    }
},
methods: {
    body() {
    }
},
mounted: function(){

    var vue = this
    $('#search-form').createForm({
        vue: vue,
        action: `search`,
        back: false,
        reset: true,
        form(){
            return [
                $.html(`<div class="row"><div class="col-md-12"><div class="row">`),
                $.html(`<div class="col-md-12">`),
                $.inptext('Members','pelanggan','pelanggan',true,{
                    placeholder: 'Nama / No Pendaftaran / No Seri Barcode'
                }),
                $.html(`</div>`),
                $.html(`</div></div></div>`),
            ]
        }
    })

    const router = this.$router
    const urldel = rest['delpelanggan']
    const redit = 'pelanggan_action_edit'
    $.table('table-pelanggan',router,async function(param){
        var url = rest['pelanggan'] + param;
        var title = 'List Member'
        var column = ['No', 'Nama Lengkap', 'Nomor Pendaftaran', 'Jenis Kelamin', 'Nomor HP', 'Tanggal Lahir', 'Total Poin']
        var value = ['no', 'fullname', 'no_pelanggan', 'jk', 'hp', 'lahir', 'point']

        const list = await axios.get(url)
        const datas = list.data;

        return {
            title:title,
            datas:datas,
            column:column,
            value:value,
            search:false,
            action:{
                delall:false,
            }
        }
    },urldel,redit,'search-form');
    
}}
</script>