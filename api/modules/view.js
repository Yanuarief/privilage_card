const mkdirp = require('mkdirp');
const pdf = require('pdf-parse');
const PDF2Pic = require("pdf2pic");

const fs = require('mz/fs');
const {splitPDF} = require('pdf-toolz/SplitCombine');
const {pdfToImage} = require('pdf-toolz/PDF2Image');

const axios = require('axios');

function getURL(resp,res,filename,number){

    axios.get('http://jcm.restcore.xyz:3000/pdf/'+filename+'/'+number)
    .then(function (response) {
        console.log(response.data.nextpage);
         var items = {}; 
            items["data"] = 'https://jcm.restcore.xyz/magazine/'+filename+'/'+number;
            items["prev_page"] = response.data.prevpage;
            items["current_page"] = parseInt(number);
            items["next_page"] = response.data.nextpage;
            items["sum"] = response.data.sum;
            items["status"] = 200;
        resp.ok(items,res);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })

}

exports.lists = function(resp,conn,params,res){
    var table   = 'magazine';
    var current = params.filepage;
    var per_page = 1;
    var filename = params.filename;
    var url_admin = params.url_admin;

    var page = (current-1)*(per_page>0?per_page:10);

    var where = ` WHERE magazine_label LIKE '` + filename + `%' `;

    var limit = ` LIMIT 1`;
    var main_qry = `SELECT 
        *
        FROM 
        riv_` + table + ` 
        ` + where + `
        ORDER BY id DESC
        ` + limit + `;`;

    conn.query(` ` + main_qry + `
        SELECT COUNT(*) as sum FROM riv_` + table + ` ` + where + ` limit 1;
        `, [1, 2],  function (error, rows, fields){
        
        if(error){
            console.log(error)
        }else{
           getURL(resp,res,filename,current);
        }
    });
}