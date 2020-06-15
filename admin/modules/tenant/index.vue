<template>
    <section>
        <div class="text-right pb-4">
            <router-link :to="{name:'tenantcat'}" class="btn btn-primary btn-icon-text">
              <i class="btn-icon-prepend" data-feather="list"></i>
              List Category
            </router-link>
            <router-link :to="{name:'tenant_action_add',params:{ action: 'add'}}" class="btn btn-success btn-icon-text">
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
        <div id="table-tenant"></div>
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
        $.html(`<div class="col-md-4">`),
        $.inptext('Title','tenant','tenant',true,{
            placeholder: 'Title'
        }),
        $.html(`</div><div class="col-md-4">`),
        $.inpselect2(`Category`,`category`,`category`,true,{
             placeholder : `Choose Category`,
             api : rest["sel2tenantcat"],
        }),
        $.html(`</div><div class="col-md-4">`),
        $.inpselect2(`Floormaps`,`location`,`location`,true,{
             placeholder : `Choose Floormaps`,
             api : rest["sel2floormaps"],
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
    const urldel = rest['deltenant']
    const redit = 'tenant_action_edit'
    $.table('table-tenant',router,async function(param){
        var url = rest['tenant'] + param;
        var title = 'List tenant'
        var column = ['Image','Title', 'Category', 'Floormaps']
        var value = ['image','tenant','category.name_category','floormaps.full_name']
        var custom = [
            `<img class="image-normal" style="object-fit:contain;height:100px;width:100px;" src="{{'<~this.image.small~>'}}"/>`,
            false,
            false,
            false
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
        }
    },urldel,redit,'search-form');
    
}}
</script>