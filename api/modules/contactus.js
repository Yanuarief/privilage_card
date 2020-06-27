'use strict';
const nodemailer = require("nodemailer");

async function sendmail(){
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.hostinger.co.id",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "it@gmscode.net", // generated ethereal user
      pass: "salamhebat2020" // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <it@gmscode.net>', // sender address
    to: "jayang.sp@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// async..await is not allowed in global scope, must use a wrapper
exports.lists = async function(resp,conn,params,res,inp,files,statusCode){

    var items = {}; 
        items["data"] = statusCode;
        items["status"] = 200;
        
    resp.ok(items,res);
    /*var table   = 'events';
    var current = params.current;
    var per_page = params.per_page;
    var url_admin = params.url_admin;

    var page = (current-1)*(per_page>0?per_page:10);

    var limit = ` LIMIT ` + page + `,` + per_page;
    var main_qry = `SELECT 
        a.*, b.floormaps, b.id as id_fmaps, b.code_maps
        FROM 
        ` + table + ` a
        INNER JOIN floormaps b ON a.floor_codes = b.id
        ORDER BY id DESC
        ` + limit + `;`;*/


    /*conn.query(` ` + main_qry + `
        SELECT COUNT(*) as sum FROM ` + table + ` limit 1;
        `, [1, 2],  function (error, rows, fields){
        if(error){
            console.log(error)
        } else{

            var sum_data = rows[1][0].sum;
            var total_page = Math.ceil(sum_data/per_page);
            var prev = current==1?1:(current-1);
            var next = total_page==current?total_page:(current+1);

            var loc_image_ori = url_admin + table;
            var loc_image_thm = url_admin + table + '/thumbs';
            
            var datas = rows[0];
            datas.forEach(function(item, index, arr){

                var i;
                var image_data = {};
                for (i = 0; i < image_type.length; i++) {
                    switch(image_type[i]){
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

                var start_date = fecha.format(item.start_date,"D");
                var end_date   = fecha.format(item.end_date,"D MMM YYYY");

                var date_range = `` + start_date + ` - ` + end_date + ``;

                arr[index] = {
                    "id": item.id,
                    "events": entities.decode(entities.decode(item.events)),
                    "floormaps": {
                        "id": item.id_fmaps,
                        "floormaps": entities.decode(entities.decode(item.floormaps)),
                        "code_maps": item.code_maps,
                        "full_name": entities.decode(entities.decode(item.floormaps + ` ( ` + item.code_maps + ` )`))
                    },
                    "image": image_data,
                    "date_range": date_range,
                    "created_date": item.created_date=="0000-00-00 00:00:00"?item.created_date:fecha.format(item.created_date, 'YYYY-MM-DD HH:mm:ss'),
                    "modified_date": item.modified_date=="0000-00-00 00:00:00"?item.modified_date:fecha.format(item.modified_date, 'YYYY-MM-DD HH:mm:ss')
                };
                
            });

          var items = {}; 
        items["data"] = datas;
                items["next_page"] = next;
                items["current_page"] = current;
                items["prev_page"] = prev;
                items["sum"] = sum_data;
                items["status"] = 200;
            resp.ok(items,res);
        }
    });*/
}