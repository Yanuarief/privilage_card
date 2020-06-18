<template>
    <section>
        <div class="card mb-3">
            <div class="card-body">
                <h6 class="card-title">Search</h6>
                <div id="search-form-reedem">
                </div>
            </div>
        </div>
        <div id="table-reede-point"></div>

                <!-- Modal -->
        <div class="modal fade" id="reedemModal" tabindex="-1" role="dialog" aria-labelledby="reedemModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" id="modalBody"></div>
                    <div class="modal-footer" id="modalFooter">
                    </div>

                </div>
            </div>
        </div>


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
    var idMember = vue.$route.params.id
    const getData = await axios.get(rest["reedembyid"] + `?id=${idMember}`);
    var datas = getData.data.data;

    var search = [
        $.html(`<div class="row"><div class="col-md-12"><div class="row">`),
        $.html(`<div class="col-md-12">`),
        $.inptext('Nama Member / No Seri Barcode','memberReedem','memberReedem',true,{
            placeholder: 'Nama Member / No Seri Barcode',
            value: datas.member
        }),
        $.inptext('Point Anda','pointAnda','pointAnda',true,{
            placeholder: 'Point Anda',
            value: datas.points
        }),
        $.html(`</div>`),
        $.html(`<div class="col-md-6">`),
        $.inpnumber('Minimal Point','minPoint','minPoint',true,{
            placeholder: 'Minimal Point',
        }),
        $.html(`</div>`),
        $.html(`<div class="col-md-6">`),
        $.inpnumber('Maksimal Point','maxPoint','maxPoint',true,{
            placeholder: 'Maksimal Point',
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

    $('#search-form-reedem').createForm(act,search);

    const router = this.$router
    const urldel = ''
    const redit = ''

    $.table('table-reede-point',router,async function(param){
        var url = rest['reedemitem'] + param;
        var title = 'List Produk Reedem Point'
        var column = ['Nama Produk', 'Gambar', 'Point', 'Harga', 'Stok', 'Actions']
        var value = ['produk', 'gambar', 'point', 'harga', 'stok', '']

        var custom = [
            false,
            `<img class="image-normal" style="object-fit:contain;height:100px;width:100px;" src="{{'<~this.image.small~>'}}"/>`,
            false,
            false,
            false,
            `<button type="button" id="btnReedemPoint" data-id="{{'<~this.id~>'}}" data-toggle="modal" data-target="#reedemModal" class="btn btn-xs btn-primary">Reedem</button>`
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
    },urldel,redit,'search-form-reedem');

    $(`#search-form-reedem`).find('#memberReedem').prop('readonly', true);
    $(`#search-form-reedem`).find('#pointAnda').prop('readonly', true);


    $(`#table-reede-point`).on('click', `#btnReedemPoint`, async function() {
        var id = $(this).data('id')
        const edit = await axios.get(rest["souvenirbyid"] + `?id=${id}`);
        var datas = edit.data.data;
        var namaSouvenir = datas.souvenir
        var foto = datas.foto.medium
        var harga = datas.harga
        var keterangan = datas.keterangan
        var point = datas.point
        var stock = datas.stock
        
        
        if(namaSouvenir != null){
            $("#modalLabel").text(`Tukar dengan ` + namaSouvenir +` ?`);

            $("#modalBody").html(`
                <img class="image-normal center" style="object-fit:contain; display:block; margin-left:auto; margin-right:auto" src="${foto}"/>
                <hr style="border-top: 1px solid white">
                <div class="row mt-3 pl-5 pr-5">
                    <div class="col-6">Harga</div><div class="col-6">Rp. ${harga}</div>
                    <div class="col-6">Point</div><div class="col-6">${point}</div>
                    <div class="col-6">Stok</div><div class="col-6">${stock}</div>
                    <div class="col-6">Keterangan</div><div class="col-6">${keterangan}</div>
                    
                </div>
            `)
            $("#modalFooter").html(`
                <button type="button" id = "tukar" data-id="${id}" data-member="${idMember}" class="btn btn-primary">Reedem</button>
                <button type="button" id = "cancel" class="btn btn-danger" data-dismiss="modal">Cancel</button>`
            )

        }else{
            $("#modalLabel").text('Produk Kosong');
            $("#modalBody").html(`Produk Kosong`)
            
        }
        
    })

    $(`#search-form-reedem`).on('click', `#search-form-reedem-reset`, async function() {
        $(`#search-form-reedem`).find('#memberReedem').val(datas.member);
        $(`#search-form-reedem`).find('#pointAnda').val(datas.points);
    })

    $(`#reedemModal`).on('click', `#modalFooter #tukar`, async function() {
        var id = $(this).data('id')
        var idmember = $(this).data('member')
        const formInput = new FormData();
        formInput.append('id',id);
        formInput.append('idmember',idmember);
        
        const aind = {
              'Authorization': token
            }
        
        const edit = await axios.post(rest["editreedem"], formInput,{headers: aind});
        var datas = edit.data.data;

        $("#modalLabel").text(datas);

        $("#modalBody").html(`${datas}`)
        $("#modalFooter").html(`
            <button type="button" data-dismiss="modal" class="btn btn-primary">OK</button>`
        )

    })
    

}}
</script>