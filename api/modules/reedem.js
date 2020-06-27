const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const fecha = require('fecha');
const axios = require('axios');
const { base64encode, base64decode } = require('nodejs-base64');
const md5 = require('md5');
const con = require('../conn');

var image_type = [
    "original",
    "large",
    "medium",
    "small",
    "mini",
];
const table = ['pelanggan', 'souvenir'];
const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mai', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
fecha.i18n['monthNames'] = monthNames;

exports.lists = function(resp, conn, params, res) {
    var current = params.current;
    var per_page = params.per_page;
    var url_admin = params.url_admin;
    var search = params.search;

    var page = (current - 1) * (per_page > 0 ? per_page : 10);

    var where = `   WHERE nama_lengkap_pelanggan LIKE '%${search}%' OR no_seri_barcode_pelanggan LIKE '%${search}%'`;

    var limit = ` LIMIT ${page},${per_page} `;

    var main_qry1 = `SELECT id_pelanggan, 
                            nama_lengkap_pelanggan,
                            no_seri_barcode_pelanggan,
                            jumlah_point
                        FROM ${table[0]}
                        ${where}
                        ORDER BY nama_lengkap_pelanggan
                    ${limit};`;

    conn.query(` ${main_qry1}
                SELECT COUNT(*) as sum FROM ${table[0]}
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
                    "id": item.id_pelanggan,
                    "member": item.nama_lengkap_pelanggan,
                    "barcode": item.no_seri_barcode_pelanggan.toUpperCase(),
                    "points": item.jumlah_point,
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

    var where = `   WHERE id_pelanggan = '${id}'`;

    var main_qry = `SELECT id_pelanggan, 
                            nama_lengkap_pelanggan,
                            no_seri_barcode_pelanggan,
                            jumlah_point
                        FROM ${table[0]}
                        ${where};`;

    conn.query(` ${main_qry}`, function(error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            var datas = rows;
            datas.forEach(function(item, index, arr) {
                arr[index] = {
                    "id": item.id_pelanggan,
                    "member": item.nama_lengkap_pelanggan,
                    "barcode": item.no_seri_barcode_pelanggan.toUpperCase(),
                    "points": item.jumlah_point,
                };
            })
            var items = {};
            items["data"] = datas[0];
            items["status"] = 200;
            resp.ok(items, res);
        }
    });
}

exports.reedemitem = function(resp, conn, params, res, req) {
    var current = params.current;
    var per_page = params.per_page;
    var url_admin = params.url_admin;
    var search = params.search;

    var page = (current - 1) * (per_page > 0 ? per_page : 10);
    var thisinp = req.query.val == undefined ? `` : req.query.val
    var inp = thisinp.split(/\,/g)
    var min = inp[2] == null ? '0' : inp[2]
    var max = inp[3] == null ? '0' : inp[3]

    var page = (current - 1) * (per_page > 0 ? per_page : 10);

    var where2 = min && max == 0 ? `` : ` AND poin BETWEEN ${min} AND ${max}`
    var where = `WHERE status = '1' ${where2}`;

    var limit = ` LIMIT ${page},${per_page} `;

    var main_qry = `SELECT *
                        FROM ${table[1]}
                        ${where}
                        ORDER BY nama_souvenir
                    ${limit};`;

    conn.query(` ${main_qry}
                SELECT COUNT(*) as sum FROM ${table[1]} ${where} limit 1;
        `, [1, 2], async function(error, rows, fields) {
        if (error) {
            console.log(error)
        } else {

            var sum_data = rows[1][0].sum;

            var total_page = Math.ceil(sum_data / per_page);
            var prev = current == 1 ? 1 : (current - 1);
            var next = total_page == current ? total_page : (current + 1);
            var datas = rows[0];

            var loc_image_ori = url_admin + table[1];
            var loc_image_thm = url_admin + table[1] + '/thumbs';

            datas.forEach(function(item, index, arr) {
                var i;
                var image_data = {};
                for (i = 0; i < image_type.length; i++) {
                    switch (image_type[i]) {
                        case 'original':
                            var url = loc_image_ori + '/' + item.foto;
                            image_data[image_type[i]] = url;
                            break;

                        default:
                            var url = loc_image_thm + '/' + image_type[i] + '/' + item.foto;
                            image_data[image_type[i]] = url;
                            break;
                    }
                }

                arr[index] = {
                    "id": item.id_souvenir,
                    "produk": item.nama_souvenir,
                    "point": item.poin,
                    "harga": item.harga,
                    "stok": item.stok,
                    "keterangan": item.keterangan,
                    "image": image_data
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

exports.edit = function(req, res, resp, conn) {
    var inp = req.body

    const auth = req.headers.authorization
    const datenow = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    const namefile = fecha.format(new Date(), 'YYYYMMDDHHmmss')

    conn.query(`SELECT a.* FROM superuser a INNER JOIN suauth b ON a.id=b.id_account where b.auth="` + auth + `";`, async function(error, rows, fields) {
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
            var items = {};

            var query1 = `SELECT * FROM ${table[0]} WHERE id_pelanggan = '${inp.idmember}';`
            var query2 = `SELECT * FROM ${table[1]} WHERE id_souvenir = '${inp.id}';`

            conn.query(`${query1} ${query2}`, [1, 2], async function(error, rows, fields) {
                var pointmember = rows[0][0].jumlah_point
                var pointproduk = rows[1][0].poin
                var stokproduk = rows[1][0].stok
                var data = ``

                if (stokproduk < 0) {
                    data = 'Tidak Ada Stok Barang';
                } else if ((pointmember - pointproduk) < pointproduk) {
                    data = 'Point Tidak Cukup';
                } else {
                    var pointEnd = pointmember - pointproduk
                    var stokEnd = stokproduk - 1
                    var query3 = `UPDATE ${table[0]} SET jumlah_point = '${pointEnd}' WHERE id_pelanggan = '${inp.idmember}';`
                    var query4 = `UPDATE ${table[1]} SET stok = '${stokEnd}' WHERE id_souvenir = '${inp.id}';`

                    data = new Promise((resolve, reject) => {
                        conn.query(`${query3} ${query4}`, [1, 2], async function(error1, rows1, fields) {
                            if (rows1 != "undefined") {
                                resolve('Berhasil Menukarkan Point')
                            } else {
                                resolve(error1)
                            }
                        })

                    })
                    data = await data;
                }

                items["data"] = data
                items["status"] = 200;
                resp.ok(items, res);
            });


        } else {
            items["msg"] = "Access Denied!!";
            items["status"] = 200;
            resp.ok(items, res);
        }
    });
}