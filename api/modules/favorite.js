const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const fecha = require('fecha');

var image_type = [
    "original",
    "large",
    "medium",
    "small",
    "mini",
];

exports.favorite = function(req,res,resp,conn){
    var items = {};
    var table   = 'favorite';
    var cat = req.query.cat
    var iditem = req.query.id
    const auth = req.headers.authorization
    const datenow = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')

    conn.query(`SELECT * FROM riv_auth WHERE auth LIKE "`+ auth +`"`,  function (error, rows, fields){
        var authrow = rows[0]
        if(rows.length>0 && cat!=null && iditem!=null){
            conn.query(`SELECT * FROM riv_favorite WHERE id_account LIKE "` + authrow.id_account + `" AND id_items LIKE "` + iditem + `"`,  function (error, rows, fields){
                var favrow = rows[0]
                if(rows.length>0){
                    if(favrow.status!=null){
                        const status = favrow.status==0?1:0;
                        const text_stat = favrow.status==0?"Added to ":"Remove ";
                        conn.query(`UPDATE riv_favorite SET status="` + status + `", modified_date="` + datenow + `" WHERE id_account LIKE "` + authrow.id_account + `" AND table_name LIKE "` + cat + `" AND id_items LIKE "` + iditem + `";`);
                        items["active"] = status;
                        items["msg"] = text_stat + "favorite!";
                        items["status"] = 200;
                        resp.ok(items,res);
                    }
                }else{
                    conn.query(`INSERT INTO riv_favorite SET id_account="` + authrow.id_account + `", table_name="` + cat + `", id_items="` + iditem + `", status="1", created_date="` + datenow + `";`);
                    items["active"] = 1;
                    items["msg"] = "Added to favorite!";
                    items["status"] = 200;
                    resp.ok(items,res);
                }
            })
        }else{
            items["msg"] = "Access Denied, GTFO!";
            items["status"] = 200;
            resp.ok(items,res);
        }
    });
}

exports.lists = function(req,res,resp,conn,params){
    var items = {};
    var auth = req.headers.authorization
    
    conn.query(`SELECT * FROM riv_auth WHERE auth LIKE "`+ auth +`"`,  function (error, rows, fields){
        var authrow = rows[0]
        if(rows.length>0){
            const list_table = ['promo','events','tenant']
            const table_length = list_table.length
            
            var table   = 'favorite';
            var current = params.current;
            var per_page = params.per_page;
            var url_admin = params.url_admin;
            var search      = params.search;

            var page = (current-1)*(per_page>0?per_page:10);

            var limit = ` LIMIT ` + page + `,` + per_page;

            var where = ` WHERE riv_favorite.id_account="` + authrow.id_account + `"`

            var qr_build = ``;
            for(i=0;i<table_length;i++){

                const union = table_length==(i+1)?'':' UNION ALL '; 

                const stab = list_table[i];

                qr_build += ` ( SELECT
                    riv_favorite.id,
                    riv_` + stab + `.` + stab + ` AS title_name,
                    riv_` + stab + `.image AS image,
                    riv_` + stab + `.id AS id_items,
                    riv_favorite.table_name,
                    riv_favorite.id_account,
                    riv_favorite.created_date,
                    riv_favorite.modified_date
                FROM
                    riv_` + stab + `
                INNER JOIN riv_favorite ON riv_` + stab + `.id=riv_favorite.id_items 
                WHERE riv_favorite.id_account="` + authrow.id_account + `" AND riv_favorite.table_name LIKE "` + stab + `" ) ` + union
            }

            var main_qry = ` ` + qr_build + `
            ORDER BY created_date desc
            ` + limit + `;`;

            conn.query(` ` + main_qry + `
                SELECT COUNT(*) as sum FROM riv_` + table + ` ` + where + ` limit 1;
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

                        var i;
                        var image_data = {};
                        
                        var loc_image_ori = url_admin + item.table_name;
                        var loc_image_thm = url_admin + item.table_name + '/thumbs';
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
                            "id_items": item.id_items,
                            "image": image_data,
                            "title": item.title_name,
                            "category": item.table_name,
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
        }else{
            items["msg"] = "Access Denied, GTFO!";
            items["status"] = 200;
            resp.ok(items,res);
        }
    });
}