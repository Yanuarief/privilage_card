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
const table = ['pelanggan', 'point'];
const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mai', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
fecha.i18n['monthNames'] = monthNames;

exports.lists = function(resp, conn, params, res) {
    var current = params.current;
    var per_page = params.per_page;
    var url_admin = params.url_admin;
    var search = params.search;

    var page = (current - 1) * (per_page > 0 ? per_page : 10);

    var where = `   WHERE nama_lengkap_pelanggan LIKE '%${search}%' 
                    OR no_pendaftaran_pelanggan LIKE '%${search}%'
                    OR no_seri_barcode_pelanggan LIKE '%${search}%'`;

    var limit = ` LIMIT ${page},${per_page} `;
    var main_qry = `SET @row_number:= 0;
                    SELECT (@row_number:=@row_number + 1) AS no,
                        A.id_pelanggan AS id,
                        A.nama_lengkap_pelanggan AS fullname,
                        UPPER(A.no_pendaftaran_pelanggan) AS no_pelanggan,
                        CASE 
                            WHEN A.jenis_kelamin_pelanggan = 'L'
                            THEN 'PRIA'
                            WHEN A.jenis_kelamin_pelanggan = 'P'
                            THEN 'WANITA'
                        END AS jk,
                        A.no_hp_pelanggan AS hp,
                        A.tanggal_lahir_pelanggan AS lahir,
                        IFNULL(B.p, 0) AS point
                    FROM ${table[0]} A
                    LEFT JOIN (SELECT COUNT(id_pelanggan) AS p, id_pelanggan  
                    FROM point
                    GROUP BY id_pelanggan) B
                    ON A.id_pelanggan = B.id_pelanggan
                    ${where}
                    ORDER BY A.tanggal_pendaftaran_pelanggan DESC
                    ${limit};`;

    conn.query(` ${main_qry}
        SELECT COUNT(*) as sum FROM ${table[0]} A
        LEFT JOIN (SELECT COUNT(id_pelanggan) AS p, id_pelanggan  
        FROM point
        GROUP BY id_pelanggan) B
        ON A.id_pelanggan = B.id_pelanggan ${where} limit 1;
        `, [1, 2], function(error, rows, fields) {
        if (error) {
            console.log(error)
        } else {

            var sum_data = rows[2][0].sum;

            var total_page = Math.ceil(sum_data / per_page);
            var prev = current == 1 ? 1 : (current - 1);
            var next = total_page == current ? total_page : (current + 1);

            var datas = rows[1];

            datas.forEach(function(item, index, arr) {

                arr[index] = {
                    "id": item.id,
                    "no": item.no,
                    "fullname": item.fullname,
                    "no_pelanggan": item.no_pelanggan,
                    "jk": item.jk,
                    "hp": item.hp,
                    "point": item.point,
                    "lahir": item.lahir == "0000-00-00 00:00:00" ? item.lahir : fecha.format(item.lahir, 'DD MMMM YYYY'),
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
    var current = params.page == null ? 1 : parseInt(params.page);
    var per_page = params.per_page == null ? 10 : parseInt(params.per_page);
    var url_admin = baseurl.url_admin;
    var id = params.id == null ? '' : params.id;

    var page = (current - 1) * (per_page > 0 ? per_page : 10);

    var where = `WHERE id_pelanggan LIKE '${id}'`;
    var main_qry = `SELECT * FROM ${table[0]}
        ${where};`;

    conn.query(` ${main_qry}`, function(error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            var datas = rows;
            datas.forEach(function(item, index, arr) {
                arr[index] = {
                    "id": item.id_pelanggan,
                    "tgl_pendaftaran": item.tanggal_pendaftaran_pelanggan == "0000-00-00 00:00:00" ? item.tanggal_pendaftaran_pelanggan : fecha.format(item.tanggal_pendaftaran_pelanggan, 'YYYY-MM-DD'),
                    "no_pendaftaran": item.no_pendaftaran_pelanggan,
                    "no_barcode": item.no_seri_barcode_pelanggan,
                    "jenis_kelamin": item.jenis_kelamin_pelanggan,
                    "status_menikah": item.status_menikah_pelanggan,
                    "agama": item.agama_pelanggan,
                    "hobi": item.hobby_pelanggan,
                    "fullname": item.nama_lengkap_pelanggan,
                    "no_ktp": item.no_ktp_pelanggan,
                    "tempat_lahir": item.tempat_lahir_pelanggan,
                    "tgl_lahir": item.tanggal_lahir_pelanggan == "0000-00-00 00:00:00" ? item.tanggal_lahir_pelanggan : fecha.format(item.tanggal_lahir_pelanggan, 'YYYY-MM-DD'),
                    "alamat": item.alamat_pelanggan,
                    "kota": item.kota_pelanggan,
                    "email": item.email_pelanggan,
                    "phone": item.no_telp_pelanggan,
                    "hp": item.no_hp_pelanggan,
                    "facebook": item.facebook_pelanggan,
                    "twitter": item.twitter_pelanggan,
                    "instagram": item.instagram_pelanggan,
                    "pendidikan": item.pendidikan_pelanggan,
                    "pekerjaan": item.pekerjaan_pelanggan,
                    "kunjungan": item.kunjungan_perbulan,
                    "nominal": item.rata_nominal_belanja,
                    "created_date": item.created_date == "0000-00-00 00:00:00" ? item.created_date : fecha.format(item.created_date, 'YYYY-MM-DD HH:mm:ss'),
                    "modified_date": item.modified_date == "0000-00-00 00:00:00" ? item.modified_date : fecha.format(item.modified_date, 'YYYY-MM-DD HH:mm:ss')
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
            post["tanggal_pendaftaran_pelanggan"] = `${inp.tanggalPendaftaran}`
            post["no_pendaftaran_pelanggan"] = `${inp.nopendaftaran}`
            post["no_seri_barcode_pelanggan"] = `${inp.noseribarcode}`
            post["jenis_kelamin_pelanggan"] = `${inp.jenisKelamin}`
            post["status_menikah_pelanggan"] = `${inp.statusMenikah}`
            post["agama_pelanggan"] = `${inp.agama}`
            post["hobby_pelanggan"] = `${inp.hobi}`
            post["nama_lengkap_pelanggan"] = `${inp.fullname}`
            post["no_ktp_pelanggan"] = `${inp.noktp}`
            post["tempat_lahir_pelanggan"] = `${inp.tempatLahir}`
            post["tanggal_lahir_pelanggan"] = `${inp.tanggalLahir}`
            post["alamat_pelanggan"] = `${inp.tempatTinggal}`
            post["kota_pelanggan"] = `${inp.kota}`
            post["email_pelanggan"] = `${inp.alamatEmail}`
            post["no_telp_pelanggan"] = `${inp.noTelepon}`
            post["no_hp_pelanggan"] = `${inp.noHp}`
            post["facebook_pelanggan"] = `${inp.facebook}`
            post["twitter_pelanggan"] = `${inp.twitter}`
            post["instagram_pelanggan"] = `${inp.instagram}`
            post["pendidikan_pelanggan"] = `${inp.pendidikan}`
            post["pekerjaan_pelanggan"] = `${inp.pekerjaan}`
            post["kunjungan_perbulan"] = `${inp.kunjunganJCM}`
            post["rata_nominal_belanja"] = `${inp.nominalBelanja}`
            post["created_date"] = datenow
            post["modified_date"] = datenow

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
    var where = ` WHERE id_pelanggan = '${id}' `;

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

            post["tanggal_pendaftaran_pelanggan"] = `${inp.tanggalPendaftaran}`
            post["no_pendaftaran_pelanggan"] = `${inp.nopendaftaran}`
            post["no_seri_barcode_pelanggan"] = `${inp.noseribarcode}`
            post["jenis_kelamin_pelanggan"] = `${inp.jenisKelamin}`
            post["status_menikah_pelanggan"] = `${inp.statusMenikah}`
            post["agama_pelanggan"] = `${inp.agama}`
            post["hobby_pelanggan"] = `${inp.hobi}`
            post["nama_lengkap_pelanggan"] = `${inp.fullname}`
            post["no_ktp_pelanggan"] = `${inp.noktp}`
            post["tempat_lahir_pelanggan"] = `${inp.tempatLahir}`
            post["tanggal_lahir_pelanggan"] = `${inp.tanggalLahir}`
            post["alamat_pelanggan"] = `${inp.tempatTinggal}`
            post["kota_pelanggan"] = `${inp.kota}`
            post["email_pelanggan"] = `${inp.alamatEmail}`
            post["no_telp_pelanggan"] = `${inp.noTelepon}`
            post["no_hp_pelanggan"] = `${inp.noHp}`
            post["facebook_pelanggan"] = `${inp.facebook}`
            post["twitter_pelanggan"] = `${inp.twitter}`
            post["instagram_pelanggan"] = `${inp.instagram}`
            post["pendidikan_pelanggan"] = `${inp.pendidikan}`
            post["pekerjaan_pelanggan"] = `${inp.pekerjaan}`
            post["kunjungan_perbulan"] = `${inp.kunjunganJCM}`
            post["rata_nominal_belanja"] = `${inp.nominalBelanja}`
            post["modified_date"] = datenow

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
            conn.query(`DELETE FROM ${table[0]} WHERE id_pelanggan = ${inp.id}`);
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