'use strict'

const axios = require('axios');
const fecha = require('fecha');
const requestIp = require('request-ip');
const uEmojiParser = require('universal-emoji-parser');
var qIPuser = '';

exports.public = function(resp,conn,params,res,req){
  const clientIp = requestIp.getClientIp(req);
  
  var items = {}; 
  var table   = ['ipstack','ipuser'];
  var qCekIPstack = "SELECT * FROM riv_"+table[0]+" WHERE count < 10000 ORDER BY id ASC LIMIT 1;";

  conn.query(qCekIPstack, function(error, rows, fields){
    var key_access = rows[0].key_access
    var datemodifkey = fecha.format(rows[0].modified_date, 'YYYY-MM')
    var datenowkey = fecha.format(new Date(), 'YYYY-MM')
    
    if(rows.length>0){
      if(datemodifkey!=datenowkey){conn.query(`UPDATE riv_ipstack SET count="0", modified_date=NOW()`)}
        
      var ipv4 = clientIp.replace('::ffff:','');
      var qCekIPuser = "SELECT * FROM riv_"+table[1]+" WHERE user_ip_public = '"+ipv4+"';";

      conn.query(qCekIPuser, function(error, rows, fields){
        if(error){
          console.log(error)
        }else{
          var accessKey = key_access;

          var dataUser = rows[0];
          var dateNow = new Date(Date()).getTime();
          var dateLast = rows.length == 0 ? new Date(Date()).getTime() : new Date(""+dataUser.modified_date+"").getTime();
        
          var diffDateHour = Math.ceil((dateNow - dateLast) /(1000 * 60 * 60));

          if(rows.length == 0){
            axios.get('http://api.ipstack.com/'+ipv4+'?access_key='+accessKey)
              .then(response => {
                var qwe = JSON.stringify(response.data)
                qIPuser = "INSERT INTO riv_"+table[1]+" (user_ip_public, user_info,count_per_days, created_date,modified_date) VALUES ('"+ipv4+"','"+qwe+"',1, NOW(), NOW());";
                var qUpdateAccess = "UPDATE riv_"+table[0]+" SET count = count + 1 WHERE key_access = '"+accessKey+"';";
                
                  conn.query(''+qUpdateAccess + qIPuser+'', function(error, rows, fields){
                    if(error){
                      console.log(error)
                    }else{
                      items['data'] = response.data
                      items["status"] = 200;
                      resp.ok(items,res);
                    }
                  })
              })
              .catch(error => {
                console.log(error);
              });
            
          }else{       
            if(diffDateHour > 24){
              axios.get('http://api.ipstack.com/'+ipv4+'?access_key='+accessKey)
              .then(response => {
                var qwe = JSON.stringify(response.data)
                qIPuser = "UPDATE riv_"+table[1]+" SET count_per_days = count_per_days + 1, user_info = '"+qwe+"', modified_date=NOW() WHERE user_ip_public = '"+dataUser.user_ip_public+"';";
                var qUpdateAccess = "UPDATE riv_"+table[0]+" SET count = count + 1 WHERE key_access = '"+accessKey+"';";

                conn.query(''+qUpdateAccess + qIPuser+'', function(error, rows, fields){
                  if(error){
                    console.log(error)
                  }else{
                    items['data'] = response.data
                    items["status"] = 200;
                    resp.ok(items,res);
                  }
                })
              })
              .catch(error => {
                console.log(error);
              });


            }else{
              var obj = JSON.parse(dataUser.user_info)
              items['data'] = obj
                  items["status"] = 200;
                  resp.ok(items,res);
            }
          }
        }
      });

    }else{

      items["msg"] = "Limited access, create code api key again on ipstack.com and register again."
      items["status"] = 200;
      resp.ok(items,res);
    
    }
  });
}