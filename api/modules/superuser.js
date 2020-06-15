const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const { base64encode, base64decode } = require('nodejs-base64');
const md5 = require('md5');
const fecha = require('fecha');
const nodemailer = require("nodemailer");

async function sendmail(code, email) {
    let transporter = nodemailer.createTransport({
        host: "smtp.hostinger.co.id",
        port: 587,
        secure: false,
        auth: {
            user: "it@gmscode.net",
            pass: "salamhebat2020"
        }
    });

    let info = await transporter.sendMail({
        from: '"Jogja City Mall - No Reply" <it@gmscode.net>',
        to: email,
        subject: "Congratulations Registered Account for Jogja City Mall !",
        html: "Your Code is <b>" + code + "</b>"
    });

}

async function forgetmail(email, forgetcode) {

    let transporter = nodemailer.createTransport({
        host: "smtp.hostinger.co.id",
        port: 587,
        secure: false,
        auth: {
            user: "it@gmscode.net",
            pass: "salamhebat2020"
        }
    });

    let info = await transporter.sendMail({
        from: '"Jogja City Mall - No Reply" <it@gmscode.net>',
        to: email,
        subject: "Reset Password for Jogja City Mall !",
        html: "Link Reset Password <b>https://account.jogjacitymall.id?fauth=" + forgetcode + "</b>"
    });

}

function generator() {
    const ran = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].sort((x, z) => {
        ren = Math.random();
        if (ren == 0.5) return 0;
        return ren > 0.5 ? 1 : -1
    })
    return Array(6).fill(null).map(x => ran()[(Math.random() * 9).toFixed()]).join('')
}

exports.register = function(req, res, resp, conn) {
    var params = req.query;
    var inp = req.body
    var table = 'superuser';
    var main_qry = '';
    var where = ' WHERE email LIKE "' + inp.email + '" OR username LIKE "' + inp.username + '" ';
    const code = generator()
    const email = inp.email
    const pass = md5(base64encode(inp.password + inp.username))
    const datenow = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')

    var post = {};
    post["username"] = inp.username
    post["email"] = inp.email
    post["pin"] = code
    post["password"] = pass
    post["created_date"] = datenow

    if (!/^[a-zA-Z0-9]+$/.test(inp.username)) {
        var items = {};
        items["token"] = null;
        items["msg"] = "Sorry, don't use symbols!!";
        items["status"] = 200;
        resp.ok(items, res);
    } else {
        conn.query(`SELECT COUNT(*) as sum FROM riv_` + table + ` ` + where + ` limit 1;
        `, [1], function(error, rows, fields) {

            if (rows[0].sum > 0) {
                var items = {};
                items["token"] = null;
                items["msg"] = "Register account already exist!!";
                items["status"] = 200;
                resp.ok(items, res);
            } else {
                /*sendmail(code,email);*/

                conn.query(`INSERT INTO riv_` + table + ` SET ?`, post,
                    function(error, rows, fields) {
                        const auth = md5(base64encode(pass + datenow));

                        var post = {};
                        post["auth"] = auth
                        post["id_account"] = rows.insertId
                        post["first_date"] = datenow
                        post["created_date"] = datenow

                        conn.query(`INSERT INTO riv_auth SET ?`, post);

                        var items = {};
                        items["token"] = auth
                        items["msg"] = "Register account success, check your email!!";
                        items["status"] = 200;
                        resp.ok(items, res);
                    }
                );
            }
        });
    }
}

exports.reqcode = function(req, res, resp, conn) {
    const code = generator()
    const auth = req.headers.authorization

    conn.query(`SELECT a.* FROM riv_account a INNER JOIN riv_auth b ON a.id=b.id_account where b.auth="` + auth + `";`, function(error, rows, fields) {
        var datas = rows[0];
        if (rows.length > 0) {
            sendmail(code, datas.email);

            conn.query(`UPDATE riv_account a INNER JOIN riv_auth b ON a.id=b.id_account SET a.pin="` + code + `" where b.auth="` + auth + `";`);

            var items = {};
            items["msg"] = "Success, Please check your email ( " + datas.email + " )!!";
            items["status"] = 200;
            resp.ok(items, res);
        } else {
            var items = {};
            items["msg"] = "Error, Email not found!!";
            items["status"] = 200;
            resp.ok(items, res);
        }
    });

}

