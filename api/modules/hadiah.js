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
const table = ['hadiah', 'paket'];
const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mai', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
fecha.i18n['monthNames'] = monthNames;

exports.lists = function(resp, conn, params, res) {
    var current = params.current;
    var per_page = params.per_page;
    var url_admin = params.url_admin;
    var search = params.search;

    var page = (current - 1) * (per_page > 0 ? per_page : 10);

    var where = `   WHERE nama_paket LIKE '%${search}%' `;

    var limit = ` LIMIT ${page},${per_page} `;
    var main_qry = `SELECT *
                    FROM ${table[1]} 
                    ${where}
                    ORDER BY id_paket
                    ${limit};`;

    conn.query(` ${main_qry}
        SELECT COUNT(*) as sum FROM ${table[1]} ${where} limit 1;
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
                    "id": item.id_paket,
                    "paket": item.nama_paket,

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
    var url_admin = baseurl.url_admin

    var where = `WHERE B.id_paket = '${id}'`;
    var main_qry = `SELECT * 
                    FROM ${table[0]} A
                    LEFT JOIN ${table[1]} B
                    ON A.id_paket = B.id_paket
        ${where};`;

    conn.query(` ${main_qry}`, function(error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            var datas = rows;
            var id_hadiah = []
            var nama = []
            var urutan = []
            var stock = []
            var terpakai = [];

            datas.forEach(function(item, index, arr) {
                id_hadiah.push(item.id_hadiah)
                nama.push(item.nama_hadiah)
                urutan.push(item.urutan)
                stock.push(item.qty)
                terpakai.push(item.terpakai)

                arr[index] = {
                    "id_hadiah": id_hadiah,
                    "id_paket": item.id_paket,
                    "paket": item.nama_paket,
                    "nama": nama,
                    "urutan": urutan,
                    "stock": stock,
                    "terpakai": terpakai,

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

            var post1 = {};
            var post2 = {};

            post1["nama_paket"] = `${inp.namaPaket}`

            conn.query(`INSERT INTO ${table[1]} SET ?`, post1, async function(error, rows, fields) {
                var longs = inp.namaHadiah.length

                for (var i = 0; i < longs; i++) {
                    post2["nama_hadiah"] = inp.namaHadiah[i]
                    post2["urutan"] = inp.urutan[i]
                    post2["qty"] = inp.jumlah[i]
                    post2["id_paket"] = rows.insertId
                    post2["terpakai"] = 0

                    conn.query(`INSERT INTO ${table[0]} SET ?`, post2)
                }

            });

            items["data"] = inp;
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
    var where = ` WHERE id_paket = '${id}' `;

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
            var items = {};
            var post1 = {};
            var post2 = {};

            post1["nama_paket"] = `${inp.namaPaket}`

            conn.query(`DELETE FROM ${table[0]} ${where}; UPDATE ${table[1]} SET ? ${where};`, post1, async function(error, rows, fields) {

                var longs = inp.namaHadiah.length

                for (var i = 0; i < longs; i++) {
                    post2["nama_hadiah"] = inp.namaHadiah[i]
                    post2["urutan"] = inp.urutan[i]
                    post2["qty"] = inp.jumlah[i]
                    post2["id_paket"] = `${id}`
                    post2["terpakai"] = 0

                    conn.query(`INSERT INTO ${table[0]} SET ?`, post2)
                }


            });

            items["data"] = post1;
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
            conn.query(`DELETE FROM ${table[0]} WHERE id_paket = ${inp.id};
            DELETE FROM ${table[1]} WHERE id_paket = ${inp.id};`);
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