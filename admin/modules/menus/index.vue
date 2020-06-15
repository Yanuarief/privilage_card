<template>
    <section>
        <!-- <div class="text-right pb-4">
            <router-link :to="{name:'menus_action_add',params:{ action: 'add'}}" class="btn btn-success btn-icon-text">
              <i class="btn-icon-prepend" data-feather="plus-square"></i>
              Add New
            </router-link>
        </div> -->
        <div id="table-menus"></div>
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
    const urldel = rest['delmenus']
    const redit = 'menus_action_edit'
    $.table('table-menus',router,async function(param){
        var url = rest['menus'] + param;
        var title = 'List menus'
        var column = ['Name','Image']
        var value = ['title','image.small']
        var custom = [
            false,
            `<img class="image-normal" style="object-fit:contain;height:100px;width:280px;" src="{{'<~this.image.small~>'}}"/>`,
        ]
        var action = {
            editsingle:true,
            delsingle:false,
            delall:false
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