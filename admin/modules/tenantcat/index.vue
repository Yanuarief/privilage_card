<template>
    <section>
        <div class="text-right pb-4">
            <router-link :to="{name:'tenantcat_action_add',params:{ action: 'add'}}" class="btn btn-success btn-icon-text">
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
        <div id="table-tenantcat"></div>
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
        $.inptext('Title','tenantcat','tenantcat',true,{
            placeholder: 'Title'
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
    const urldel = rest['deltenantcat']
    const redit = 'tenantcat_action_edit'
    $.table('table-tenantcat',router,async function(param){
        var url = rest['tenantcat'] + param;
        var title = 'List Tenant Category'
        var column = ['Category Name']
        var value = ['category']

        const list = await axios.get(url)
        const datas = list.data;

        return {
            title:title,
            datas:datas,
            column:column,
            value:value,
            search:false
        }
    },urldel,redit,'search-form');
    
}}
</script>