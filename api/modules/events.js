const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const fecha = require('fecha');
const axios = require('axios');
const { base64encode, base64decode } = require('nodejs-base64');
const md5 = require('md5');

var image_type = [
    "original",
    "large",
    "medium",
    "small",
    "mini",
];

exports.lists = function(req, res, resp, conn, opt = {}) {
        var table = 'events';

        var params = req.query;
        var current = params.page == null ? 1 : parseInt(params.page);
        var per_page = params.per_page == null ? 10 : parseInt(params.per_page);
        var search = params.search == null ? '' : params.search;
        var val = params.val == null ? '' : params.val;
        var url_admin = opt.url_admin

        var spsrc = search.split(",");
        var spval = val.split(",");
        var setsrch = ``;
        if (search != '') {
            var lfld = spsrc.length - 1
            spsrc.forEach(function(v, k) {
                        var cval = spval[k];
                        switch (v) {
                            case 'id_fmaps':
                                setsrch += `b.id=${cval} ${lfld==k?``:`AND `}`;
                break;

                default:
                    setsrch += `${v} LIKE '%${cval}%' ${lfld==k?``:`AND `}`;
                break;
            }
        });
    }

    var qry = setsrch!=``?`AND (${setsrch})`:``;

    var page = (current - 1) * (per_page > 0 ? per_page : 10);

    var where = ` WHERE 1 ${qry} `;

    var limit = ` LIMIT ${page},${per_page} `;

    var body_qry = `${table} a
        INNER JOIN floormaps b ON a.floor_codes = b.id`

    var main_qry = `SELECT 
        a.*, b.floormaps, b.id as id_fmaps, b.code_maps
        FROM 
        ${body_qry}
        ${where}
        ORDER BY id DESC
        ${limit};`;

    conn.query(` ${main_qry} SELECT COUNT(*) as sum FROM ${body_qry} ${where} limit 1;
        `, [1, 2],  function (error, rows, fields){
        if(error){
            console.log(error)
        } else{

            var sum_data = rows[1][0].sum;
            var total_page = Math.ceil(sum_data/per_page);
            var prev = current==1?1:(current-1);
            var next = total_page==current?total_page:(current+1);

            var loc_image_ori = url_admin + table;
            var loc_image_thm = url_admin + table + '/thumbs';
            
            var datas = rows[0];
            datas.forEach(function(item, index, arr){

                var i;
                var image_data = {};
                for (i = 0; i < image_type.length; i++) {
                    switch(image_type[i]){
                        case 'original':
                            var url = loc_image_ori + '/' + item.image;
                            image_data[image_type[i]] = url;
                        break;

                        default:
                            var url = loc_image_thm + '/' + image_type[i] + '/' + item.image;
                            image_data[image_type[i]] = url;
                        break;
                    }
                }

                var start_date = fecha.format(item.start_date,"D MMM");
                var end_date   = fecha.format(item.end_date,"D MMM YYYY");

                var date_range = `` + start_date + ` - ` + end_date + ``;

                arr[index] = {
                    "id": item.id,
                    "events": item.events,
                    "floormaps": {
                        "id": item.id_fmaps,
                        "floormaps": item.floormaps,
                        "code_maps": item.code_maps,
                        "full_name": item.floormaps + ` ( ` + item.code_maps + ` )`
                    },
                    "location": item.location,
                    "image": image_data,
                    "date_range": date_range,
                    "created_date": item.created_date=="0000-00-00 00:00:00"?item.created_date:fecha.format(item.created_date, 'YYYY-MM-DD HH:mm:ss'),
                    "modified_date": item.modified_date=="0000-00-00 00:00:00"?item.modified_date:fecha.format(item.modified_date, 'YYYY-MM-DD HH:mm:ss')
                };
                
            });

        	var items = {}; 
				items["data"] = datas;
                items["next_page"] = next;
                items["current_page"] = current;
                items["prev_page"] = prev;
                items["sum"] = sum_data;
                items["status"] = 200;
            resp.ok(items,res);
        }
    });
}

exports.byid = function(req,res,resp,conn,baseurl){
    var params = req.query;
    var table   = 'events';
    var current = params.page==null?1:parseInt(params.page);
    var per_page = params.per_page==null?10:parseInt(params.per_page);
    var url_admin = baseurl.url_admin;
    var id  = params.id==null?'':params.id;

    var page = (current-1)*(per_page>0?per_page:10);

    var where = `WHERE a.id LIKE '` + id + `'`;

    var limit = ` LIMIT ` + page + `,` + per_page + ` `;
    var main_qry = `SELECT 
        a.*, a.location,b.floormaps, b.id as id_fmaps, b.code_maps
        FROM 
        ` + table + ` a
        INNER JOIN floormaps b ON a.floor_codes = b.id
        ` + where + `
        ORDER BY id DESC
        ` + limit + `;`;

    conn.query(` ` + main_qry + `
        SELECT COUNT(*) as sum FROM ` + table + ` a
        INNER JOIN floormaps b ON a.floor_codes = b.id ` + where + ` limit 1;
        `, [1, 2],  function (error, rows, fields){
        if(error){
            console.log(error)
        } else{

            var sum_data = rows[1][0].sum;
            var total_page = Math.ceil(sum_data/per_page);
            var prev = current==1?1:(current-1);
            var next = total_page==current?total_page:(current+1);

            var loc_image_ori = url_admin + table;
            var loc_image_thm = url_admin + table + '/thumbs';
            
            var datas = rows[0];
            datas.forEach(function(item, index, arr){

                var i;
                var image_data = {};
                for (i = 0; i < image_type.length; i++) {
                    switch(image_type[i]){
                        case 'original':
                            var url = loc_image_ori + '/' + item.image;
                            image_data[image_type[i]] = url;
                        break;

                        default:
                            var url = loc_image_thm + '/' + image_type[i] + '/' + item.image;
                            image_data[image_type[i]] = url;
                        break;
                    }
                }

                var start_date = fecha.format(item.start_date,"D");
                var end_date   = fecha.format(item.end_date,"D MMM YYYY");

                var date_range = `` + start_date + ` - ` + end_date + ``;

                arr[index] = {
                    "id": item.id,
                    "events": item.events,
                    "floormaps": {
                        "id": item.id_fmaps,
                        "floormaps": item.floormaps,
                        "code_maps": item.code_maps,
                        "full_name": item.floormaps + ` ( ` + item.code_maps + ` )`
                    },
                    "location": item.location,
                    "start_date": fecha.format(item.start_date,"YYYY-MM-DD"),
                    "end_date": fecha.format(item.end_date,"YYYY-MM-DD"),
                    "image": image_data,
                    "created_date": item.created_date=="0000-00-00 00:00:00"?item.created_date:fecha.format(item.created_date, 'YYYY-MM-DD HH:mm:ss'),
                    "modified_date": item.modified_date=="0000-00-00 00:00:00"?item.modified_date:fecha.format(item.modified_date, 'YYYY-MM-DD HH:mm:ss')
                };
                
            });

            var items = {}; 
                items["data"] = datas[0];
                items["status"] = 200;
            resp.ok(items,res);
        }
    });
}

