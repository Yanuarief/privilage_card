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
const table = ['news'];
const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mai', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
fecha.i18n['monthNames'] = monthNames;

exports.lists = function(req, res, resp, conn, opt = {}) {
    var params = req.query;
    var current = params.page == null ? 1 : parseInt(params.page);
    var per_page = params.per_page == null ? 10 : parseInt(params.per_page);
    var search = params.search == null ? '' : params.search;
    var val = params.val == null ? '' : params.val;
    var url_admin = opt.url_admin
    var page = (current - 1) * (per_page > 0 ? per_page : 10);

    var where = search != '' ? `   WHERE 1 AND tittle LIKE '%${val}%'` : `   WHERE 1`;

    var limit = ` LIMIT ${page},${per_page} `;
    var main_qry = `SELECT id,
                    tittle,
                    SUBSTRING(deskripsi, 1, 20) AS deskripsi,
                    image,
                    status,
                    created_date,
                    modified_date
                    FROM ${table[0]}
                    ${where}
                    ORDER BY modified_date DESC
                    ${limit};`;

    conn.query(` ${main_qry}
        SELECT COUNT(*) as sum FROM ${table[0]} ${where} limit 1;
        `, [1, 2], function(error, rows, fields) {
        if (error) {
            console.log(error)
        } else {

            var sum_data = rows[1][0].sum;
            var total_page = Math.ceil(sum_data / per_page);
            var prev = current == 1 ? 1 : (current - 1);
            var next = total_page == current ? total_page : (current + 1);

            var loc_image_ori = url_admin + table;
            var loc_image_thm = url_admin + table + '/thumbs';

            var datas = rows[0];

            datas.forEach(function(item, index, arr) {
                var i;
                var image_data = {};
                for (i = 0; i < image_type.length; i++) {
                    switch (image_type[i]) {
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
                    "Tittle": item.tittle,
                    "Deskripsi": item.deskripsi,
                    "Image": image_data,
                    "status": item.status == 1 ? 'Active' : 'Not Active',
                    "created_date": item.created_date == "0000-00-00 00:00:00" ? item.created_date : fecha.format(item.created_date, 'DD-MMMM-YYYY HH:mm:ss'),
                    "modified_date": item.modified_date == "0000-00-00 00:00:00" ? item.modified_date : fecha.format(item.modified_date, 'DD-MMMM-YYYY HH:mm:ss')
                };

            });

            var items = {};
            items["data"] = datas;
            items["next_page"] = next;
            items["current_page"] = current;
            items["prev_page"] = prev;
            items["sum"] = sum_data;
            items["status"] = 200;
            resp.ok(items, res);
        }
    });
}


exports.add = function(req, res, resp, conn) {
    var items = {};
    var inp = req.body
    var file = req.files
    console.log(inp);

    const auth = req.headers.authorization
    const datenow = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    const namefile = fecha.format(new Date(), 'YYYYMMDDHHmmss')

    conn.query(`SELECT a.* FROM superuser a INNER JOIN suauth b ON a.id=b.id_account where b.auth="` + auth + `";`, async function(error, rows, fields) {
        if (rows.length > 0) {
            const huplauth = 'S4l4mhebat2020'
            const authimg = md5(base64encode(`${auth} ${huplauth} ${datenow} img`))
            const authfile = md5(base64encode(`${auth} ${huplauth} ${datenow} file`))

            var imgauth = {
                'auth': authimg
            }

            var fileauth = {
                'auth': authfile
            }

            const headers = {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': huplauth
            }

            const respimg = await axios.post('https://gmscode.net/auth', imgauth, { headers: headers });
            const respfile = await axios.post('https://gmscode.net/auth', fileauth, { headers: headers });

            var post = {};
            post["deskripsi"] = inp.description
            post["image"] = `${inp.image}`
            post["tittle"] = `${inp.tittle}`
            post["created_date"] = datenow
            conn.query(`INSERT INTO ${table[0]} SET ?`, post);

            items["data"] = post;
            items["authimg"] = respimg.data.auth
            items["allowimg"] = Array(inp.image)
            items["authfile"] = respfile.data.auth
            items["allowfile"] = Array(inp.filemag)
            items["status"] = 200;
            resp.ok(items, res);
        } else {
            items["msg"] = "Access Denied!!";
            items["status"] = 200;
            resp.ok(items, res);
        }
    });
}

exports.byid = function(req, res, resp, conn, baseurl) {
    var params = req.query;
    var id = params.id == null ? '' : params.id;
    var url_admin = baseurl.url_admin;
    var where = `   WHERE id LIKE '%${id}%'`;
    var main_qry = `SELECT *
                    FROM ${table[0]}
                    ${where};`;

    conn.query(` ${main_qry}`, function(error, rows, fields) {
        if (error) {
            console.log(error)
        } else {

            var loc_image_ori = url_admin + table;
            var loc_image_thm = url_admin + table + '/thumbs';

            var datas = rows;

            datas.forEach(function(item, index, arr) {
                var i;
                var image_data = {};
                for (i = 0; i < image_type.length; i++) {
                    switch (image_type[i]) {
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
                    "tittle": item.tittle,
                    "deskripsi": item.deskripsi,
                    "image": image_data,
                    "status": item.status,
                    "created_date": item.created_date == "0000-00-00 00:00:00" ? item.created_date : fecha.format(item.created_date, 'DD-MMMM-YYYY HH:mm:ss'),
                    "modified_date": item.modified_date == "0000-00-00 00:00:00" ? item.modified_date : fecha.format(item.modified_date, 'DD-MMMM-YYYY HH:mm:ss')
                };

            });

            var items = {};
            items["data"] = datas[0];
            items["status"] = 200;
            resp.ok(items, res);
        }
    });
}

exports.edit = function(req, res, resp, conn) {
    var params = req.query;
    var id = params.id == null ? '' : params.id;
    var inp = req.body
    var where = ` WHERE id LIKE '${id}' `;

    const auth = req.headers.authorization
    const datenow = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    const namefile = fecha.format(new Date(), 'YYYYMMDDHHmmss')

    conn.query(`SELECT a.* FROM superuser a INNER JOIN suauth b ON a.id=b.id_account where b.auth="` + auth + `";`, async function(error, rows, fields) {
        if (rows.length > 0 && id != null) {
            const huplauth = 'S4l4mhebat2020'
            const authimg = md5(base64encode(`${auth} ${huplauth} ${datenow} img`))

            var imgauth = {
                'auth': authimg
            }

            const headers = {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': huplauth
            }

            const respimg = await axios.post('https://gmscode.net/auth', imgauth, { headers: headers });

            var post = {};
            var items = {};

            post["deskripsi"] = inp.description
            post["tittle"] = inp.tittle
            inp.active == '' ? post["status"] = 0 : post["status"] = 1
            post["modified_date"] = datenow
            if (inp.image != null) {
                post["image"] = inp.image
                items["authimg"] = respimg.data.auth
                items["allowimg"] = Array(inp.image)
            }

            conn.query(`UPDATE ${table[0]} SET ? ${where}`, post);

            items["data"] = post;
            items["status"] = 200;
            resp.ok(items, res);
        } else {
            items["msg"] = "Access Denied!!";
            items["status"] = 200;
            resp.ok(items, res);
        }
    });
}

exports.del = function(req, res, resp, conn) {
    var items = {};
    var inp = req.body

    const auth = req.headers.authorization

    conn.query(`SELECT a.* FROM superuser a INNER JOIN suauth b ON a.id=b.id_account where b.auth="` + auth + `";`, async function(error, rows, fields) {
        if (rows.length > 0) {
            conn.query(`DELETE FROM ${table[0]} WHERE id = ${inp.id}`);
            items["msg"] = "Delete Successfully!!";
            items["status"] = 200;
            resp.ok(items, res);
        } else {
            items["msg"] = "Access Denied!!";
            items["status"] = 200;
            resp.ok(items, res);
        }
    })
}