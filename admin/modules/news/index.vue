<template>
    <section>
        <div class="text-right pb-4">
            <router-link :to="{name:'news_action_add',params:{ action: 'add'}}" class="btn btn-success btn-icon-text">
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
        <div id="table-news"></div>
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
        $.inptext('Tittle','tittle','tittle',true,{
            placeholder: 'Tittle'
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
    const urldel = rest['delnews']
    const redit = 'news_action_edit'
    $.table('table-news',router,async function(param){
        var url = rest['news'] + param;
        var title = 'List News'
        var column = ['Tittle', 'Image', 'Description', 'Status', 'Date']
        var value = ['Tittle', 'Image', `Deskripsi`, 'status', 'modified_date']
        var custom = [
            false,
            `<img class="image-normal" style="object-fit:contain;height:100px;width:100px;" src="{{'<~this.Image.small~>'}}"/>`,
            false,
            false,
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