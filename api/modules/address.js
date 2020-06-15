const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const fecha = require('fecha');

exports.lists = function(req,res,resp,conn){
    var items = {};
    const inp = req.body;
    const auth = req.headers.authorization;
    const datenow = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')

    const address = inp.address
    const detail_address = inp.detail_address
    const def = inp.def
    
    conn.query(`SELECT a.*, b.id_account FROM riv_account a INNER JOIN riv_auth b ON a.id=b.id_account where b.auth="`+ auth +`";`,
      function (error, rows, fields){
        var datas = rows[0];
        if(rows.length>0){

            const id_account = datas.id_account;

            conn.query(`SELECT * FROM riv_address WHERE account_id = `+ id_account +` ORDER BY riv_address.def LIMIT 1;`,  
            function (error, rows, fields){
            var post  = {};
            
            if(address!=''){
                
            post["account_id"] = id_account
            post["address"] = address
            post["detail_address"] = detail_address
            post["def"] = def
            post["created_date"] = datenow
            post["modified_date"] = datenow
    
                conn.query(`INSERT INTO riv_address SET ?`,post);
                console.log(post);
                    items["token"] = auth;
                    items["msg"] = "Success, Update your data!!"; 
                    items["status"] = 200;
                resp.ok(items,res);
            }else{

                    items["token"] = null;
                    items["msg"] = "Sorry, check your data...!!"; 
                    items["status"] = 200;
                resp.ok(items,res);
            }
        });
    }else{
            items["msg"] = "Access Denied, GTFO!!"; 
            items["status"] = 200;
        resp.ok(items,res);
        }
    });
}