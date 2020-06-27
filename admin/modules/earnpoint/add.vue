<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Management Earn Points</h6>
	        <div id="form-input-earnpoint"></div>
	      </div>
	    </div>
	  </div>
	</div>
</template>

<script>

module.exports = {
	data() {
		return {
		}
	},
	computed:{
	},
	methods: {
        async datas_kelipatan(){

            const cash = await axios.get(rest["getsetpoint"] + `?search=cash`);
            var datas_cash = cash.data.data[0];
            
            const bank = await axios.get(rest["getsetpoint"] + `?search=bank`);
            var datas_bank = bank.data.data[0];

            var tabx = $('#form-input-earnpoint').find('#table_earn')
            tabx.attr('data-cash',`${datas_cash.kelipatan},${datas_cash.point}`)
            tabx.attr('data-bank',`${datas_bank.kelipatan},${datas_bank.point}`)
            
        },
        total_belanja(){
            var values = $($("#table_earn").find("input[name='nominal[]']")).map(function(){
                        var thisVal = $(this).val()
                        var nominal = ((thisVal.replace("Rp ", "")).replace(",00", "")).replace(/\./g, ""); 
                        var newval = isNaN(parseInt(nominal))?0:parseInt(nominal);
                        return newval;
                        }).get();
                    
                    // SUM
                    var sum = values.reduce((a, b) => a + b, 0)
                    $("#total_belanja-currency").val(sum)
            return sum
        },
        jumlah2an(){
            this.total_belanja();
            var main_ele = $('#form-input-earnpoint')
            var tabx = main_ele.find('#table_earn')
            var cash_point = tabx.data('cash')
            var nominal_cash = parseInt(cash_point.split(",")[0])
            var point_cash = parseInt(cash_point.split(",")[1])

            var bank_point = tabx.data('bank')
            var nominal_bank = parseInt(bank_point.split(",")[0])
            var point_bank = parseInt(bank_point.split(",")[1])

            var point_cash = 0;
            var point_bank = 0;
            var sum_point = 0;

            $(`#table_earn tbody > tr`).each( async function(){
                var posisi = $(this).attr('id').replace('body_','');
                
                var value_self = tabx.find(`#nominal_${posisi} > input[inputmode=numeric]`).val();
                var nominal_self = value_self==``?0:parseInt(((value_self.replace("Rp ", "")).replace(",00", "")).replace(/\./g, "")); 

                if (main_ele.find(`#bayar_${posisi} [value=cash]`).prop("checked")) {
                    point_cash += Math.floor((nominal_self/nominal_cash));
                    $(`#idKartu_${posisi}`).html(`<input type="hidden" name="idprodukkartu[]" value="0">`)
                    $(`#noKartu_${posisi}`).find(`input[type="number"]`).val(0)
                    $(`#namaBank_${posisi}`).hide()
                    $(`#noKartu_${posisi}`).hide()
                    $(`#valid_${posisi}`).hide()
                }else{
                    point_bank += Math.floor((nominal_self/nominal_bank));
                    $(`#namaBank_${posisi}`).show()
                    $(`#noKartu_${posisi}`).show()
                    $(`#valid_${posisi}`).show()
                    $(`#idKartu_${posisi}`).html(`<input type="hidden" name="idprodukkartu[]">`)

                    var getIdBank = $(`#namaBank_${posisi}`).find(':selected').val();
                    var getTextBank = $(`#namaBank_${posisi}`).find(':selected').text();
                    var text = `No Valid`

                    if(getTextBank == ""){
                        text = text
                    }else{
                        var bin = $(`#noKartu${posisi}`).val()
                        var value = bin == '' ? 'noValid' : bin
                        const getApi = await axios.get(rest["byidfull"] + `?id=${getIdBank}&bin=${value}`);

                        var datas = getApi.data.data;
                        if(datas.length == 0){
                            text = 'No Valid'
                        }else{
                            text = `Valid`
                            $(`#idKartu_${posisi}`).find(`input[type="hidden"]`).val(datas[0].id_produk)
                        }
                    }
                    $(`#valid_${posisi}`).text(text)
                }
                sum_point = point_cash + point_bank
                $("#totalPoint").val(sum_point)
                $("#pointCash").val(point_cash)
                $("#pointEDC").val(point_bank)
            })
        },
        custfunct(){

            var vue = this
            vue.datas_kelipatan()

            $("#loading-action").hide();

            // SHOW PLUS BUTTON
            $("#form-input-earnpoint").on("change","#namaMember",  async function(e){
                e.preventDefault();
                $("#loading-action").show();
                var getIdMember = $('#namaMember').find(':selected').val();
                const getApi = await axios.get(rest["listmemberbyid"] + `?member=${getIdMember}`);

                var datas = getApi.data.data;

                var temp = `
                        <label>No KTP / SIM (ID)</label>
                            <input type="text" name="noktp" id="noktp" value="${datas[0].ktp}" readonly class="form-control">`
                
                var temp2 = `
                        <label>Action</label>
                            <div class="row">
                                <div class="col-12"><a href="#" class="btn btn-success mr-2 plus">+</a></div>
                            </div>`
                
                $("#idmember").html(temp);
                $("#actionPlus").html(temp2);

                $("#totalPoint").val(datas[0].point)
            })

            // FIRST ITEM TABLE
            $("#table_earn").ready(function (){
                $("#namaTenant_1").html(`
                    <select class="form-control js-example-basic-single" style="width: 100%" required id="namaTenant_select_1" name="namaTenant[]"}></select>
                    <div id="namaTenant_1_select-error"></div>`
                )

                $("#table_earn > tbody > tr #namaTenant_select_1").select2({
                    placeholder: {
                        id: '0',
                        text: ``
                    },
                    allowClear: false,
                    enable: true,
                    tags: false,
                    dropdownParent: $("#namaTenant_1"),
                    ajax: {
                        url: rest["listtenant"],
                        method: "GET",
                        data: function(params) {
                            var keyword = params.term;
                            if (keyword === undefined) {
                                keyword = "";
                            }
                            var query = {
                                column: "text",
                                value: keyword,
                                page: params.page || 1
                            }
                            return query;
                        },
                        processResults: function(data) {
                            return {
                                results: $.map(data.data, function(obj) {
                                    var placeId = obj.id;
                                    var placeName = obj.text;
                                    return {
                                        id: placeId,
                                        text: placeName
                                    }
                                }),
                                pagination: {
                                    more: (data.next_page==data.current_page?false:true)
                                }
                            }
                        }
                    }
                });

                $("#namaPemilik_1").html(`
                    <input type="text" name="namaPemilik[]" id="namaPemilik1" readonly class="form-control">`
                )

                $("#nominal_1").html(`<input class="form-control" name="nominal[]" required autocomplete="off" id="nominal_1-currency"/>`)

                $(`#nominal_1-currency`).inputmask({ 
                            alias : "currency", 
                            prefix: "Rp ",
                            groupSeparator: ".",
                            radixPoint: ",",
                            rightAlign: false
                });
                
                $("#bayar_1").html(`
                    <label class="form-check-label">
                        <input type="radio" name="bayar[1]" id="cash" value="cash" class="form-check-input">
                            Cash
                    </label>
                    <label class="form-check-label">
                        <input type="radio" name="bayar[1]" id="edc" value="bank" class="form-check-input">
                            EDC
                    </label>`
                )

                $("#table_earn > tbody > tr").find("#cash").prop("checked", true)

                $(".form-check-input").css( { "margin-left" : "0px", "position" : "relative" });

                $("#namaBank_1").html(`
                    <select class="form-control js-example-basic-single" style="width: 100%" id="namaBank_select_1" name="namaBank[]"}>
                        <option value="0"></option>
                    </select>
                    <div id="namaBank_1_select-error"></div>`
                )

                $("#table_earn > tbody > tr #namaBank_select_1").select2({
                    placeholder: {
                        id: '0',
                        text: ``
                    },
                    allowClear: false,
                    enable: true,
                    tags: false,
                    dropdownParent: $("#namaBank_1"),
                    ajax: {
                        url: rest["listbank"],
                        method: "GET",
                        data: function(params) {
                            var keyword = params.term;
                            if (keyword === undefined) {
                                keyword = "";
                            }
                            var query = {
                                column: "text",
                                value: keyword,
                                page: params.page || 1
                            }
                            return query;
                        },
                        processResults: function(data) {
                            return {
                                results: $.map(data.data, function(obj) {
                                    var placeId = obj.id;
                                    var placeName = obj.text;
                                    return {
                                        id: placeId,
                                        text: placeName
                                    }
                                }),
                                pagination: {
                                    more: (data.next_page==data.current_page?false:true)
                                }
                            }
                        }
                    }
                });

                $("#noKartu_1").html(`
                    <input type="number" name="noKartu[]" id="noKartu1" class="form-control">`
                )

                $("#namaBank_1").hide()
                $("#noKartu_1").hide()

                $(`#total_belanja-currency`).inputmask({ 
                            alias : "currency", 
                            prefix: "Rp ",
                            groupSeparator: ".",
                            radixPoint: ",",
                            rightAlign: false
                });

                $("#table_earn").on("change","#namaTenant_1",  async function(){
                    var getTenant = $('#namaTenant_1').find(':selected').text();
                    $("#namaPemilik1").val(getTenant)
                })

                $("#table_earn > tbody > tr #bayar_1").on("click" , "input[type='radio']", async function(){
                    vue.jumlah2an();
                });

                $("#table_earn").on("focusout","#noKartu_1 > #noKartu1",  async function(){
                    vue.jumlah2an();
                    
                })

                $("#table_earn").on("keyup","input[name='nominal[]']",  async function(){
                    vue.jumlah2an();
                })

                $("#table_earn").on("change",`#namaBank_1`,  async function(){
                    vue.jumlah2an();
                })
            })

            // ACTION PLUS
            $("#actionPlus").on("click", ".plus", function(e){
                e.preventDefault()
                var len = $("#table_earn > tbody > tr ").length
                var getlastbaris = $("#table_earn > tbody > tr").eq(parseInt(len) - 1).data("idrow")
                var getlastidrow = parseInt(getlastbaris) + 1

                var newText = `
                    <tr id="body_${getlastidrow}" data-idrow="${getlastidrow}">
                        <td>
                            <div id="namaTenant_${getlastidrow}">
                                <select class="form-control js-example-basic-single" style="width: 100%" required id="namaTenant_select_${getlastidrow}" name="namaTenant[]"}></select>
                                <div id="namaProduk_${getlastidrow}_select-error"></div>
                            </div>
                        </td>
                        <td>
                            <div id="namaPemilik_${getlastidrow}">
                                <input type="text" name="namaPemilik[]" id="namaPemilik${getlastidrow}" readonly="" class="form-control">
                            </div>
                        </td>
                        <td>
                            <div id="nominal_${getlastidrow}">
                                <input class="form-control" name="nominal[]" required id="nominal_${getlastidrow}-currency" autocomplete="off" inputmode="numeric">
                            </div>
                        </td>
                        <td>
                            <div id="bayar_${getlastidrow}">
                                <label class="form-check-label">
                                    <input type="radio" name="bayar[${getlastidrow}]" checked id="cash" value="cash" class="form-check-input">
                                        Cash
                                </label>
                                <label class="form-check-label">
                                    <input type="radio" name="bayar[${getlastidrow}]" id="edc" value="bank" class="form-check-input">
                                        EDC
                                </label>
                            </div>
                        </td>
                        <td>
                            <div id="namaBank_${getlastidrow}">
                                <select class="form-control js-example-basic-single" style="width: 100%" id="namaBank_select_${getlastidrow}" name="namaBank[]"}>
                                <option value="0"></option>
                                </select>
                                <div id="namaBank_${getlastidrow}_select-error"></div>
                            </div>
                        </td>
                        <td>
                            <div id="noKartu_${getlastidrow}">
                                <input type="number" name="noKartu[]" id="noKartu${getlastidrow}" class="form-control">
                            </div>
                            <div id="idKartu_${getlastidrow}"></div>
                        </td>
                        <td>
                            <div id="valid_${getlastidrow}">
                            </div>
                        </td>
                        <td>
                            <div class="row">
                                <div class="col-12"><a href="#" class="btn btn-danger mr-2 min" data-iddel="${getlastidrow}">-</a></div>
                            </div>
                        </td>
                    </tr>`;
                
                
                $('#table_earn > tbody').append(newText)

                $("#table_earn").find(`#namaBank_${getlastidrow}`).ready(function (){
                    $(`#namaBank_${getlastidrow}`).hide()
                    $(`#noKartu_${getlastidrow}`).hide()
                })

                $(`#table_earn > tbody > tr`).find(`#namaTenant_select_${getlastidrow}`).select2({
                    placeholder: {
                        id: '0',
                        text: ``
                    },
                    allowClear: false,
                    enable: true,
                    tags: false,
                    dropdownParent: $(`#namaTenant_${getlastidrow}`),
                    ajax: {
                        url: rest["listtenant"],
                        method: "GET",
                        data: function(params) {
                            var keyword = params.term;
                            if (keyword === undefined) {
                                keyword = "";
                            }
                            var query = {
                                column: "text",
                                value: keyword,
                                page: params.page || 1
                            }
                            return query;
                        },
                        processResults: function(data) {
                            return {
                                results: $.map(data.data, function(obj) {
                                    var placeId = obj.id;
                                    var placeName = obj.text;
                                    return {
                                        id: placeId,
                                        text: placeName
                                    }
                                }),
                                pagination: {
                                    more: (data.next_page==data.current_page?false:true)
                                }
                            }
                        }
                    }
                });

                $("#table_earn").on("change",`#namaTenant_${getlastidrow}`,  async function(){
                    var getTenant = $(this).find(':selected').text();
                    $(`#namaPemilik${getlastidrow}`).val(getTenant)
                })

                $(`#nominal_${getlastidrow}-currency`).inputmask({ 
                            alias : "currency", 
                            prefix: "Rp ",
                            groupSeparator: ".",
                            radixPoint: ",",
                            rightAlign: false
                });

                $("#table_earn").find(".form-check-input").ready(function (){
                    $("#table_earn").find(".form-check-input").css({ "margin-left" : "0px", "position" : "relative" });
                })

                $(`#table_earn > tbody > tr #namaBank_select_${getlastidrow}`).select2({
                    placeholder: {
                        id: '0',
                        text: ``
                    },
                    allowClear: false,
                    enable: true,
                    tags: false,
                    dropdownParent: $(`#namaBank_${getlastidrow}`),
                    ajax: {
                        url: rest["listbank"],
                        method: "GET",
                        data: function(params) {
                            var keyword = params.term;
                            if (keyword === undefined) {
                                keyword = "";
                            }
                            var query = {
                                column: "text",
                                value: keyword,
                                page: params.page || 1
                            }
                            return query;
                        },
                        processResults: function(data) {
                            return {
                                results: $.map(data.data, function(obj) {
                                    var placeId = obj.id;
                                    var placeName = obj.text;
                                    return {
                                        id: placeId,
                                        text: placeName
                                    }
                                }),
                                pagination: {
                                    more: (data.next_page==data.current_page?false:true)
                                }
                            }
                        }
                    }
                });

                $(`#table_earn > tbody > tr #bayar_${getlastidrow}`).on("click" , "input[type='radio']", async function(){
                    vue.jumlah2an();
                    
                });

                $("#table_earn").on("focusout",`#noKartu_${getlastidrow} > #noKartu${getlastidrow}`,  async function(){
                    vue.jumlah2an();
                    
                })

                $("#table_earn").on("keyup","input[name='nominal[]']",  async function(){
                    vue.jumlah2an();
                })

                $("#table_earn").on("change",`#namaBank_${getlastidrow}`,  async function(){
                    vue.jumlah2an();
                })
            })

            $(`#table_earn > tbody`).on("click",".min",function(e){
                e.preventDefault();
                var idx =  parseInt($(this).data('iddel'))
                $(`#table_earn > tbody > tr[data-idrow=${idx}]`).remove()
                vue.jumlah2an();
            })
        }
	},
	mounted(){
        var vue = this
		$('#form-input-earnpoint').createForm({
            vue: vue,
            action: 'add',
            rest:{
                api: rest["addearnpoint"]
            },
            back: 'earnpoint',
            form(){
                return [   
                    $.inpdate('Tanggal Earn Points','tglearn','tglearn',true,{
                        placeholder: 'Tanggal Earn Points'
                    }),
                    $.inpselect2('Nama / Member','namaMember','namaMember',true,{
                        placeholder: 'Nama / Member',
                        api:rest["listmember"]
                    }),
                    $.html(`<div class="form-group" id="idmember"></div>`),
                    $.html(`<div class="form-group" id="actionPlus"></div>`),
                    $.html(`<div class="form-group">
                    <div class="table-responsive">
                        <table class="table table-striped" id="table_earn">
                            <thead>
                                <tr>
                                    <th>Nama Tenant</th>
                                    <th>Pemilik Tenant</th>
                                    <th>Nominal Penjualan</th>
                                    <th>Pembayaran Via</th>
                                    <th>Nama Bank</th>
                                    <th>No Kartu</th>
                                    <th>Valid</th>
                                    <th>Hapus</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr id="body_1" data-idrow="1">
                                    <td>
                                        <div id="namaTenant_1"></div>
                                    </td>
                                    <td>
                                        <div id="namaPemilik_1"></div>
                                    </td>
                                    <td>
                                        <div id="nominal_1"></div>
                                    </td>
                                    <td>
                                        <div id="bayar_1"></div>
                                    </td>
                                    <td>
                                        <div id="namaBank_1"></div>
                                    </td>
                                    <td>
                                        <div id="noKartu_1"></div>
                                        <div id="idKartu_1"></div>
                                    </td>
                                    <td>
                                        <div id="valid_1"></div>
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr id="foot_1">
                                    <td colspan="5" style="vertical-align:middle">
                                        <div style="text-align:right">Point Cash</div>
                                    </td>
                                    <td colspan="3" >
                                        <div style="text-align:right" >
                                            <input type="text" class="form-control" value="0" name="pointCash" readonly id="pointCash"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="5" style="vertical-align:middle">
                                        <div style="text-align:right">Point EDC</div>
                                    </td>
                                    <td colspan="3" >
                                        <div style="text-align:right" >
                                            <input type="text" class="form-control" value="0" name="pointEDC" readonly id="pointEDC"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="vertical-align:middle">
                                        <div style="text-align:right">Total Belanja</div>
                                    </td>
                                    <td>
                                        <div style="text-align:right">
                                            <input class="form-control" name="total_belanja" value="0" readonly id="total_belanja-currency"/>
                                        </div>
                                    </td>
                                    <td colspan="2"  style="vertical-align:middle">
                                        <div style="text-align:right">Total Points</div>
                                    </td>
                                    <td colspan="3">
                                        <div style="text-align:right" >
                                            <input type="text" class="form-control" value="0" name="totalPoint" readonly id="totalPoint"/>
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    </div>`),
                ]
            },
            onFunction(){
                vue.custfunct()
            }
        });
	}
};
</script>