exports.login = function(req, res, resp, conn) {
    var params = req.query;
    var inp = req.body
    var table = 'superuser';
    var user = inp.username
    var pass = md5(base64encode(inp.password + inp.username))

    var where = ` WHERE username LIKE "` + user + `" AND password LIKE "` + pass + `" `;
    var main_qry = `SELECT * FROM riv_` + table + ` ` + where + ` limit 1;`;

    var post = {};
    post["username"] = inp.username
    post["password"] = md5(base64encode(inp.password + inp.username))

    conn.query(main_qry, function(error, rows, fields) {
        var items = {};
        if (rows.length > 0) {
            var first = rows[0];
            if (first.username == user) {
                conn.query(`SELECT a.*, b.active FROM riv_suauth a INNER JOIN riv_superuser b ON a.id_account=b.id WHERE id_account LIKE "` + first.id + `" LIMIT 1`, function(error, rows, fields) {
                    var seconds = rows[0]

                    const datenow = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                    const auth = md5(base64encode(pass + datenow));

                    var post = {};
                    post["auth"] = auth
                    post["id_account"] = first.id
                    post["first_date"] = datenow
                    post["created_date"] = datenow
                    post["modified_date"] = datenow

                    if (rows.length > 0) {
                        conn.query(`UPDATE riv_suauth SET auth = "` + auth + `", created_date = "` + datenow + `" WHERE id_account LIKE "` + first.id + `" LIMIT 1;`);
                        items["active"] = seconds.active;
                        items["token"] = auth;
                        items["msg"] = "Success, Login is secure."
                        items["status"] = 200;
                        resp.ok(items, res);
                    } else {
                        conn.query(`INSERT INTO riv_suauth SET ?`, post);
                        items["active"] = seconds.active;
                        items["token"] = auth;
                        items["msg"] = "Success, Login is secure."
                        items["status"] = 200;
                        resp.ok(items, res);
                    }
                });
            } else {
                items["active"] = 0;
                items["token"] = null;
                items["msg"] = "Sorry, account not found!!";
                items["status"] = 200;
                resp.ok(items, res);
            }
        } else {
            items["active"] = 0;
            items["token"] = null;
            items["msg"] = "Sorry, username and password not match!!";
            items["status"] = 200;
            resp.ok(items, res);
        }

    });
}

exports.act = function(req, res, resp, conn) {
    var items = {};
    var auth = req.headers.authorization
    var pin = req.body.code

    conn.query(`SELECT COUNT(*) as sum FROM riv_auth WHERE auth LIKE "` + auth + `" LIMIT 1`, function(error, rows, fields) {
        var get = rows[0].sum
        if (get == 1) {
            conn.query(`SELECT a.* FROM riv_account a INNER JOIN riv_auth b ON a.id=b.id_account where a.pin="` + pin + `" and b.auth="` + auth + `";`, function(error, rows, fields) {
                var result = rows[0];
                if (rows.length > 0) {
                    if (result.active == 0) {
                        conn.query(`UPDATE riv_account a INNER JOIN riv_auth b ON a.id=b.id_account SET a.active=1 where a.pin="` + pin + `" and b.auth="` + auth + `";`);
                        items["msg"] = "Your account has been activated.";
                        items["status"] = 200;
                        resp.ok(items, res);
                    } else {
                        items["msg"] = "Your account already activated.";
                        items["status"] = 200;
                        resp.ok(items, res);
                    }
                } else {
                    items["msg"] = "Your verification code doesn't match.";
                    items["status"] = 200;
                    resp.ok(items, res);
                }
            });
        } else {
            items["msg"] = "Access Denied, GTFO!";
            items["status"] = 200;
            resp.ok(items, res);
        }
    });
}

