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
const table = ['tenant'];
const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mai', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
fecha.i18n['monthNames'] = monthNames;

exports.lists = function(resp, conn, params, res) {
    var current = params.current;
    var per_page = params.per_page;
    var url_admin = params.url_admin;
    var search = params.search;

    var page = (current - 1) * (per_page > 0 ? per_page : 10);

    var where = `   WHERE nama_tenant LIKE '%${search}%' `;

    var limit = ` LIMIT ${page},${per_page} `;
    var main_qry = `SELECT *
                    FROM ${table[0]} 
                    ${where}
                    ORDER BY nama_tenant
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

            var datas = rows[0];

            datas.forEach(function(item, index, arr) {

                arr[index] = {
                    "id": item.id_tenant,
                    "tenant": item.nama_tenant,
                    "telp": item.nomor_telp_pemilik == '' ? '-' : item.nomor_telp_pemilik,
                    "email": item.email_pemilik == '' ? '-' : item.email_pemilik,
                    // "created_date": item.created_date == "0000-00-00 00:00:00" ? item.created_date : fecha.format(item.created_date, 'YYYY-MM-DD HH:mm:ss'),
                    // "modified_date": item.modified_date == "0000-00-00 00:00:00" ? item.modified_date : fecha.format(item.modified_date, 'YYYY-MM-DD HH:mm:ss')
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

exports.byid = function(req, res, resp, conn, baseurl) {
    var params = req.query;
    var id = params.id == null ? '' : params.id;

    var where = `WHERE id_tenant = '${id}'`;
    var main_qry = `SELECT * FROM ${table[0]}
        ${where};`;

    conn.query(` ${main_qry}`, function(error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            var datas = rows;
            datas.forEach(function(item, index, arr) {
                arr[index] = {
                    "id": item.id_tenant,
                    "tenant": item.nama_tenant,
                    "pemilik": item.nama_pemilik == '' ? '-' : item.nama_pemilik,
                    "telp": item.nomor_telp_pemilik == '' ? '-' : item.nomor_telp_pemilik,
                    "email": item.email_pemilik == '' ? '-' : item.email_pemilik,
                };

            });

            var items = {};
            items["data"] = datas[0];
            items["status"] = 200;
            resp.ok(items, res);
        }
    });
}

exports.add = function(req, res, resp, conn) {
    var items = {};
    var params = req.query;
    var inp = req.body
    var file = req.files

    const auth = req.headers.authorization
    const datenow = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    const namefile = fecha.format(new Date(), 'YYYYMMDDHHmmss')

    conn.query(`SELECT a.* FROM riv_superuser a INNER JOIN riv_suauth b ON a.id=b.id_account where b.auth="` + auth + `";`, async function(error, rows, fields) {
        if (rows.length > 0) {
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
            post["nama_tenant"] = `${inp.namaTenant}`
            post["nama_pemilik"] = `${inp.namaPemilik}`
            post["email_pemilik"] = `${inp.alamatEmail}`
            post["nomor_telp_pemilik"] = `${inp.noTelepon}`

            conn.query(`INSERT INTO ${table[0]} SET ?`, post);

            items["data"] = post;
            items["authimg"] = respimg.data.auth
            items["allowimg"] = Array(inp.image)
            items["status"] = 200;
            resp.ok(items, res);
        } else {
            items["msg"] = "Access Denied!!";
            items["status"] = 200;
            resp.ok(items, res);
        }
    });
}

exports.edit = function(req, res, resp, conn) {
    var params = req.query;
    var id = params.id == null ? '' : params.id;
    var inp = req.body
    var where = ` WHERE id_tenant = '${id}' `;

    const auth = req.headers.authorization
    const datenow = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    const namefile = fecha.format(new Date(), 'YYYYMMDDHHmmss')

    conn.query(`SELECT a.* FROM riv_superuser a INNER JOIN riv_suauth b ON a.id=b.id_account where b.auth="` + auth + `";`, async function(error, rows, fields) {
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

            post["nama_tenant"] = `${inp.namaTenant}`
            post["nama_pemilik"] = `${inp.namaPemilik}`
            post["email_pemilik"] = `${inp.alamatEmail}`
            post["nomor_telp_pemilik"] = `${inp.noTelepon}`

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

    conn.query(`SELECT a.* FROM riv_superuser a INNER JOIN riv_suauth b ON a.id=b.id_account where b.auth="` + auth + `";`, async function(error, rows, fields) {
        if (rows.length > 0) {
            conn.query(`DELETE FROM ${table[0]} WHERE id_tenant = ${inp.id}`);
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