<template>
    <section>
        <div class="text-right pb-4">
            <router-link :to="{name:'promo_action_add',params:{ action: 'add'}}" class="btn btn-success btn-icon-text">
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
        <div id="table-event"></div>
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
        $.html(`<div class="col-md-6">`),
        $.inptext('Title','promo','promo',true,{
            placeholder: 'Title'
        }),
        $.html(`</div><div class="col-md-6">`),
        $.inpselect2(`Tenant`,`tenant_id`,`tenant_id`,true,{
             placeholder : `Choose Tenant`,
             api : rest["sel2tenant"],
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
    const urldel = rest['delpromo']
    const redit = 'promo_action_edit'
    $.table('table-event',router,async function(param){
        var url = rest['promo'] + param;
        var title = 'List promo'
        var column = ['Image', 'Title', 'Tenant']
        var value = ['image', 'promo','tenant.tenant']
        var custom = [
            `<img class="image-normal" style="object-fit:contain;height:100px;width:100px;" src="{{'<~this.image.small~>'}}"/>`,
            false,
            `<ul style="padding-left: 15px;">
                <li><b>Tenant :</b> {{'<~this.tenant.tenant~>'}}</li>
                <li><b>Floormaps :</b> {{'<~this.floormaps.full_name~>'}}</li>
                <li><b>Date Range :</b> {{'<~this.date_range~>'}}</li>
            </ul>`
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