exports.forgot = function(req, res, resp, conn) {
    var items = {}

    var table = 'account';
    var email = req.body.email
    var where = ' WHERE email LIKE "' + email + '"';

    conn.query(`SELECT * FROM riv_` + table + ` ` + where + ` limit 1;`,
        function(error, rows, fields) {
            var rowusr = rows[0]

            const datenow = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')

            if (rows.length > 0) {

                const fauth = md5(base64encode(rowusr.password + datenow));

                conn.query(`INSERT INTO riv_forget SET id_account="` + rowusr.id + `", forget="` + fauth + `", status="1", created_date=NOW(), modified_date=NOW()`);
                forgetmail(email, fauth);

                items["msg"] = "Success, check your email!";
                items["status"] = 200;
                resp.ok(items, res);
            } else {
                items["msg"] = "Sorry, email not found!";
                items["status"] = 200;
                resp.ok(items, res);
            }
        });
}

exports.newpass = function(req, res, resp, conn) {
    var items = {}

    var table = 'forget';
    var auth_forget = req.headers.authorization
    const getbpass = req.body.password
    var where = ' WHERE forget LIKE "' + auth_forget + '"';

    conn.query(`SELECT a.*, b.username FROM riv_` + table + ` a INNER JOIN riv_account b ON b.id=a.id_account ` + where + ` limit 1;`,
        function(error, rows, fields) {

            if (rows.length > 0) {
                var datasx = rows[0]
                const pass = md5(base64encode(getbpass + datasx.username))
                conn.query(`UPDATE riv_account SET password="` + pass + `" where id like "` + datasx.id_account + `";`);
                conn.query(`UPDATE riv_` + table + ` SET status="0" where id like "` + datasx.id + `";`);

                items["msg"] = "Success, update new password!";
                items["status"] = 200;
                resp.ok(items, res);
            } else {
                items["msg"] = "Access Denied, GTFO!!";
                items["status"] = 200;
                resp.ok(items, res);
            }
        }
    );
}

exports.changepass = function(req, res, resp, conn) {
    var items = {};
    const auth = req.headers.authorization
    const inp = req.body;

    conn.query(`SELECT a.* FROM riv_account a INNER JOIN riv_auth b ON a.id=b.id_account where b.auth="` + auth + `";`, function(error, rows, fields) {
        var datas = rows[0];
        if (rows.length > 0) {
            const oldpass = md5(base64encode(inp.oldpass + datas.username))
            const newpass = md5(base64encode(inp.newpass + datas.username))

            if (oldpass == datas.password) {
                conn.query(`UPDATE riv_account a INNER JOIN riv_auth b ON a.id=b.id_account SET a.password="` + newpass + `" where b.auth="` + auth + `";`);
                items["error"] = true
                items["msg"] = "Success, Update your password!!";
                items["status"] = 200;
                resp.ok(items, res);
            } else {
                items["error"] = false
                items["msg"] = "Sorry, Old password not match!!";
                items["status"] = 200;
                resp.ok(items, res);

            }

        } else {
            items["msg"] = "Access Denied, GTFO!!";
            items["status"] = 200;
            resp.ok(items, res);
        }
    });
}

