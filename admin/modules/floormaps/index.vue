<template>
    <section>
        <div class="text-right pb-4">
            <router-link :to="{name:'floormaps_action_add',params:{ action: 'add'}}" class="btn btn-success btn-icon-text">
              <i class="btn-icon-prepend" data-feather="plus-square"></i>
              Add New
            </router-link>
        </div>
        <div id="table-floormaps"></div>
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
    const urldel = rest['delfloormaps']
    const redit = 'floormaps_action_edit'
    $.table('table-floormaps',router,async function(param){
        var url = rest['floormaps'] + param;
        var title = 'List floormaps'
        var column = ['Image', 'Name', 'Code']
        var value = ['image', 'floormaps','code_maps']
        var custom = [
            `<img class="image-normal" style="object-fit:contain;height:100px;width:100px;" src="{{'<~this.image.small~>'}}"/>`,
            false,
            false
        ]

        var action = {
            editsingle:true,
            delsingle:true,
            delall:true
        }

        const list = await axios.get(url)
        const datas = list.data;

        return {
            title:title,
            datas:datas,
            column:column,
            value:value,
            custom:custom,
            action:action,
            search:false
        }
    },urldel,redit);
    
}}
</script>