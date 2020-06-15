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

exports.lists = function(resp,conn,params,res){
    var table   = 'career';
    var current = params.current;
    var per_page = params.per_page;
    var url_admin = params.url_admin;

    var page = (current-1)*(per_page>0?per_page:10);

    var limit = ` LIMIT ` + page + `,` + per_page;
    var main_qry = `SELECT 
        *
        FROM 
        riv_` + table + ` 
        ORDER BY id DESC
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
                    "title": entities.decode(entities.decode(item.title)),
                    "description": entities.decode(entities.decode(item.description)),
                    "published_date": fecha.format(item.created_date, 'D - MMM - YYYY'),
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