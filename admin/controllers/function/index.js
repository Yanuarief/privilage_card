export default
$(function() {
    'use strict';
    var loadplugin = {}

    $.urlParam = function(name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        }
        return decodeURI(results[1]) || 0;
    }

    String.prototype.cap = function() {
        return this.charAt(0).toUpperCase() + this.slice(1)
    }

    $.pagination = function(limit, total, current_page) {
        var total_page = Math.ceil(total / limit);
        /* Pagination */
        var total_page = total_page; /* Total Page*/
        var current_page = current_page; /* Number Page */
        var tot_mid = 5; /* Total Middle*/

        var first_middle = tot_mid - Math.floor((tot_mid / 2));

        var next_page = tot_mid - current_page;
        var prev_page = next_page - current_page;

        var pagination = ``;

        if (total_page <= tot_mid) {
            for (var i = 0; i < total_page; i++) {
                var number = i + 1;
                var act = current_page == number ? 'active' : '';
                pagination += `<li class="paginate_button page-item ${act}"><a class="page-link" data-page="${number}">${number}</a></li>`;
            }
        }
        if (total_page > tot_mid) {
            for (var i = 0; i < tot_mid; i++) {
                var number = i + 1;
                var act = current_page == number ? 'active' : '';
                pagination += `<li class="paginate_button page-item ${act}"><a class="page-link" data-page="${number}">${number}</a></li>`;
            }

            if (current_page >= first_middle && current_page <= tot_mid) {
                var next_page = current_page + 2;
                var prev_page = current_page - 2;

                var pagination = ``;
                /* Prev Page */
                for (var i = prev_page - 1; i < current_page - 1; i++) {
                    var number = i + 1;
                    pagination += `<li class="paginate_button page-item"><a class="page-link" data-page="${number}">${number}</a></li>`;
                }

                /* Current Page */
                pagination += `<li class="paginate_button page-item active"><a class="page-link" data-page="${current_page}">${current_page}</a></li>`;

                /* Next Page */
                for (var i = current_page; i < next_page; i++) {
                    var number = i + 1;
                    pagination += `<li class="paginate_button page-item"><a class="page-link" data-page="${number}">${number}</a></li>`;
                }
            }

            if (next_page <= 0) {
                var next_page = current_page + 2;
                var prev_page = current_page - 2;

                var pagination = ``;
                /* Prev Page */
                for (var i = (prev_page - 1); i < (current_page - 1); i++) {
                    var number = i + 1;
                    pagination += `<li class="paginate_button page-item"><a class="page-link" data-page="${number}">${number}</a></li>`;
                }

                /* Current Page */
                pagination += `<li class="paginate_button page-item active"><a class="page-link" data-page="${current_page}">${current_page}</a></li>`;

                /* Next Page */
                for (var i = current_page; i < next_page; i++) {
                    var number = i + 1;
                    pagination += `<li class="paginate_button page-item"><a class="page-link" data-page="${number}">${number}</a></li>`;
                }
            }

            var end_page = (total_page - tot_mid);
            var last_middle = end_page + tot_mid - Math.floor((tot_mid / 2));

            if (current_page > last_middle) {

                var pagination = ``;
                for (var i = end_page; i < total_page; i++) {
                    var number = i + 1;
                    var act = current_page == number ? 'active' : '';
                    pagination += `<li class="paginate_button page-item  ${act}"><a class="page-link" data-page="${number}">${number}</a></li>`;
                }
            }
        }

        var first = isNaN(total_page) == true ? `` : `<li class="paginate_button page-item previous"><a class="page-link" data-page="1">First</a></li>`;
        var last = isNaN(total_page) == true ? `` : `<li class="paginate_button page-item previous"><a class="page-link" data-page="${total_page}">Last</a></li>`;

        return first + pagination + last;
    }

    $.createContent = async function(nameid, load, opt = {}) {

            var limit = opt.limit 
            var page = opt.page
            var src = opt.search!=null?opt.search:``;
            var param = (page != null ? `?per_page=${limit}&page=${page}` : `?per_page=${limit}`) + src;
            const datas = await load(param);

            const id = nameid
            const title = datas.title
            const column = datas.column
            const array = datas.datas
            const value = datas.value
            const custom = datas.custom == null ? [] : datas.custom
            const action = datas.action == null ? [] : datas.action
            const search = datas.search

            const regex = /.?{{(.*?)}}/g
            const geteval = /.?(<~this.(.*?)~>)/g

            var content = ``
            var paging = ``
            var button_delete = ``
            if (array["data"] != null && array["data"].length > 0) {
                for (var i = 0; i < array['data'].length; i++) {

                content += `<tr>
                <td><input type="checkbox" class="${id}-checkbyitem" data-id="${array['data'][i].id}"></td>`

                        var middlebuild = ``
                        var txtval = {}
                        var finalval = ``
                        for (var j = 0; j < value.length; j++) {
                            if (custom.length > 0) {

                                var unkn = []
                                var catchval = {}
                                var matches = [];
                                var k = 0
                                var getfinal = ``
                                while (unkn = regex.exec(custom[j])) {
                                    var thisunkn = unkn
                                    while (matches = geteval.exec(unkn[1])) {
                                        var setval = matches[1].replace(matches[1], eval("array['data'][i]." + matches[2] + ""))
                                        if (k == 0) {
                                            catchval[k] = thisunkn['input'].replace(matches[1], setval)
                                        } else {
                                            catchval[k] = catchval[k - 1].replace(matches[1], setval)
                                        }
                                        txtval[j] = catchval[k]

                                        k++
                                    }
                                }

                                var finalcrt = {}
                                var s = 0
                                var txtcrt = [];
                                while (txtcrt = regex.exec(txtval[j])) {
                                    if (s == 0) {
                                        finalcrt[s] = txtcrt['input'].replace(`{{${txtcrt[1]}}}`, txtcrt[0].replace(txtcrt[0], eval(txtcrt[1])))
                                    } else {
                                        finalcrt[s] = finalcrt[s - 1].replace(`{{${txtcrt[1]}}}`, txtcrt[0].replace(txtcrt[0], eval(txtcrt[1])))
                                    }

                                    finalval = finalcrt[s]
                                    s++
                                }

                                finalval = finalval == `` ? custom[j] : finalval;

                                middlebuild += custom[j] == false ? `<td>${eval("array['data'][i]." + value[j] + "")}</td>` :
                                    `<td>${finalval}</td>`

                            } else {
                                middlebuild += `<td>${eval("array['data'][i]." + value[j] + "")}</td>`
                            }
                        }
                        var single_edit = `<button data-id="${array['data'][i].id}" data-action="edit" class="btn btn-xs btn-success btn-icon-text ${id}-edit">Edit</button>`
                        var single_delete = `<button data-id="${array['data'][i].id}" data-action="del" class="btn btn-xs btn-danger btn-icon-text ${id}-del">Delete</button>`
                        var act_single = (action.editsingle != null && action.editsingle == false) && (action.delsingle != null && action.delsingle == false) ? `` : `<td> ${(action.editsingle!=null && action.editsingle==false?``:`${single_edit}`)} ${(action.delsingle!=null && action.delsingle==false?``:`${single_delete}`)} </td>`
            content += middlebuild    
            content += `${act_single}
            </tr>`; 
        }
       paging += $.pagination(limit,array.sum,array.current_page)
       button_delete += ( action.delall!=null && action.delall==false )?``:`<button id="${id}-check-del" class="btn btn-danger btn-icon-text">Delete Selected</button>` 
    }

    var table = ``
    var content = content!=''?content:`<tr><td colspan="${(column.length+2)}" style="text-align:center;"><b>Sorry data not available!</b></td></tr>`;
    var taction = ( action.editsingle!=null && action.editsingle==false ) && ( action.delsingle!=null && action.delsingle==false )?``:`<th width="8%">ACTION</th>`
    var tcolumn = ``;
    if(column!=null && column.length>0){
        for(var i = 0; i < column.length; i++){
            tcolumn += `<th>${column[i]}</th>`;
        }
    }
    var sact = search==false?false:true;

    table += `<div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
                    <div class="card">
                    <div class="card-body">
                        <h6 class="card-title">${title}</h6>
                        <div class="table-responsive">
                            <div id="dataTableExample_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                                <div class="row">
                                    <div class="col-sm-12 col-md-6">
                                        <div class="dataTables_length" id="dataTableExample_length">
                                            <label>Show
                                                <select id="${id}-limit" class="custom-select custom-select-sm form-control">
                                                    <option value="10" ${(limit==10?`selected`:``)}>10</option>
                                                    <option value="25" ${(limit==25?`selected`:``)}>25</option>
                                                    <option value="50" ${(limit==50?`selected`:``)}>50</option>
                                                    <option value="100" ${(limit==100?`selected`:``)}>100</option>
                                                </select> entries</label>
                                        </div>
                                    </div>
                                    ${(sact==false?``:`
                                    <div class="col-sm-12 col-md-6">
                                        <div id="${id}-search" class="dataTables_filter">
                                            <label>
                                                <input type="search" class="form-control" placeholder="Search" aria-controls="dataTableExample">
                                            </label>
                                        </div>
                                    </div>
                                    `)}
                                </div>
                            </div>
                            <table id="${id}-table" class="table table-dark"></table>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 col-md-5 mt-3">
                                ${button_delete}
                            </div>
                            <div class="col-sm-12 col-md-7 pull-right mt-3">
                                <div class="dataTables_paginate paging_simple_numbers">
                                    <ul class="pagination float-right" id="${id}-paging">
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>`; 


    if($(`#${id}-content`).html()==null){
        $(`#${id}`).html(table);
    }
    $(`#${id}`).promise().done(function() {
        var cr_table = `<thead>
                        <tr>
                            <th width="2%"><input type="checkbox" value="0" id="${id}-checkall"></th>
                            ${tcolumn}
                            ${taction}
                        </tr>
                    </thead>
                    <tbody id="${id}-content">
                        ${content}
                    </tbody>`
        $(`#${id}-table`).html(cr_table);
        $(`#${id}-paging`).html(paging);
    });
    

    $(`#${id}-checkall`).on('click',function(){
        var checked = $(this).val()=='1'?$(this).val(0):$(this).val(1)
        if($(this).val()=='1'){
            $(`#${id}-content .${id}-checkbyitem`).attr('checked',true);
        }else{
            $(`#${id}-content .${id}-checkbyitem`).attr('checked',false);
        }
    })
}

function search_value(id){
    var myForm = document.getElementById(id);
    var formData = new FormData(myForm);
    var sval = ``;
    var fval = ``;
    var i = 0;
    for (var pair of formData.entries()) {
        if(pair[1]!=''){
            var val = encodeURIComponent(XmlEntities.encodeNonUTF(pair[1]));
            fval += `${pair[0]},`;
            sval += `${val},`;
        }
        i++;
    }
    var fval = fval.substr(0, fval.length-1)
    var sval = sval.substr(0, sval.length-1)
    var search = fval!=`` && sval!=``?`&search=${fval}&val=${sval}`:``;

    return search;
}

$.table = function(id,router,load,urldel,redit,csrc){

    $.checking();
    const limit = 10
    var limit_page = '?per_page=' + limit;
    $(document).ready(function() {
        var opt  = {
            limit: limit,
        }
        $.createContent(id,load,opt);
    })

    $(`#${id}`).on('click', `#${id}-paging .paginate_button a`, async function() {
        var page = $(this).data('page')
        var limit = parseInt($( `#${id}-limit option:selected` ).val());
        var search = csrc==null?``:search_value($(`#${csrc}`).find(`#${csrc}-form`).attr('id'));

        var opt  = {
            limit: limit,
            page: page,
            search: search
        }
        $.createContent(id,load,opt);
    });

    $(`#${id}`).on('change', `#${id}-limit`, async function(){
        var page = 1
        var limit = parseInt($(this).val())
        var search = csrc==null?``:search_value($(`#${csrc}`).find(`#${csrc}-form`).attr('id'));

        var opt  = {
            limit: limit,
            page: page,
            search: search
        }
        $.createContent(id,load,opt);
    })

    $(`#${id}`).on('click', `#${id}-check-del`, async function() {
        var page = $(`#${id}-paging li.active > a.page-link`).data('page')
        var limit = parseInt($( `#${id}-limit option:selected` ).val());
        var search = csrc==null?``:search_value($(`#${csrc}`).find(`#${csrc}-form`).attr('id'));
        
        const htoken = {
          'Authorization': token
        }
        var last_act = $(`.${id}-checkbyitem:checked`).length-1;
        $.each($(`.${id}-checkbyitem:checked`), async function(){
            var iddel = $(this).data('id');
            const formData = new FormData();
                formData.append("id", iddel);

            await axios.post(urldel, formData, {headers: htoken});
            var opt  = {
                limit: limit,
                page: page,
                search: search
            }
            $.createContent(id,load,opt);
        })
    })

    $(`#${id}`).on('click', `#${id}-content .${id}-edit`, async function() {
        var idedit = $(this).data('id');
        router.push({name:redit,params:{ action: 'edit', id: idedit}});
    })

    $(`#${id}`).on('click', `#${id}-content .${id}-del`, async function() {
        var page = $(`#${id}-paging li.active > a.page-link`).data('page')
        var limit = parseInt($( `#${id}-limit option:selected` ).val());
        var search = csrc==null?``:search_value($(`#${csrc}`).find(`#${csrc}-form`).attr('id'));

        var iddel = $(this).data('id');

        const formData = new FormData();
              formData.append("id", iddel);

        const htoken = {
          'Authorization': token
        }

        await axios.post(urldel, formData, {headers: htoken});
        var opt  = {
            limit: limit,
            page: page,
            search: search
        }
        $.createContent(id,load,opt);
    })
    
    if(csrc!=``){
        $(`#${csrc}`).on('submit',`#${csrc}-form`,function(e){
            e.preventDefault();
            var page = 1
            var limit = parseInt($( `#${id}-limit option:selected` ).val());
            var search = csrc==null?``:search_value($(this).attr('id'));
            var opt  = {
                limit: limit,
                page: page,
                search: search
            }
            $.createContent(id,load,opt);
        });
    }
}

$.select2ajax = function(selectId, dropdownParent, placeholder, api_url,selected=[]) {
    $(selectId).selectpicker('destroy');
    $(selectId).val("");
    if(selected.length>0){
        var sel = selected[0];
        $(selectId).html(`<option value="${sel.id}">${sel.text}</option>`);
    }
    $(selectId).select2({
        placeholder: {
            id: '0',
            text: `- ${placeholder} -`
        },
        allowClear: false,
        enable: true,
        /*minimumInputLength: 3,*/
        dropdownParent: $(dropdownParent),
        tags: false,
        ajax: {
            url: api_url,
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
}

$.extend({
    basic: function(){
        var basic =  [
            'inptext',
            'inphidden',
            'inppassword',
            'inpnumber',
        ]

        var func = {}
        $.each(basic, function(key, value){
            func[value] = function(title='', name='', id='', required=false, opt = {}) {

                var val = opt.value
                var placeholder = opt.placeholder

                var inpset = {}
                inpset[value] = {
                    id:id,
                    name:name,
                    title:title,
                    val:val,
                    required:required
                }

                loadplugin[id] = inpset

                value = value.replace('inp', '')
                var valinp = val!=null?`value="${opt.value}"`:``
                var plchld = placeholder?`placeholder="${opt.placeholder}"`:``
                var inp =  `<div class="form-group">
                                <label>${title}</label>
                                <input type="${value}" name="${name}" id="${id}" ${valinp} ${plchld} class="form-control">
                                <div id="${id}-error"></div>
                            </div>`
                return `${inp}`
            }
        })
        return func;
    }
})

$.extend(Object.assign(
    $.basic(),
    {   
        inpcheckbox: function(title='',name='', id = '', required=false, opt={}){
            var val = opt.value == 1 ? 1 : 0
            loadplugin[id] = {
                inpcheckbox:{
                    id:id,
                    name:name,
                    title:title,
                    required:required
                }
            }
            
            return `                
            <div class="form-check">
              <label class="form-check-label" id="${id}">
                <input type="checkbox" name="${name}" id="${id}" class="form-check-input" value="1" ${(val==1?`checked`:``)}>
                ${title}
              </label>
              <div id="${id}-error"></div>
            </div>`
        },
        inpdate: function(title='',name='', id='', required=false, opt = {}){
            var val = opt.value

            loadplugin[id] = {
                inpdate:{
                    id:id,
                    name:name,
                    title:title,
                    required:required
                }
            }

            var valinp = val!=null?`value="${opt.value}"`:``
            return `<div class="form-group">
                        <label>${title}</label>
                        <div class="input-group date datepicker" id="${id}-date">
                          <input type="text" name="${name}" class="form-control" id="${id}" ${valinp}>
                          <span class="input-group-addon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                          </span>
                        </div>
                    </div>`;
        },
        inpradiobox: function(title='',name='', id = '', required=false, opt={}){

            var val = opt.value

            loadplugin[id] = {
                inpradiobox:{
                    id:id,
                    name:name,
                    title:title,
                    required:required
                }
            }

            if(opt.option){
                var option = opt.option
                var html_opt = `<div class="form-group"><label>${title}</label>`;
                option.map(function(v,k){
                    var valinp = v.value!=null?`value="${v.value}"`:``
                    var checked = val==v.value?`checked`:``
                    html_opt += `
                       <div class="form-check">
                          <label class="form-check-label">
                            <input type="radio" name="${name}" id="${id}${k+1}" ${valinp} class="form-check-input" ${checked}>
                            ${v.name}
                          </label>
                        </div> 
                    `;
                })
                html_opt += `<div id="${id}-error"></div></div>`;
            }

            return html_opt;
        },
        inpselect2: function(title='',name='',id='', required=false, opt={}) {

            var placeholder = opt.placeholder
            var api_url = opt.api
            var multi = opt.multiple==true?true:false
            var selected = opt.selected

            loadplugin[id] = {
                inpselect2:{
                    id:`#${id}_select`,
                    name:name,
                    title:title,
                    required:required,
                    dropdownParent:`#${id}`,
                    placeholder:`${placeholder}`,
                    api_url:api_url,
                    selected:selected,
                }
            }
                            
            return `
            <div class="form-group" id="${id}">
                <label>${title}</label>
                <select class="form-control js-example-basic-single" id="${id}_select" name="${name}" ${(multi==true?`multiple="multiple"`:``)}>
                </select>
                <div id="${id}_select-error"></div>
            </div>`
        },
        inpimage: function(title='', name='', id='', required=false, opt = {} ){

            var val = opt.value
            var path = opt.path
            var accept = opt.accept
            var height = opt.height
            var width = opt.width
            loadplugin[id] = {
                inpimage:{
                    id:id,
                    name:name,
                    title:title,
                    val:val,
                    required:required,
                    width:width,
                    type:`image`,
                    path: path
                }
            }

            var accepttxt = ``;
            $.each(accept, function( key, val) {
                accepttxt += `.${val},`;
            })
            var caccepttxt = accepttxt

            return `
            <div class="form-group" id="${id}">
                <label>${title}</label>
                <div id="file_img"></div>
                <input type="file" title="" name="${name}" id="${id}myDropify" data-height="${height}" class="border" accept="${caccepttxt}"/>
                <div id="${id}myDropify-error"></div>
            </div>`
        },
        inpckeditor: function(title='', name='', id='', required=false, opt = {}){

            var val = opt.value
            var placeholder = opt.placeholder

            var val = val?`${opt.value}`:``
            var plchld = placeholder?`placeholder="${opt.placeholder}"`:``

            loadplugin[id] = {
                inpckeditor:{
                    id:id,
                    name:name,
                    title:title,
                    required:required,
                    type:'ckeditor',
                    val:val
                }
            }

            return `<div class="form-group" id="${id}-ckedit5">
                        <label>${title}</label>
                        <textarea name="${name}" id="${id}"></textarea>
                        <div id="${id}-error"></div>
                    </div>`
        },
        inptextarea: function(title='', name='', id='', required=false, opt = {}){

            var val = opt.value
            var placeholder = opt.placeholder

            var val = val?`${opt.value}`:``
            var plchld = placeholder?`placeholder="${opt.placeholder}"`:``
            loadplugin[id] = {
                inptextarea:{
                    id:id,
                    name:name,
                    title:title,
                    required:required,
                    val:val
                }
            }

            return `<div class="form-group">
                        <label>${title}</label>
                        <textarea class="form-control" rows="5" name="${name}" id="${id}" ${plchld}></textarea>
                        <div id="${id}-error"></div>
                    </div>`
        },
        inpcurrency: function(title='', name='', id='', required=false, opt = {}){
            var val = opt.value
            var val = val?`${opt.value}`:``
            loadplugin[id] = {
                inpcurrency:{
                    id:id,
                    name:name,
                    title:title,
                    required:required,
                    val:val
                }
            }
            return `<div class="form-group">
                      <label>${title}</label>
                      <input class="form-control" name="${name}" id="${id}-currency"/>
                      <div id="${id}-currency-error"></div>
                    </div>`
        },
        inpemail: function(title='', name='', id='', required=false, opt = {}){
            
            var val = opt.value
            var placeholder = opt.placeholder
            var valinp = val!=null?`value="${opt.value}"`:``

            loadplugin[id] = {
                inpemail:{
                    id:id,
                    name:name,
                    title:title,
                    required:required
                }
            }

            var valinp = val!=null?`value="${opt.value}"`:``
            var plchld = placeholder?`placeholder="${opt.placeholder}"`:``

            return `<div class="form-group">
                      <label>${title}</label>
                      <input class="form-control" name="${name}" id="${id}-email" ${valinp} ${plchld}/>
                      <div id="${id}-email-error"></div>
                    </div>`
        },
        inpselect: function(title='', name='', id='', required=false, opt= {}){
            
            var val = opt.value;
            var option = opt.option==null?[]:opt.option;
            var multi = opt.multi==true?true:false;
            var placeholder = opt.placeholder?opt.placeholder:`- Choose -`;

            loadplugin[id] = {
                inpselect:{
                    id:id,
                    name:name,
                    title:title,
                    val:val,
                    required:required,
                    placeholder:placeholder
                }
            }

            var optcrt = ``
            $.each(option, function( k, v) {
                optcrt += `<option value="${v.value}" ${(val==v.value?`selected`:``)}>${v.name}</option>`
            })

            var multi = multi==false?'':'multiple="multiple"'
            return `<div class="form-group">
                      <label>${title}</label>
                      <select name="${name}" id="${id}" class="form-control js-example-basic-single w-100" ${multi}>
                        ${optcrt}
                      </select>
                      <div id="${id}-error"></div>
                    </div>`
        },
        inptag: function(title='', name='', id='', required=false, value=[]){
            loadplugin[id] = {
                inptag:{
                    id:id,
                    name:name,
                    title:title,
                    required:required
                }
            }

            var optcrt = ``
            $.each(value, function( key, val) {
                optcrt += ``
            })

            var multi = multi==false?'':'multiple="multiple"'
            return `<div class="form-group">
                      <label>${title}</label>
                      <input name="${name}" id="${id}" class="form-control" value="New York,Texas,Florida,New Mexico">
                      <div id="${id}-error"></div>
                    </div>`
        },
        inpfile: function(title='', name='', id='', required=false,opt = {}){

            var val = opt.value
            var placeholder = opt.placeholder
            var path = opt.path
            var accept = opt.accept

            loadplugin[id] = {
                inpfile:{
                    id:id,
                    name:name,
                    title:title,
                    val:val,
                    required:required,
                    type:`file`,
                    path:path
                }
            }

            var accepttxt = ``;
            $.each(accept, function( key, val) {
                accepttxt += `.${val},`;
            })
            var caccepttxt = accepttxt

            return `<div class="form-group">
                        <label>${title}</label>
                        <input type="file" id="${id}" name="${name}" class="file-upload-default" accept="${caccepttxt}">
                        <div class="input-group col-xs-12">
                            <input type="text" class="form-control file-upload-info" disabled="" placeholder="${placeholder}">
                            <span class="input-group-append">
                                <button id="${id}-inpupl" class="file-upload-browse btn btn-primary" type="button">Upload</button>
                            </span>
                        </div>
                        <div id="${id}-error"></div>
                    </div>`
        },
        html: function(html=``){
            return html
        }
    }
));

$.loadplugin = function(loadplugin=[],act){
    $.each(loadplugin, function( key, val) {
        $.each(val, function( key1, val1) {
            switch(key1){

                case 'inptag':
                    $(`#${val1.id}`).tagsInput({
                        'width': '100%',
                        'height': '75%',
                        'interactive': true,
                        'defaultText': 'Add More',
                        'removeWithBackspace': true,
                        'minChars': 0,
                        'maxChars': 20,
                        'placeholderColor': '#666666',
                        'color': '#fff'
                    });
                break;

                case 'inpcheckbox':
                case 'inpradiobox':
                    $(`.form-check label,.form-radio label`).append('<i class="input-frame"></i>');
                break;

                case 'inpcurrency':
                    $(`#${val1.id}-currency`).inputmask({ 
                        alias : "currency", 
                        prefix: "Rp ",
                        groupSeparator: ".",
                        radixPoint: ",",
                        rightAlign: false
                    });
                    $(`#${val1.id}-currency`).val(val1.val);
                break;

                case 'inpemail':
                    $(`#${val1.id}-email`).inputmask({
                        alias : "email"
                    });
                break; 

                case 'inpselect':
                    $(`select#${val1.id}.js-example-basic-single`).select2({placeholder: val1.placeholder});
                    if(val1.val==null) $(`select#${val1.id}.js-example-basic-single`).val('').trigger('change');
                break;

                case 'inpselect2':
                    $.select2ajax(
                        val1.id,
                        val1.dropdownParent,
                        val1.placeholder,
                        val1.api_url,
                        val1.selected
                    );
                break;

                case 'inpfile':
                    if(act=="edit"){
                        $(`#${val1.id}`).parent().find('.form-control').val(`${val1.val}`)
                    }

                    $(`#${val1.id}-inpupl`).on('click', function(e) {
                      var file = $(this).parent().parent().parent().find('.file-upload-default');
                      file.trigger('click');
                    });
                    $(`#${val1.id}`).on('change', function() {
                      $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
                    });
                break;

                case 'inpimage':
                    if(act=="edit"){
                        /*function toDataUrl(url, callback) {
                            var xhr = new XMLHttpRequest();
                            xhr.onload = function() {
                                var reader = new FileReader();
                                reader.onloadend = function() {
                                    callback(reader.result);
                                }
                                reader.readAsDataURL(xhr.response);
                            };
                            xhr.open('GET', url);
                            xhr.responseType = 'blob';
                            xhr.send();
                        }

                        function dataURLtoFile(dataurl, filename) {

                            var arr = dataurl.split(','),
                                mime = arr[0].match(/:(.*?);/)[1],
                                bstr = atob(arr[1]), 
                                n = bstr.length, 
                                u8arr = new Uint8Array(n);
                                
                            while(n--){
                                u8arr[n] = bstr.charCodeAt(n);
                            }
                            
                            return new File([u8arr], filename, {type:mime});
                        }
                        var val_img = val1.val
                        var res = val_img.split("/");
                        var name_val = res[res.length-1]*/

                        /*var file_nameArr = [];
                        toDataUrl(`https://jcm.gmscode.net/fake.png`, function(myBase64) {
                            var file = dataURLtoFile(myBase64,name_val);
                            var holder = document.getElementById(`${val1.id}myDropify`);
                            holder.onload = function (e) {
                                console.log(e);
                            }
                            
                        });*/
                        $(`#${val1.id}myDropify`).data('default-file', `${val1.val}`);   
                    }
                    /*$(`#${val1.id}myDropify`).on('change', val1.prepareUpload);*/
                    $(`#${val1.id}myDropify`).dropify();
                    $(`#${val1.id} .dropify-wrapper`).css('width', `${val1.width}px`);

                break;

                case 'inpdate':
                    $(`#${val1.id}`).inputmask({
                        alias : "datetime",
                        inputFormat : "yyyy-mm-dd"
                    });
                    $(`#${val1.id}-date`).datepicker({
                      format: "yyyy-mm-dd",
                      todayHighlight: true,
                      autoclose: true
                    });


                    if(act=="add"){
                        var date = new Date();
                        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                        $(`#${val1.id}-date`).datepicker('setDate', today);
                    }
                break;

                case 'inpckeditor':
                    ClassicEditor
                    .create( document.querySelector( `#${val1.id}` ), {
                        
                        toolbar: {
                            items: [
                                'heading',
                                'alignment',
                                'fontSize',
                                'fontFamily',
                                'fontColor',
                                'fontBackgroundColor',
                                'insertTable',
                                'pageBreak',
                                '|',
                                'bold',
                                'italic',
                                'underline',
                                '|',
                                'bulletedList',
                                'numberedList',
                                'todoList',
                                'indent',
                                'outdent',
                                '|',
                                'link',
                                'blockQuote',
                                'mediaEmbed',
                                'undo',
                                'redo',
                                'highlight',
                                'specialCharacters',
                                'removeFormat',
                                'restrictedEditingException',
                                'codeBlock',
                                'strikethrough',
                                'subscript',
                                'superscript',
                                'code'
                            ]
                        },
                        language: 'en',
                        table: {
                            contentToolbar: [
                                'tableColumn',
                                'tableRow',
                                'mergeTableCells',
                                'tableCellProperties',
                                'tableProperties'
                            ]
                        },
                        licenseKey: '',
                        
                    } )
                    .then( editor => {
                        /*editor.destroy()*/
                        window.editor = editor;
                        if(act=="edit"){
                            editor.setData( `${val1.val}` );
                        }
                    } )
                    .catch( error => {
                    } );

                    
                break;

                default:
                    if(act=="edit"){
                        $(`#${val1.id}`).val($('<div/>').html(`${val1.val}`).text())
                    }
                break;
            }
        })
    })
}

$.resetinp = function(id,loadplugin=[],act){
    $.each(loadplugin, function( key, val) {
        $.each(val, function( key1, val1) {
            switch(key1){

                case 'inpimage':
                    $(`.dropify-clear`).trigger("click");
                break;

                case 'inpselect':
                case 'inpselect2':
                    $(`.js-example-basic-single`).val('').trigger('change');
                    $(`${val1.selectId}`).val('').trigger('change');
                break;

                case 'inpckeditor':
                    editor.setData('');
                break;

                default:
                    if(key1=='inpdate'){
                        var date = new Date();
                        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                        $(`#${val1.id}-date`).val(today);
                    }else{
                        $(`#${val1.id}`).val("")
                    }
                break;
            }
        })
    })
}

$.loadValid = async function(id,loadplugin=[],opt = {}){


    const act = opt.rest
    const vue = opt.vue
    const action = opt.action
    const data_id = act.id?act.id:null

    var api = ``;
    if(action!=false){
        switch(action){
            case 'add':
                api = act.api
            break;
            
            case 'edit':
                api = data_id==null?`${act.api}?id=${vue.$route.params.id}`:`${act.api}?id=${data_id}`
            break;
        }
    }

    var base_id = `${id}`
    var id = `${id}-form`

    var rules = {} 
    var messages = {} 
    var ignore = `` 
    $.each(loadplugin, function( key, val) {
        $.each(val, function( key1, val1) {
            var getcs = val1.type!=null?val1.type:0
            switch(getcs){
                case 'image':
                case 'file':
                break;

                case 'ckeditor':
                    ignore += `:hidden:not(#${val1.id}-ckedit5),#${val1.id}-ckedit5 .ck.ck-editor__main .ck-focused,`
                break;

                default:
                    rules[val1.name] = {
                      required: val1.required,
                    }

                    messages[val1.name] = {
                      required: `${val1.title} Cannot Be Empty!`
                    }
                break;
            }
        })
    })

    $.validator.setDefaults({
        submitHandler: async function() {
            var checking = await $.checking()
            if(checking==true){
                $('#loading-submit').show();
                $('#loading-action').hide();

                var file = {}
                var name = {}
                let myForm = document.getElementById(id);
                var idprogress = id.replace(`-form`, `-progress`)
                const formImg = new FormData();
                const formFile = new FormData();
                const formInput = new FormData();
                const formData = new FormData(myForm);

                var i = 0
                var existform = {}
                $.each(loadplugin, function( key, val) {
                    $.each(val, function( key1, val1) {
                        if(val1.type=='image' || val1.type=='file'){
                            if(formData.get(key).name!=''){
                                var getsplit = formData.get(key).name.split(".")
                                var type = getsplit[getsplit.length-1].toLowerCase()
                                var namefile = parseInt(moment().format('YYYYMMDDHHmmss'))+(i*3)
                                var newname = `${namefile}.${type}`

                                formImg.append(`${newname}-file`, formData.get(key));
                                formImg.append(`${newname}-name`, newname);
                                formImg.append(`${newname}-path`, val1.path);

                                formInput.append(key,newname);
                                
                                existform[key] = key

                            }
                        }else{
                            var type = key1.replace('inp', '')
                            var newval;
                            switch(type){
                                case "ckeditor":
                                    newval = formData.get(key)
                                    formInput.append(key,newval);
                                    
                                    existform[key] = key

                                break;

                                case "currency":
                                    var str = formData.get(key)
                                    var nominal = (str.replace("Rp ", "")).replace(",00", "").replace(/\./g, "");
                                    newval = isNaN(parseInt(nominal))?"":parseInt(nominal);
                                    formInput.append(key,newval);
                                    existform[key] = key
                                break;

                                case "radiobox":
                                    newval = XmlEntities.encodeNonUTF(formData.get(key))
                                    formInput.append(key,newval);
                                    existform[key] = key
                                break;

                                /*default:
                                    newval = XmlEntities.encodeNonUTF(formData.get(key))
                                    formInput.append(key,newval);

                                    existform[key] = key
                                break;*/
                            }
                        }
                        
                    })
                    i++;
                })

                for (var pair of formData.entries()) {
                    if(existform[pair[0]]==null){
                        var newval = XmlEntities.encodeNonUTF(pair[1])
                        if(newval!=''){
                            formInput.append(pair[0],newval);
                        }
                    }
                }

                const aind = {
                  'Authorization': token
                }

                const data = await axios.post(api, formInput, {headers: aind});

                var act = opt;
                var status;
                var msg;
                switch(data.data.status){
                    case 200:
                        status = `success`;
                        msg = `Input data success`;
                    break;

                    case 403:
                        status = `danger`;
                        msg = `Sorry, Data can\'t insert`;
                    break;
                }
                msg = act.msg==true?data.data.msg:msg
                
                var getsize = 0
                var getsize1 = 0
                var getsize2 = 0
                const formImg1 = new FormData();
                for (var pair of formImg.entries()) {
                    $.each(data.data.allowimg,function(key, val){
                        var checking = pair[0].indexOf(val)>-1?true:false
                        if(checking==true){
                            var name = `${pair[0].replace(`${val}-`, ``)}[]`
                            formImg1.append(name, pair[1]);
                            if(pair[0].replace(`${val}-`, ``)=='file'){
                                getsize1 += pair[1].size;
                                getsize += pair[1].size;
                            }
                        }
                    })                    
                }

                const formFile1 = new FormData();
                for (var pair of formFile.entries()) {
                    $.each(data.data.allowfile,function(key, val){
                        var checking = pair[0].indexOf(val)>-1?true:false
                        if(checking==true){
                            var name = `${pair[0].replace(`${val}-`, ``)}[]`
                            formFile1.append(name, pair[1]);
                            if(pair[0].replace(`${val}-`, ``)=='file'){
                                getsize2 += pair[1].size;
                                getsize += pair[1].size;
                            }
                        }
                    })                    
                }

                if(getsize == 0){
                    $(`#${idprogress}`).html(`<div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">100%</div>`)
                }

                if(status==`success`){
                    var step = 0
                    var size1 = 0
                    var pl1 = 0
                    if(getsize1>0){
                        const aimg = {
                          'Content-Type': 'application/json; charset=utf-8',
                          'Authorization': data.data.authimg,
                        }
                        const dataimg = await axios.post(
                        rest["uploadimg"],
                        formImg1,
                        {
                            headers: aimg,
                            onUploadProgress: function(progressEvent) {
                            size1 = progressEvent.total-getsize1;
                            var allsize = getsize+size1
                            pl1 = progressEvent.loaded
                            var percentCompleted = Math.round( (progressEvent.loaded * 100) / allsize );
                                step = Math.ceil(percentCompleted)
                                $(`#${idprogress}`).html(`<div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" role="progressbar" style="width: ${step}%;" aria-valuenow="${step}" aria-valuemin="0" aria-valuemax="100">${step}%</div>`)
                            }
                        });
                    }
                    
                    var newstep = 0
                    if(getsize2>0){
                        const afile = {
                          'Content-Type': 'application/json; charset=utf-8',
                          'Authorization': data.data.authfile,
                        }
                        const datafile = await axios.post(rest["uploadfile"], formFile1, {
                            headers: afile,
                            onUploadProgress: function(progressEvent) {

                            var size2 = progressEvent.total-getsize2;
                            var allsize = getsize+size2+size1
                            var percentCompleted = Math.round( (progressEvent.loaded * 100) / allsize );
                                newstep = step+Math.ceil(percentCompleted)
                                $(`#${idprogress}`).html(`<div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" role="progressbar" style="width: ${newstep}%;" aria-valuenow="${newstep}" aria-valuemin="0" aria-valuemax="100">${newstep}%</div>`)
                            }
                        });
                    }
                }

                $('#loading-submit').hide();
                $('#loading-action').show();
                
                var alrt = `<div class="alert alert-icon-${status}" role="alert">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                              ${msg}
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>`


                if(( opt.action=='add' || opt.action=='edit') && status==`success`){
                    switch(opt.action){
                        case 'add':
                            var form = await opt.form()
                            $(`#${base_id}`).inputForm(opt,form,function(){
                                $(`#loc-alert`).html(alrt);
                                $('html, body').animate({
                                    scrollTop: $(".page-content").offset().top-60
                                }, 500);
                            });
                        break;

                        case 'edit':
                            $(`#loc-alert`).html(alrt);
                            $('html, body').animate({
                                scrollTop: $(".page-content").offset().top-60
                            }, 500);
                        break;
                    }
                    
                }else{
                    $(`#loc-alert`).html(alert);
                    
                    $('html, body').animate({
                        scrollTop: $(".page-content").offset().top-60
                    }, 500);
                }
            }
        }
    });    

    var ignore = ignore.slice(0,ignore.length-1);
    
    $(`#${id}`).validate({
      rules,
      messages,
      ignore: ignore,
      errorPlacement: function(label, element) {
        label.addClass('mt-2 text-danger');
        $(`#${element[0].id}-error`).html(label);
      },
      highlight: function(element, errorClass) {
      }
    });

}

$.fn.inputForm = async function(opt,input=[],alrt){

    const act = opt;
    const api = opt.rest
    const action = opt.action
    const vue = act.vue
    const msg = act.msg?true:false

        var acttext = ``
        if(action!=false){
            switch(action){
                case 'add':
                    acttext = 'Add'
                break;
                
                case 'edit':
                    acttext = 'Edit'
                break;
                
                case 'search':
                    acttext = 'Search';
                break;
            }
        }

        if(act.textaction){
            acttext = act.textaction
        }
    
        const back = act.back==false?false:act.back
        const reset = act.reset==true?true:false

        var create_attr = ``
        $.each(input, function( key, val) {
          create_attr += `${val} `
        }); 

        const formCreate = `
        <div id="loc-alert"></div>
        <form method="post" class="forms-sample" id="${$(this).attr('id')}-form" enctype="multipart/form-data">
            ${create_attr}
            <div id="loading-submit" style="display:none;">
                <div class="progress" id="${$(this).attr('id')}-progress">
                  <div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                </div>
            </div>
            <div id="loading-action" style="display:show;">
                ${(action!=false?`<button type="submit" id="${$(this).attr('id')}-submit" class="btn btn-primary mr-2">${acttext}</button>`:``)}
                ${(reset==true?`<button id="${$(this).attr('id')}-reset" class="btn btn-danger">Reset</button>`:``)}
                ${(back==false?``:`<button id="${$(this).attr('id')}-back"class="btn btn-light">Cancel</button>`)}
            </div>
        </form>`
        
        $(this).html(formCreate);        
        $.loadplugin(loadplugin,action);
        
        if(opt.onFunction) opt.onFunction()
        
        alrt();

        var idx = $(this).attr('id')
        $(`#${idx}`).find(`#${idx}-form #${idx}-reset`).on('click',function(e){
            e.preventDefault();
            $.resetinp(idx,loadplugin);
            $(`#${idx}`).find(`#${idx}-form #${idx}-submit`).submit();
        })

    if(action!=false){
        switch(action){
            case 'add':            
            case 'edit':
                $.loadValid(`${$(this).attr('id')}`,loadplugin,opt);
        
                $(`#${$(this).attr('id')}`).on('submit', async function(e){
                    e.preventDefault();
                    $.loadValid($(this).attr('id'),loadplugin,opt);
                })
            break;
        }
    }
}


$.fn.createForm = async function(opt={}){

    var api = opt.rest

    if(opt.action!='search'){
        $.checking();
    }

    switch(opt.action){
        case 'search':
            $.checking();
        break;

        case 'edit':
            var datas = await axios.get(api.databyid);
        break;
    }

    var datas = datas?datas:[]
    var form = await opt.form(datas);

    const vue = opt.vue
    const back = opt.back==false?false:opt.back

    $(`#${$(this).attr('id')}`).inputForm(opt,form,function(){});
    
    $(`#${$(this).attr('id')}`).on('click', `#${$(this).attr('id')}-back`, async function(e) {
        e.preventDefault();
        if(back!=null){
            vue.$router.push({path: `/${back}`});
        }
    })
}


});

$.checking = async function(){
    var token = localStorage.getItem('token');
    if(token!=null){
        const auth = await axios.get(rest["checking"],{
            headers: {
               Authorization: token
            }
        });
        var active = auth.data.active;
        
        if(active==false){
            localStorage.removeItem('token');
            location.reload();
        }else{
            return true
        }
    }
}