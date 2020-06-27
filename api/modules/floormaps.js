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

exports.lists = function(resp,conn,params,res){
    var table   = 'floormaps';
    var current = params.current;
    var per_page = params.per_page;
    var url_admin = params.url_admin;

    var page = (current-1)*(per_page>0?per_page:10);

    var limit = ` LIMIT ` + page + `,` + per_page;
    var main_qry = `SELECT 
        *
        FROM 
        ` + table + `
        ORDER BY order_floor DESC
        ` + limit + `;`;


    conn.query(` ` + main_qry + `
        SELECT COUNT(*) as sum FROM ` + table + ` limit 1;
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

                arr[index] = {
                    "id": item.id,
                    "floormaps": item.floormaps,
                    "code_maps" : item.code_maps,
                    "fullname"  : item.floormaps + ` ( ` + item.code_maps + ` ) `,
                    "image": image_data,
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
    var table   = 'floormaps';
    var current = params.page==null?1:parseInt(params.page);
    var per_page = params.per_page==null?10:parseInt(params.per_page);
    var url_admin = baseurl.url_admin;
    var id  = params.id==null?'':params.id;

    var page = (current-1)*(per_page>0?per_page:10);

    var where = `WHERE id LIKE '` + id + `'`;

    var limit = ` LIMIT ` + page + `,` + per_page;
    var main_qry = `SELECT * FROM 
        ` + table + `
        ${where}
        ORDER BY order_floor DESC
        ` + limit + `;`;

    conn.query(` ` + main_qry + `
        SELECT COUNT(*) as sum FROM ` + table + ` ${where} limit 1;
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

                arr[index] = {
                    "id": item.id,
                    "floormaps": item.floormaps,
                    "code_maps" : item.code_maps,
                    "fullname"  : item.floormaps + ` ( ` + item.code_maps + ` ) `,
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
    var items = {};
    var params = req.query;
    var inp = req.body
    var file = req.files
    var table = 'floormaps';

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
                post["floormaps"] = inp.floormaps
                post["code_maps"] = inp.code_maps
                post["image"] =  inp.image
                post["created_date"] = datenow

            conn.query(`INSERT INTO ${table} SET ?`, post);
            
                items["data"] = post;
                items["authimg"] = respimg.data.auth
                items["allowimg"] = Array(inp.image)
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
    var table = 'floormaps';
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
                post["floormaps"] = inp.floormaps
                post["code_maps"] = inp.code_maps
                post["created_date"] = datenow

                if(inp.type!=null){
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
    var table = 'floormaps';

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