exports.changeprofile = function(req, res, resp, conn) {
    var items = {};
    const auth = req.headers.authorization
    const inp = req.body;

    const fullname = inp.fullname
    const birthday = inp.birthday
    const gender = inp.gender
    const status = inp.status
    const pekerjaan = inp.pekerjaan

    conn.query(`SELECT a.*, b.id_account FROM riv_account a INNER JOIN riv_auth b ON a.id=b.id_account where b.auth="` + auth + `";`, function(error, rows, fields) {
        var datas = rows[0];
        if (rows.length > 0) {
            const id_account = datas.id_account;
            conn.query(`SELECT * FROM riv_profile where account_id="` + id_account + `";`, function(error, rows, fields) {
                var post = {}

                if (rows.length > 0) {

                    post['account_id'] = id_account
                    post['fullname'] = fullname
                    post['birthday'] = birthday
                    post['gender'] = gender
                    post['status'] = status
                    post['pekerjaan'] = pekerjaan

                    conn.query(`UPDATE riv_profile SET ?, modified_date=NOW() WHERE account_id="` + id_account + `"`, post);
                    items["msg"] = "Success, Update account profile!!";
                    items["status"] = 200;
                    resp.ok(items, res);
                } else {

                    post['account_id'] = id_account
                    post['fullname'] = fullname
                    post['birthday'] = birthday
                    post['gender'] = gender
                    post['status'] = status
                    post['pekerjaan'] = pekerjaan

                    conn.query(`INSERT INTO riv_profile SET ?, created_date=NOW()`, post);

                    items["msg"] = "Success, Update account profile!!";
                    items["status"] = 200;
                    resp.ok(items, res);
                }
            });
        } else {
            items["msg"] = "Access Denied, GTFO!!";
            items["status"] = 200;
            resp.ok(items, res);
        }
    });
}

exports.getprofile = function(req, res, resp, conn) {
    var items = {};
    const auth = req.headers.authorization

    conn.query(`SELECT a.*, b.id_account FROM riv_account a INNER JOIN riv_auth b ON a.id=b.id_account where b.auth="` + auth + `";`, function(error, rows, fields) {
        var datas = rows[0];
        if (rows.length > 0) {
            const id_account = datas.id_account;
            conn.query(`SELECT * FROM riv_profile where account_id="` + id_account + `";`, function(error, rows, fields) {
                var post = {}
                var pro = rows[0]

                if (rows.length > 0) {

                    post['fullname'] = pro.fullname
                    post['birthday'] = fecha.format(pro.birthday, 'YYYY-MM-DD')
                    post['gender'] = pro.gender
                    post['status'] = pro.status
                    post['pekerjaan'] = pro.pekerjaan

                    items["datas"] = post;
                    items["status"] = 200;
                    resp.ok(items, res);
                } else {

                    post['fullname'] = ''
                    post['birthday'] = ''
                    post['gender'] = ''
                    post['status'] = ''
                    post['pekerjaan'] = ''

                    items["datas"] = post;
                    items["status"] = 200;
                    resp.ok(items, res);
                }
            });
        } else {
            items["msg"] = "Access Denied, GTFO!!";
            items["status"] = 200;
            resp.ok(items, res);
        }
    });
}

exports.getemail = function(req, res, resp, conn) {
    var items = {};
    const auth = req.headers.authorization

    conn.query(`SELECT a.*, b.id_account FROM riv_account a INNER JOIN riv_auth b ON a.id=b.id_account where b.auth="` + auth + `";`, function(error, rows, fields) {
        var datas = rows[0];
        if (rows.length > 0) {
            const id_account = datas.id_account;
            conn.query(`SELECT * FROM riv_account where id="` + id_account + `";`, function(error, rows, fields) {
                var post = {}
                var pro = rows[0]

                post['email'] = pro.email

                items["datas"] = post;
                items["status"] = 200;
                resp.ok(items, res);

            });
        } else {
            items["msg"] = "Access Denied, GTFO!!";
            items["status"] = 200;
            resp.ok(items, res);
        }
    });
}

