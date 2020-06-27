<template>
    <section>
        <div class="text-right pb-4">
            <router-link :to="{name:'eventMember_action_add',params:{ action: 'add'}}" class="btn btn-success btn-icon-text">
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
        <div id="table-eventMember"></div>
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

    var vue = this
    $('#search-form').createForm({
        vue: vue,
        action: `search`,
        back: false,
        reset: true,
        form(){
            return [
                $.html(`<div class="row"><div class="col-md-12"><div class="row">`),
                $.html(`<div class="col-md-12">`),
                $.inptext('Event','eventSearch','eventSearch',true,{
                    placeholder: 'Event'
                }),
                $.html(`</div>`),
                $.html(`</div></div></div>`),
            ]
        }
    })

    const router = this.$router
    const urldel = rest['deleventMember']
    const redit = 'eventMember_action_edit'
    $.table('table-eventMember',router,async function(param){
        var url = rest['eventMember'] + param;
        var title = 'List Events'
        var column = ['Nama Event', 'Tahun Event', 'Bulan Event', 'Tanggal Mulai Event', 'Tanggal Selesai Event', 'Status Event']
        var value = ['event', 'tahun', 'bulan', 'tgl_mulai', 'tgl_selesai', 'status']

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
            }
        }
    },urldel,redit,'search-form');
    
}}
</script>