const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const fecha = require('fecha');
const nl2br  = require('nl2br');
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
    var table   = 'aboutus';
    var current = params.current;
    var per_page = params.per_page;
    var url_admin = params.url_admin;

    var page = (current-1)*(per_page>0?per_page:10);

    var limit = ` LIMIT ` + page + `,` + per_page;
    var main_qry = `SELECT 
        *
        FROM 
        riv_` + table + ` 
        ORDER BY id ASC
        ` + limit + `;`;


    conn.query(` ` + main_qry + `
        SELECT COUNT(*) as sum FROM riv_` + table + ` limit 1;
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
                    "image": image_data,
                    "title": item.title,
                    "description": nl2br(item.description),
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
    var table   = 'aboutus';
    var current = params.page==null?1:parseInt(params.page);
    var per_page = params.per_page==null?10:parseInt(params.per_page);
    var url_admin = baseurl.url_admin;
    var id  = params.id==null?'':params.id;

    var page = (current-1)*(per_page>0?per_page:10);

    var where = `WHERE id LIKE '` + id + `'`;

    var limit = ` LIMIT ` + page + `,` + per_page + ` `;

    var main_qry = `SELECT 
        *
        FROM 
        riv_${table}
        ${where}
        ORDER BY id ASC
        ${limit};`;

    conn.query(` ${main_qry}
        SELECT COUNT(*) as sum FROM riv_${table} ${where} limit 1;
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
                    "image": image_data,
                    "title": item.title,
                    "description": item.description,
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

/*exports.add = function(req,res,resp,conn){
    var items = {};
    var params = req.query;
    var inp = req.body
    var file = req.files
    var table = 'promo';

    const auth = req.headers.authorization
    const datenow = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    const namefile = fecha.format(new Date(), 'YYYYMMDDHHmmss')

    conn.query(`SELECT a.* FROM riv_superuser a INNER JOIN riv_suauth b ON a.id=b.id_account where b.auth="`+ auth +`";`,  async function (error, rows, fields){
        if(rows.length>0){
            const huplauth = 'S4l4mhebat2020'
            const authupl = md5(base64encode(`${auth} ${huplauth} ${datenow}`))
            
            var uplauth = {
                'auth': authupl
            }

            const headers = {
              'Content-Type': 'application/json; charset=utf-8',
              'Authorization': huplauth
            }

            const response = await axios.post('https://gmscode.net/auth', uplauth, {headers: headers});

            conn.query(`SELECT * FROM riv_tenant where id="`+ inp.tenant +`";`,  async function (error, rows, fields){

                    var post  = {};
                        post["promo"] = entities.encodeNonUTF(inp.promo)
                        post["tenant"] = inp.tenant
                        post["location"] = rows[0].location
                        post["image"] =  `${namefile}.${inp.type}`
                        post["start_date"] = inp.start_date
                        post["end_date"] = inp.end_date
                        post["created_date"] = datenow

                    conn.query(`INSERT INTO riv_${table} SET ?`, post);
                    
                        items["data"] = post;
                        items["authupl"] = response.data.auth
                        items["status"] = 200;
                    resp.ok(items,res);
            })
        }else{
                items["msg"] = "Access Denied!!"; 
                items["status"] = 200;
            resp.ok(items,res);
        }
    });
}*/

exports.edit = function(req,res,resp,conn){
    var items = {};
    var params = req.query;
    var id  = params.id==null?'':params.id;
    var inp = req.body
    var file = req.files
    var table = 'aboutus';
    var where = `WHERE id LIKE '${id}'`;

    const auth = req.headers.authorization
    const datenow = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    const namefile = fecha.format(new Date(), 'YYYYMMDDHHmmss')

    conn.query(`SELECT a.* FROM riv_superuser a INNER JOIN riv_suauth b ON a.id=b.id_account where b.auth="`+ auth +`";`,  async function (error, rows, fields){
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
                post["title"] = inp.title
                post["description"] = inp.description
                post["modified_date"] = datenow

                if(inp.image!=null){
                    post["image"] =  inp.image
                    items["authimg"] = respimg.data.auth
                    items["allowimg"] = Array(inp.image)
                }
            conn.query(`UPDATE riv_${table} SET ? ${where}`, post);
            
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

/*exports.del = function(req,res,resp,conn){
    var items = {}; 
    var params = req.query;
    var inp = req.body
    var table = 'promo';

    const auth = req.headers.authorization
    const datenow = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    const namefile = fecha.format(new Date(), 'YYYYMMDDHHmmss')

    conn.query(`SELECT a.* FROM riv_superuser a INNER JOIN riv_suauth b ON a.id=b.id_account where b.auth="`+ auth +`";`,  async function (error, rows, fields){
        if(rows.length>0){
            conn.query(`DELETE FROM riv_${table} WHERE id=${inp.id}`);
                items["msg"] = "Delete Successfully!!"; 
                items["status"] = 200;
            resp.ok(items,res);
        }else{
                items["msg"] = "Access Denied!!"; 
                items["status"] = 200;
            resp.ok(items,res);
        }
    })
}*/