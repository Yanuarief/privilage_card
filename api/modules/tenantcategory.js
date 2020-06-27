const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const fecha = require('fecha');
const axios = require('axios');
const { base64encode, base64decode } = require('nodejs-base64');
const md5 = require('md5');

exports.lists = function(req, res, resp, conn, opt = {}){
    var table   = 'tenant_category';
    var params = req.query;
    var current = params.page == null ? 1 : parseInt(params.page);
    var per_page = params.per_page == null ? 10 : parseInt(params.per_page);
    var search = params.search == null ? '' : params.search;
    var val = params.val == null ? '' : params.val;
    var url_admin = opt.url_admin

    var spsrc = search.split(",");
    var spval = val.split(",");
    var setsrch = ``;
    if(search!=''){
        var lfld = spsrc.length-1
        spsrc.forEach(function(v,k){
            var cval = spval[k];
            var cond = lfld==k?``:`AND `
            switch(v){
                case 'tenantcat':
                    setsrch += `name_category LIKE '%${cval}%' ${cond}`;
                break;
            }
        });
    }

    var qry = setsrch!=``?`AND (${setsrch})`:``;

    var page = (current - 1) * (per_page > 0 ? per_page : 10);

    var where = ` WHERE 1 ${qry} `;

    var limit = ` LIMIT ${page},${per_page} `;

    var body_qry = ` ${table} `

    var main_qry = `SELECT 
        *
        FROM 
        ${body_qry}
        ${where}
        ORDER BY name_category ASC
        ${limit};`;


    conn.query(` ${main_qry}
        SELECT COUNT(*) as sum FROM ${body_qry} ${where} limit 1;
        `, [1, 2],  function (error, rows, fields){
        if(error){
            console.log(error)
        } else{

            var sum_data = rows[1][0].sum;
            var total_page = Math.ceil(sum_data/per_page);
            var prev = current==1?1:(current-1);
            var next = total_page==current?total_page:(current+1);
            
            var datas = rows[0];
            datas.forEach(function(item, index, arr){

                arr[index] = {
                    "id": item.id,
                    "category": item.name_category,
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
    var table   = 'tenant_category';
    var current = params.page==null?1:parseInt(params.page);
    var per_page = params.per_page==null?10:parseInt(params.per_page);
    var url_admin = baseurl.url_admin;
    var id  = params.id==null?'':params.id;

    var page = (current-1)*(per_page>0?per_page:10);

    var where = `WHERE id LIKE '` + id + `'`;

    var limit = ` LIMIT ${page}, ${per_page} `;
    var main_qry = `SELECT * FROM 
        ${table}
        ${where}
        ORDER BY name_category ASC
        ${limit};`;

    conn.query(` ${main_qry}
        SELECT COUNT(*) as sum FROM ${table}
        ${where} limit 1;
        `, [1, 2],  function (error, rows, fields){
        if(error){
            console.log(error)
        } else{

            var sum_data = rows[1][0].sum;
            var total_page = Math.ceil(sum_data/per_page);
            var prev = current==1?1:(current-1);
            var next = total_page==current?total_page:(current+1);
            
            var datas = rows[0];
            datas.forEach(function(item, index, arr){

                arr[index] = {
                    "id": item.id,
                    "category": item.name_category,
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
    var items = {};
    var params = req.query;
    var inp = req.body
    var file = req.files
    var table = 'tenant_category';

    const auth = req.headers.authorization
    const datenow = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    const namefile = fecha.format(new Date(), 'YYYYMMDDHHmmss')

    conn.query(`SELECT a.* FROM superuser a INNER JOIN suauth b ON a.id=b.id_account where b.auth="`+ auth +`";`,  async function (error, rows, fields){
        if(rows.length>0){

            var post  = {};
                post["name_category"] = entities.encodeNonUTF(inp.tenantcat)
                post["created_date"] = datenow

            conn.query(`INSERT INTO ${table} SET ?`, post);
            
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

exports.edit = function(req,res,resp,conn){
    var items = {};
    var params = req.query;
    var id  = params.id==null?'':params.id;
    var inp = req.body
    var file = req.files
    var table = 'tenant_category';
    var where = `WHERE id LIKE '${id}'`;

    const auth = req.headers.authorization
    const datenow = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    const namefile = fecha.format(new Date(), 'YYYYMMDDHHmmss')

    conn.query(`SELECT a.* FROM superuser a INNER JOIN suauth b ON a.id=b.id_account where b.auth="`+ auth +`";`,  async function (error, rows, fields){
        if(rows.length>0 && id!=null){

            var post  = {};
                post["name_category"] = entities.encodeNonUTF(inp.tenantcat)
                post["created_date"] = datenow

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
    var table = 'tenant_category';

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