exports.changeemail = function(req, res, resp, conn) {
    var items = {};
    const auth = req.headers.authorization
    const inp = req.body;

    const email = inp.email

    conn.query(`SELECT a.*, b.id_account FROM riv_account a INNER JOIN riv_auth b ON a.id=b.id_account where b.auth="` + auth + `";`, function(error, rows, fields) {
        var datas = rows[0];
        if (rows.length > 0) {
            const id_account = datas.id_account;
            conn.query(`SELECT * FROM riv_account where id="` + id_account + `" and email="` + email + `";`, function(error, rows, fields) {

                if (rows.length == 0) {
                    var post = {}
                    post['email'] = email

                    conn.query(`UPDATE riv_account SET ?, modified_date=NOW() WHERE id="` + id_account + `"`, post);
                    items["error"] = true;
                    items["msg"] = "Success, Update email!!";
                    items["status"] = 200;
                    resp.ok(items, res);
                } else {
                    items["error"] = false;
                    items["msg"] = "Sorry, Email already exist!!";
                    items["status"] = 200;
                    resp.ok(items, res);
                }

            });
        } else {
            items["msg"] = "Access Denied, GTFO!!";
            items["status"] = 200;
            resp.ok(items, res);
        }
    });
}

exports.getphone = function(req, res, resp, conn) {
    var items = {};
    const auth = req.headers.authorization

    conn.query(`SELECT a.*, b.id_account FROM riv_account a INNER JOIN riv_auth b ON a.id=b.id_account where b.auth="` + auth + `";`, function(error, rows, fields) {
        var datas = rows[0];
        if (rows.length > 0) {
            const id_account = datas.id_account;
            conn.query(`SELECT * FROM riv_profile where account_id="` + id_account + `";`, function(error, rows, fields) {
                var post = {}
                if (rows.length > 0) {
                    var pro = rows[0]

                    post['handphone'] = pro.handphone

                    items["datas"] = post;
                    items["status"] = 200;
                    resp.ok(items, res);
                } else {
                    post['handphone'] = ''

                    items["datas"] = post;
                    items["status"] = 200;
                    resp.ok(items, res);
                }


            });
        } else {
            items["msg"] = "Access Denied, GTFO!!";
            items["status"] = 200;
            resp.ok(items, res);
        }
    });
}

exports.changephone = function(req, res, resp, conn) {
    var items = {};
    const auth = req.headers.authorization
    const inp = req.body;

    const handphone = inp.handphone

    conn.query(`SELECT a.*, b.id_account FROM riv_account a INNER JOIN riv_auth b ON a.id=b.id_account where b.auth="` + auth + `";`, function(error, rows, fields) {
        var datas = rows[0];
        if (rows.length > 0) {
            const id_account = datas.id_account;
            conn.query(`SELECT * FROM riv_profile where account_id="` + id_account + `";`, function(error, rows, fields) {
                var post = {}

                if (rows.length > 0) {

                    post['account_id'] = id_account
                    post['handphone'] = handphone

                    conn.query(`UPDATE riv_profile SET ?, modified_date=NOW() WHERE account_id="` + id_account + `"`, post);
                    items["msg"] = "Success, Update phone number!!";
                    items["status"] = 200;
                    resp.ok(items, res);
                } else {

                    post['account_id'] = id_account
                    post['handphone'] = handphone

                    conn.query(`INSERT INTO riv_profile SET ?, created_date=NOW()`, post);

                    items["msg"] = "Success, Update phone number!!";
                    items["status"] = 200;
                    resp.ok(items, res);
                }
            });
        } else {
            items["msg"] = "Access Denied, GTFO!!";
            items["status"] = 200;
            resp.ok(items, res);
        }
    });
}

exports.checking = function(req, res, resp, conn) {
    var items = {}

    var table = 'suauth';
    var auth = req.headers.authorization
    var where = ' WHERE auth LIKE "' + auth + '"';

    conn.query(`SELECT * FROM riv_` + table + ` ` + where + ` limit 1;`,
        function(error, rows, fields) {
            var rowusr = rows[0]

            if (rows.length > 0) {
                items["active"] = true;
                items["status"] = 200;
                resp.ok(items, res);
            } else {
                items["active"] = false;
                items["status"] = 200;
                resp.ok(items, res);
            }
        });
}