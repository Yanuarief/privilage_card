const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const fecha = require('fecha');
const axios = require('axios');
const { base64encode, base64decode } = require('nodejs-base64');
const md5 = require('md5');
const main = require('universal-emoji-parser');

var image_type = [
    "original",
    "large",
    "medium",
    "small",
    "mini",
];
const table = ['bank', 'jenis_kartu', 'produk_kartu'];
const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mai', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
fecha.i18n['monthNames'] = monthNames;

exports.lists = function(resp, conn, params, res) {
    var current = params.current;
    var per_page = params.per_page;
    var url_admin = params.url_admin;
    var search = params.search;

    var page = (current - 1) * (per_page > 0 ? per_page : 10);

    var where = `   WHERE status = '1' AND nama_bank LIKE '%${search}%' `;

    var limit = ` LIMIT ${page},${per_page} `;

    var main_qry1 = `SELECT id_bank, 
                    nama_bank
                    FROM ${table[0]} ${where}
                    ORDER BY nama_bank
                    ${limit};`;

    conn.query(` ${main_qry1}
                SELECT COUNT(*) as sum FROM ${table[0]} A
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
            var abc = []
            var dataBank = []

            for (var i = 0; i < datas.length; i++) {
                abc[i] = new Promise((resolve, reject) => {
                    conn.query(` SELECT * FROM ${table[2]} WHERE id_bank = '${datas[i].id_bank}'
                    AND status = '1' ORDER BY name;`, function(error1, rows1, fields1) {
                        var data2 = rows1
                        data2.forEach(function(item2, index2, arr2) {
                            arr2[index2] = item2.name
                        })

                        resolve(data2);
                    })
                });
                abc[i] = await abc[i]
                dataBank[i] = {
                    "id": datas[i].id_bank,
                    "nama_bank": datas[i].nama_bank,
                    "produk": abc[i]
                }
            }

            var items = {};
            items["data"] = dataBank;
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
            var call = datas.length>0?datas.length-1:0
            datas.forEach(function(item, index, arr) {
                prod.push({
                	id: item.id,
                	name: item.name
                })
                var prud = Object.assign({}, prod)
                arr[index] = {
                    "id": item.id_bank,
                    "bank": item.nama_bank,
                    "produk": prud
                };

            });

            var items = {};
            items["data"] = datas[call];
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

            var post1 = {};
            var post2 = {};
            var longs = inp.namaProduk.length;

            post1["nama_bank"] = `${inp.namaBank}`

            conn.query(`INSERT INTO ${table[0]} SET ?`, post1, async function(error, rows, fields) {

                for (var i = 0; i < longs; i++) {
                    post2["name"] = inp.namaProduk[i]
                    post2["id_bank"] = rows.insertId

                    conn.query(`INSERT INTO ${table[2]} SET ?`, post2)
                }

            });

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

    conn.query(`SELECT a.* FROM superuser a INNER JOIN suauth b ON a.id=b.id_account where b.auth="` + auth + `";`, async function(error, rows, fields) {
        if (rows.length > 0 && id != null) {
            /*const huplauth = 'S4l4mhebat2020'
            const authimg = md5(base64encode(`${auth} ${huplauth} ${datenow} img`))

            var imgauth = {
                'auth': authimg
            }

            const headers = {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': huplauth
            }

            const respimg = await axios.post('https://gmscode.net/auth', imgauth, { headers: headers });*/

            var items = {};
            var post1 = {};

            post1["nama_bank"] = `${inp.namaBank}`

            conn.query(`UPDATE ${table[0]} SET ? ${where};`, post1, async function(error, rows, fields) {

	            var inpprod = inp.id_prod;
	            var inpnamaProduk = inp.namaProduk;
	            var lprod = inp.id_prod.length;

	            var where_not = ` where id_bank = '${id}' and `;
	            var not = ``;
	            for(var i=0;i<lprod;i++){
	            	
	            	var post2 = {};
	            		post2["name"] = inpnamaProduk[i]

	            	if(inpprod[i]==0){
	            		post2["status"] = `1`
	            		post2["id_bank"] = id

	            		var unk = new Promise(function(resolve,reject){
		            		conn.query(`INSERT ${table[2]} SET ?;`, post2, async function(error, rows, fields) {
		            			resolve(rows.insertId);
		            		});
	            		})

	            		var idprodx = await unk
	            	}else{
		            	var where = ` WHERE id_bank = '${id}' and id='${inpprod[i]}' `;
		            	var idprodx = inpprod[i]
	            		conn.query(`UPDATE ${table[2]} SET ? ${where};`, post2);
	            	}

	            	not += i==0?`id!='${idprodx}'`:` and id!='${idprodx}'`
	            }

	            where_x = `${where_not} ( ${not} )`
	            conn.query(`UPDATE ${table[2]} SET status = '0' ${where_x};`)

            });            


            /*var post1 = {};
            var post2 = {};

            post1["nama_bank"] = `${inp.namaBank}`

            conn.query(`UPDATE ${table[2]} SET status = '0' ${where}; UPDATE ${table[0]} SET ? ${where};`, post1, async function(error, rows, fields) {
                var longs = inp.namaProduk.length
                for (var i = 0; i < longs; i++) {
                    post2["name"] = inp.namaProduk[i]
                    post2["id_bank"] = `${id}`

                    conn.query(`INSERT INTO ${table[2]} SET ?`, post2)
                }

            });*/

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

    conn.query(`SELECT a.* FROM superuser a INNER JOIN suauth b ON a.id=b.id_account where b.auth="` + auth + `";`, async function(error, rows, fields) {
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

exports.listBank = function(req, res, resp, conn) {
    var current = req.query.page == null ? 1 : parseInt(req.query.page);
    var per_page = req.query.per_page == null ? 10 : parseInt(req.query.per_page);
    var search = req.query.value == null ? '' : req.query.value;

    var page = (current - 1) * (per_page > 0 ? per_page : 10);

    var where = `   WHERE status = '1' AND nama_bank LIKE '%${search}%' `;

    var limit = ` LIMIT ${page},${per_page} `;

    var main_qry = `SELECT *
                    FROM ${table[0]}
                    ${where}
                    ${limit};`;

    conn.query(` ${main_qry} SELECT COUNT(*) as sum FROM ${table[0]}
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
                    "id": item.id_bank,
                    "text": item.nama_bank,
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

exports.listProduk = function(req, res, resp, conn) {
    var current = req.query.page == null ? 1 : parseInt(req.query.page);
    var per_page = req.query.per_page == null ? 10 : parseInt(req.query.per_page);
    var search = req.query.value == null ? '' : req.query.value;
    var inp = req.query.id == null || req.query.id == "undefined" ? '' : req.query.id
    var page = (current - 1) * (per_page > 0 ? per_page : 10);

    var where = `WHERE id_bank = '${inp}' AND status=1 AND name LIKE '%${search}%' `;

    var limit = ` LIMIT ${page},${per_page} `;

    var main_qry = `SELECT *
                    FROM ${table[2]} 
                    ${where}
                    ${limit};`;

    conn.query(` ${main_qry} SELECT COUNT(*) as sum FROM ${table[2]} ${where} limit 1;`, [1, 2], async function(error, rows, fields) {
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
                    "id": item.id,
                    "text": item.name,
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

exports.addKartu = function(req, res, resp, conn) {
    var items = {};
    var params = req.query;
    var inp = req.body
    var file = req.files

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

            var post1 = {};
            var longs = inp.namaJenis.length;
            var datas = []
            var output = []

            for (var i = 0; i < longs; i++) {
                post1["id_bank"] = `${inp.namaBank}`
                post1["id_produk_kartu"] = `${inp.namaProduk}`
                post1["bin"] = inp.noBin[i]
                post1["name"] = inp.namaJenis[i]
                post1["bin"] = inp.noBin[i]

                datas[i] = new Promise((resolve, reject) => {
                    conn.query(`INSERT INTO ${table[1]} SET ?`, post1, async function(error, rows1, fields) {
                        if (rows1 != "undefined") {
                            resolve(post1)
                        } else {
                            resolve(error)
                        }
                    })
                })
                output[i] = await datas[i]
            }

            items["data"] = output;
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

exports.byidfull = function(req, res, resp, conn, baseurl) {
    var params = req.query;
    var id = params.id == null ? '' : params.id;
    var produk = params.produk == '' || params.produk == null ? `` : `AND (B.name LIKE '${params.produk}' OR B.name IS NULL)`;
    var bin = params.bin == '' || params.bin == null ? `` : `AND LOCATE(C.bin, '${params.bin}') != 0`;

    var where = `WHERE A.status = '1' AND A.id_bank = '${id}' ${produk} ${bin}`;

    var main_qry = `SELECT  A.id_bank AS id_bank,
                            A.nama_bank AS nama_bank,
                            B.id AS id_produk,
                            B.name AS nama_produk,
                            IFNULL(C.id, '') AS id_jenis,
                            IFNULL(C.name, '') AS nama_jenis,
                            IFNULL(C.bin, '') AS bin
                            FROM ${table[0]} A
                            LEFT JOIN ${table[2]} B
                            ON A.id_bank = B.id_bank
                            AND B.status = '1'
                            LEFT JOIN ${table[1]} C
                            ON A.id_bank = C.id_bank
                            AND B.id = C.id_produk_kartu
                            AND C.status = '1'
                    ${where}
                    ORDER BY B.name;`;

    conn.query(` ${main_qry}`, function(error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            var datas = rows;

            datas.forEach(function(item, index, arr) {
                arr[index] = {
                    "id_bank": item.id_bank,
                    "nama_bank": item.nama_bank,
                    "id_produk": item.id_produk,
                    "nama_produk": item.nama_produk,
                    "id_jenis": item.id_jenis,
                    "nama_jenis": item.nama_jenis,
                    "bin": item.bin,

                };

            });

            var items = {};
            items["data"] = datas;
            items["status"] = 200;
            resp.ok(items, res);
        }
    });
}

exports.editkartu = function(req, res, resp, conn) {
    var params = req.query;
    var id = params.id == null ? '' : params.id;
    var inp = req.body
    var where = ` WHERE id_bank = '${id}' AND id_produk_kartu = '${inp.namaProduk}'`;

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

            conn.query(`UPDATE ${table[1]} SET status = '0' ${where};`, async function(error, rows, fields) {
                var longs = inp.namaJenis.length
                for (var i = 0; i < longs; i++) {
                    post1["id_bank"] = `${id}`
                    post1["id_produk_kartu"] = `${inp.namaProduk}`
                    post1["name"] = `${inp.namaJenis[i]}`
                    post1["bin"] = `${inp.noBin[i]}`

                    conn.query(`INSERT INTO ${table[1]} SET ?`, post1)
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