<template>
    <section>
        <div class="text-right pb-4">
        </div>
        <div class="card mb-3">
            <div class="card-body">
                <h6 class="card-title">Search</h6>
                <div id="search-form">
                </div>
            </div>
        </div>
        <div id="table-reedem"></div>

    </section>
</template>
<script>
module.exports = {
data() {
    return {}
},
methods: {},
mounted: async function(){
    
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
                $.inptext('Nama Member / No Seri Barcode','searchreedem','searchreedem',true,{
                    placeholder: 'Nama Member / No Seri Barcode'
                }),
                $.html(`</div>`),
                $.html(`</div></div></div>`),
            ]
        }
    });

    const router = this.$router
    const urldel = rest['delreedem']
    const redit = 'reedem_action_edit'

    $.table('table-reedem',router,async function(param){
        var url = rest['reedem'] + param;
        var title = 'List Pelanggan'
        var column = ['Nama Pelanggan', 'No Seri Barcode', 'Points', 'Actions']
        var value = ['member', 'barcode', 'points', '']

        var custom = [
            false,
            false,
            false,
            `<button type="button" id="btnReedem" data-id="{{'<~this.id~>'}}" data-toggle="modal" data-target="#exampleModal" class="btn btn-xs btn-primary">Detail</button>`
        ]

        const list = await axios.get(url)
        const datas = list.data;
        
        return {
            title:title,
            datas:datas,
            column:column,
            value:value,
            search:false,
            custom:custom,
            action:{
                delall:false,
                delsingle:false,
                editsingle:false
            }
        }
    },urldel,redit,'search-form');


    $(`#table-reedem`).on('click', `#btnReedem`, async function() {
        var idedit = $(this).data('id');
        router.push({name:redit,params:{ action: 'edit', id: idedit}});
    })

}}
</script>