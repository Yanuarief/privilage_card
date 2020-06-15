<template>
    <section>
        <div class="text-right pb-4">
            <router-link :to="{name:'earnpoint_action_add',params:{ action: 'add'}}" class="btn btn-success btn-icon-text">
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
        <div id="table-earnpoint"></div>

    </section>
</template>
<script>
module.exports = {
data() {
    return {}
},
methods: {},
mounted: async function(){
    var search = [
        $.html(`<div class="row"><div class="col-md-12"><div class="row">`),
        $.html(`<div class="col-md-12">`),
        $.inptext('Nama Member / Tenant','searchearn','searchearn',true,{
            placeholder: 'Nama Member / Tenant'
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
    const urldel = rest['delearnpoint']
    const redit = 'earnpoint_action_edit'
    $.table('table-earnpoint',router,async function(param){
        var url = rest['earnpoint'] + param;
        var title = 'List Earn Points'
        var column = ['Tanggal', 'Nama Tenant', 'Nama Member', 'No. KTP','No. Handphone', 'Nominal Belanja', 'Metode Pembayaran']
        var value = ['tanggal', 'tenant', 'member', 'ktp', 'hp', 'nominal', 'metode']

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
                delsingle:true,
                editsingle:false
            }
        }
    },urldel,redit,'search-form');

}}
</script>