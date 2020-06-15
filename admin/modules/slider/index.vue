<template>
    <section>
        <div class="text-right pb-4">
            <router-link :to="{name:'slider_action_add',params:{ action: 'add'}}" class="btn btn-success btn-icon-text">
              <i class="btn-icon-prepend" data-feather="plus-square"></i>
              Add New
            </router-link>
        </div>
        <div id="table-slider"></div>
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

    const router = this.$router
    const urldel = rest['delslider']
    const redit = 'slider_action_edit'
    $.table('table-slider',router,async function(param){
        var url = rest['slider'] + param;
        var title = 'List slider'
        var column = ['Title', 'Status']
        var value = ['image.small', 'publish']
        var custom = [
            `<img class="image-normal" style="object-fit:contain;height:100px;width:180px;" src="{{'<~this.image.small~>'}}"/>`,
            `{{(<~this.publish~>==1?'Publish':'Unpublish')}}`
        ]

        const list = await axios.get(url)
        const datas = list.data;

        return {
            title:title,
            datas:datas,
            column:column,
            value:value,
            custom:custom,
            search:false
        }
    },urldel,redit);
    
}}
</script>