<template>
    <section>
        <div class="text-right pb-4">
            <router-link :to="{name:'souvenir_action_add',params:{ action: 'add'}}" class="btn btn-success btn-icon-text">
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
        <div id="table-souvenir"></div>
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
    var search = [
        $.html(`<div class="row"><div class="col-md-12"><div class="row">`),
        $.html(`<div class="col-md-12">`),
        $.inptext('Souvenir','souvenir','souvenir',true,{
            placeholder: 'Souvenir'
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
    const urldel = rest['delsouvenir']
    const redit = 'souvenir_action_edit'
    $.table('table-souvenir',router,async function(param){
        var url = rest['souvenir'] + param;
        var title = 'List Souvenir'
        var column = ['Nama Souvenir', 'Harga', 'Point', 'Stock', 'Foto', 'Keterangan']
        var value = ['souvenir', 'harga', 'point', 'stock', 'foto', 'keterangan']
        var custom = [
            false,
            false,
            false,
            false,
            `<img class="image-normal" style="object-fit:contain;height:100px;width:100px;" src="{{'<~this.foto.small~>'}}"/>`,
            false,

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
    
}}
</script>