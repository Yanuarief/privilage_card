const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const fecha = require('fecha');

exports.floormaps = function(req,res,resp,conn){
    var table   = 'floormaps';

    var params = req.query;
    var current = params.page==null?1:parseInt(params.page);
    var per_page = params.per_page==null?10:parseInt(params.per_page);
    var value = params.value==null?'':params.value;
    var id  = params.id==null?'':params.id;

    var page = (current-1)*(per_page>0?per_page:10);

    var where = ` WHERE CONCAT(floormaps, " ( ", code_maps, " ) ") LIKE '%${value}%' `
    var limit = ` LIMIT ` + page + `,` + per_page;
    var main_qry = `SELECT * FROM 
        ${table} ${where}
        ORDER BY order_floor DESC
        ` + limit + `;`;

    conn.query(` ${main_qry}
        SELECT COUNT(*) as sum FROM ${table} ${where} limit 1;
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
                    "text": entities.decode(entities.decode(item.floormaps + ` ( ` + item.code_maps + ` ) ` )),
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

exports.tenant = function(req,res,resp,conn){
    var table   = 'tenant';
    
    var params = req.query;
    var current = params.page==null?1:parseInt(params.page);
    var per_page = params.per_page==null?10:parseInt(params.per_page);
    var value = params.value==null?'':params.value;
    var id  = params.id==null?'':params.id;

    var page = (current-1)*(per_page>0?per_page:10);

    var where = ` WHERE tenant LIKE '%${value}%' `
    var limit = ` LIMIT ` + page + `,` + per_page;
    var main_qry = `SELECT * FROM 
        ${table} ${where}
        ORDER BY tenant ASC
        ` + limit + `;`;

    conn.query(` ${main_qry}
        SELECT COUNT(*) as sum FROM ${table} ${where} limit 1;
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
                    "text": entities.decode(entities.decode(item.tenant)),
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

exports.tenantcat = function(req,res,resp,conn){
    var table   = 'tenant_category';
    
    var params = req.query;
    var current = params.page==null?1:parseInt(params.page);
    var per_page = params.per_page==null?10:parseInt(params.per_page);
    var value = params.value==null?'':params.value;
    var id  = params.id==null?'':params.id;

    var page = (current-1)*(per_page>0?per_page:10);

    var where = ` WHERE name_category LIKE '%${value}%' `
    var limit = ` LIMIT ` + page + `,` + per_page;
    var main_qry = `SELECT * FROM 
        ${table} ${where}
        ORDER BY name_category ASC
        ` + limit + `;`;

    conn.query(` ${main_qry}
        SELECT COUNT(*) as sum FROM ${table} ${where} limit 1;
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
                    "text": entities.decode(entities.decode(item.name_category)),
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