exports.add = function(req,res,resp,conn){
    var params = req.query;
    var inp = req.body
    var file = req.files
    var table = 'events';

    const auth = req.headers.authorization
    const datenow = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    const namefile = fecha.format(new Date(), 'YYYYMMDDHHmmss')

    conn.query(`SELECT a.* FROM superuser a INNER JOIN suauth b ON a.id=b.id_account where b.auth="`+ auth +`";`,  async function (error, rows, fields){
        if(rows.length>0){
            const huplauth = 'S4l4mhebat2020'
            const authimg = md5(base64encode(`${auth} ${huplauth} ${datenow} img`))
            
            var imgauth = {
                'auth': authimg
            }

            const headers = {
              'Content-Type': 'application/json; charset=utf-8',
              'Authorization': huplauth
            }

            const respimg = await axios.post('https://gmscode.net/auth', imgauth, {headers: headers});

            var post  = {};
                post["events"] = inp.events
                post["location"] = inp.location
                post["floor_codes"] = inp.floormaps
                post["image"] =  inp.image
                post["start_date"] = inp.start_date
                post["end_date"] = inp.end_date
                post["created_date"] = datenow

            conn.query(`INSERT INTO ` + table + ` SET ?`, post);
            
            var items = {};
                items["data"] = post;
                items["authimg"] = respimg.data.auth
                items["allowimg"] = Array(inp.image)
                items["status"] = 200;
            resp.ok(items,res);
        }else{
            var items = {}; 
                items["msg"] = "Access Denied!!"; 
                items["status"] = 200;
            resp.ok(items,res);
        }
    });
}

exports.edit = function(req,res,resp,conn){
    var params = req.query;
    var id  = params.id==null?'':params.id;
    var inp = req.body
    var file = req.files
    var table = 'events';
    var where = `WHERE id LIKE '${id}'`;

    const auth = req.headers.authorization
    const datenow = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    const namefile = fecha.format(new Date(), 'YYYYMMDDHHmmss')

    conn.query(`SELECT a.* FROM superuser a INNER JOIN suauth b ON a.id=b.id_account where b.auth="`+ auth +`";`,  async function (error, rows, fields){
        if(rows.length>0 && id!=null){
            const huplauth = 'S4l4mhebat2020'
            const authimg = md5(base64encode(`${auth} ${huplauth} ${datenow} img`))
            
            var imgauth = {
                'auth': authimg
            }

            const headers = {
              'Content-Type': 'application/json; charset=utf-8',
              'Authorization': huplauth
            }

            const respimg = await axios.post('https://gmscode.net/auth', imgauth, {headers: headers});
            
            var post  = {};
            var items = {};

                post["events"] = inp.events
                post["location"] = inp.location
                post["floor_codes"] = inp.floormaps
                post["start_date"] = inp.start_date
                post["end_date"] = inp.end_date
                post["modified_date"] = datenow
                if(inp.image!=null){
                    post["image"] =  inp.image
                    items["authimg"] = respimg.data.auth
                    items["allowimg"] = Array(inp.image)
                }

            conn.query(`UPDATE ${table} SET ? ${where}`, post);
            
                items["data"] = post;
                items["status"] = 200;
            resp.ok(items,res);
        }else{
                items["msg"] = "Access Denied!!"; 
                items["status"] = 200;
            resp.ok(items,res);
        }
    });
}

exports.del = function(req,res,resp,conn){
    var items = {}; 
    var params = req.query;
    var inp = req.body
    var table = 'events';

    const auth = req.headers.authorization
    const datenow = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    const namefile = fecha.format(new Date(), 'YYYYMMDDHHmmss')

    conn.query(`SELECT a.* FROM superuser a INNER JOIN suauth b ON a.id=b.id_account where b.auth="`+ auth +`";`,  async function (error, rows, fields){
        if(rows.length>0){
            conn.query(`DELETE FROM ${table} WHERE id=${inp.id}`);
                items["msg"] = "Delete Successfully!!"; 
                items["status"] = 200;
            resp.ok(items,res);
        }else{
                items["msg"] = "Access Denied!!"; 
                items["status"] = 200;
            resp.ok(items,res);
        }
    })
}