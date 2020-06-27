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
const table = ['point_setting'];
const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mai', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
fecha.i18n['monthNames'] = monthNames;

exports.get = function(req, res, resp, conn) {
    var main_qry = `SELECT *
                    FROM ${table[0]} ;`;

    conn.query(` ${main_qry}`, function(error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            var datas = rows;
            var objData = {}

            datas.forEach(function(item, index, arr) {
                objData[item.jenis_point] = {
                    "id": item.id_point_setting,
                    "jenis": item.jenis_point,
                    "kelipatan_nominal": item.kelipatan_nominal,
                    "jumlah_point": item.jumlah_point

                    // "created_date": item.created_date == "0000-00-00 00:00:00" ? item.created_date : fecha.format(item.created_date, 'YYYY-MM-DD HH:mm:ss'),
                    // "modified_date": item.modified_date == "0000-00-00 00:00:00" ? item.modified_date : fecha.format(item.modified_date, 'YYYY-MM-DD HH:mm:ss')
                };

            });

            var items = {};
            items["data"] = objData;
            items["status"] = 200;
            resp.ok(items, res);
        }
    });
}

exports.post = function(req, res, resp, conn) {
    var params = req.query;
    var id = params.id == null ? '' : params.id;
    var inp = req.body
    var where1 = ` WHERE jenis_point = 'bank' `;
    var where2 = ` WHERE jenis_point = 'cash' `;

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
            var items = {};
            var post1 = {};
            var post2 = {};

            post1["kelipatan_nominal"] = `${inp.kelipantanNominalEtc}`
            post1["jumlah_point"] = `${inp.jmlPointEtc}`

            post2["kelipatan_nominal"] = `${inp.kelipantanNominalCash}`
            post2["jumlah_point"] = `${inp.jmlPointCash}`

            conn.query(`UPDATE ${table[0]} SET ? ${where1};`, post1)
            conn.query(`UPDATE ${table[0]} SET ? ${where2};`, post2)


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

exports.getsetpoint = function(req, res, resp, conn) {
    var search = req.query.search == null ? '' : req.query.search;
    var where = `   WHERE jenis_point = '${search}'`;

    var main_qry = `SELECT *
                    FROM ${table[0]} 
                    ${where};`;

    conn.query(` ${main_qry}`, async function(error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            var datas = rows;

            datas.forEach(function(item, index, arr) {
                arr[index] = {
                    "id": item.id_point_setting,
                    "kelipatan": item.kelipatan_nominal,
                    "point": item.jumlah_point
                };

            });


            var items = {};
            items["data"] = datas;
            items["status"] = 200;
            resp.ok(items, res);
        }
    });
}