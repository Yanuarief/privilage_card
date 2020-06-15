<template>
    <section>
        <div class="text-right pb-4">
            <router-link :to="{name:'facilities_action_add',params:{ action: 'add'}}" class="btn btn-success btn-icon-text">
              <i class="btn-icon-prepend" data-feather="plus-square"></i>
              Add New
            </router-link>
        </div>
        <div id="table-facilities"></div>
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
    const urldel = rest['delfacilities']
    const redit = 'facilities_action_edit'
    $.table('table-facilities',router,async function(param){
        var url = rest['facilities'] + param;
        var title = 'List facilities'
        var column = ['Image', 'Name']
        var value = ['image', 'facilities']
        var custom = [
            `<img class="image-normal" style="object-fit:contain;height:100px;width:100px;" src="{{'<~this.image.small~>'}}"/>`,
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
            search:false
        }
    },urldel,redit);
    
}}
</script>