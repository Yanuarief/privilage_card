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
const table = ['penjualan', 'pelanggan', 'tenant'];
const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mai', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
fecha.i18n['monthNames'] = monthNames;

exports.lists = function(resp, conn, params, res) {
    var current = params.current;
    var per_page = params.per_page;
    var url_admin = params.url_admin;
    var search = params.search;

    var page = (current - 1) * (per_page > 0 ? per_page : 10);

    var where = `   WHERE C.nama_lengkap_pelanggan LIKE '%${search}%' OR B.nama_tenant LIKE '%${search}%'`;

    var limit = ` LIMIT ${page},${per_page} `;

    var main_qry1 = `SELECT A.id_penjualan,
                            A.tanggal_penjualan,
                            FORMAT(A.nominal_penjualan, 0) AS nominal_penjualan,
                            A.pembayaran_via,
                            IFNULL(B.nama_tenant, '') AS nama_tenant,
                            C.nama_lengkap_pelanggan,
                            C.no_ktp_pelanggan,
                            C.no_hp_pelanggan
                        FROM ${table[0]} A
                        LEFT JOIN ${table[2]} B
                        ON A.id_tenant = B.id_tenant
                        LEFT JOIN ${table[1]} C
                        ON A.id_pelanggan = C.id_pelanggan
                        ${where}
                    ${limit};`;

    conn.query(` ${main_qry1}
                SELECT COUNT(*) as sum FROM ${table[0]} A
                LEFT JOIN ${table[2]} B
                ON A.id_tenant = B.id_tenant
                LEFT JOIN ${table[1]} C
                ON A.id_pelanggan = C.id_pelanggan
                ${where} limit 1;
        `, [1, 2], async function(error, rows, fields) {
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
                    "id": item.id_penjualan,
                    "tanggal": item.tanggal_penjualan == "0000-00-00 00:00:00" ? item.tanggal_penjualan : fecha.format(item.tanggal_penjualan, 'DD MMMM YYYY'),
                    "nominal": `Rp. ` + item.nominal_penjualan,
                    "metode": item.pembayaran_via,
                    "tenant": item.nama_tenant,
                    "member": item.nama_lengkap_pelanggan,
                    "ktp": item.no_ktp_pelanggan,
                    "hp": item.no_hp_pelanggan,

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

    var where = `WHERE A.id_bank = '${id}'`;

    var main_qry = `SELECT A.id_bank,
                    A.nama_bank,
                    B.id,
                    B.name,
                    B.status,
                    B.created_date,
                    B.modified_date
                    FROM ${table[0]} A
                    LEFT JOIN ${table[2]} B
                    ON A.id_bank = B.id_bank
                    AND B.status = 1
                    ${where};`;

    conn.query(` ${main_qry}`, function(error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            var datas = rows;
            var prod = []

            datas.forEach(function(item, index, arr) {

                prod.push(item.name)
                arr[index] = {
                    "id": item.id_bank,
                    "bank": item.nama_bank,
                    "produk": prod
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

            console.log(inp)

            // conn.query(`INSERT INTO ${table[0]} SET ?`, post1, async function(error, rows, fields) {

            //     for (var i = 0; i < longs; i++) {
            //         post2["name"] = inp.namaProduk[i]
            //         post2["id_bank"] = rows.insertId

            //         conn.query(`INSERT INTO ${table[2]} SET ?`, post2)
            //     }

            // });

            items["data"] = post1;
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
    var where = ` WHERE id_bank = '${id}' `;

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

            post1["nama_bank"] = `${inp.namaBank}`

            conn.query(`UPDATE ${table[2]} SET status = '0' ${where}; UPDATE ${table[0]} SET ? ${where};`, post1, async function(error, rows, fields) {
                var longs = inp.namaProduk.length
                for (var i = 0; i < longs; i++) {
                    post2["name"] = inp.namaProduk[i]
                    post2["id_bank"] = `${id}`

                    conn.query(`INSERT INTO ${table[2]} SET ?`, post2)
                }

            });

            items["data"] = inp;
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
            conn.query(`UPDATE ${table[0]} SET status = '0' WHERE id_bank = ${inp.id};
            UPDATE ${table[1]} SET status = '0' WHERE id_bank = ${inp.id};
            UPDATE ${table[2]} SET status = '0' WHERE id_bank = ${inp.id};`);
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

exports.listmember = function(req, res, resp, conn) {
    var current = req.query.page == null ? 1 : parseInt(req.query.page);
    var per_page = req.query.per_page == null ? 10 : parseInt(req.query.per_page);
    var search = req.query.value == null ? '' : req.query.value;
    var page = (current - 1) * (per_page > 0 ? per_page : 10);

    var where = `   WHERE nama_lengkap_pelanggan LIKE '${search}%' 
                    OR no_seri_barcode_pelanggan LIKE '${search}%'`;

    var limit = ` LIMIT ${page},${per_page} `;

    var main_qry = `SELECT id_pelanggan,
                    no_seri_barcode_pelanggan,
                    nama_lengkap_pelanggan,
                    no_ktp_pelanggan
                    FROM ${table[1]} 
                    ${where}
                    ORDER BY nama_lengkap_pelanggan
                    ${limit};`;

    conn.query(` ${main_qry} SELECT COUNT(*) as sum FROM ${table[1]}
    ${where} limit 1;`, [1, 2], async function(error, rows, fields) {
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
                    "id": item.id_pelanggan,
                    "text": item.nama_lengkap_pelanggan,
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

exports.listmemberbyid = function(req, res, resp, conn) {
    var search = req.query.member == null ? '' : req.query.member;
    var where = `   WHERE id_pelanggan = ${search}`;

    var main_qry = `SELECT id_pelanggan,
                    no_seri_barcode_pelanggan,
                    nama_lengkap_pelanggan,
                    no_ktp_pelanggan,
                    jumlah_point
                    FROM ${table[1]} 
                    ${where};`;

    conn.query(` ${main_qry}`, async function(error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            var datas = rows;

            datas.forEach(function(item, index, arr) {
                arr[index] = {
                    "id": item.id_pelanggan,
                    "ktp": item.no_ktp_pelanggan,
                    "point": item.jumlah_point,
                };

            });


            var items = {};
            items["data"] = datas;
            items["status"] = 200;
            resp.ok(items, res);
        }
    });
}

exports.listtenant = function(req, res, resp, conn) {
    var current = req.query.page == null ? 1 : parseInt(req.query.page);
    var per_page = req.query.per_page == null ? 10 : parseInt(req.query.per_page);
    var search = req.query.value == null ? '' : req.query.value;
    var page = (current - 1) * (per_page > 0 ? per_page : 10);

    var where = `   WHERE nama_tenant LIKE '${search}%'`;

    var limit = ` LIMIT ${page},${per_page} `;

    var main_qry = `SELECT id_tenant,
                    nama_tenant,
                    nama_pemilik
                    FROM ${table[2]} 
                    ${where}
                    ORDER BY nama_tenant
                    ${limit};`;

    conn.query(` ${main_qry} SELECT COUNT(*) as sum FROM ${table[2]}
    ${where} limit 1;`, [1, 2], async function(error, rows, fields) {
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
                    "text": item.nama_tenant,
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

exports.listtenantbyid = function(req, res, resp, conn) {
    var search = req.query.tenant == null ? '' : req.query.tenant;
    var where = `   WHERE id_tenant = ${search}`;

    var main_qry = `SELECT id_tenant,
                    nama_tenant,
                    nama_pemilik
                    FROM ${table[2]} 
                    ${where};`;

    conn.query(` ${main_qry}`, async function(error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            var datas = rows;

            datas.forEach(function(item, index, arr) {
                arr[index] = {
                    "id": item.id_tenant,
                    "pemilik": item.nama_pemilik,
                };

            });


            var items = {};
            items["data"] = datas;
            items["status"] = 200;
            resp.ok(items, res);
        }
    });
}