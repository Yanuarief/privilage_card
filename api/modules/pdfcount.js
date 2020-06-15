const mkdirp = require('mkdirp');
const pdf = require('pdf-parse');
const PDF2Pic = require("pdf2pic");

const fs = require('mz/fs');
const {splitPDF} = require('pdf-toolz/SplitCombine');
const {pdfToImage} = require('pdf-toolz/PDF2Image');

const axios = require('axios');

function callbacksplit(filename,number){

    axios.get('http://jcm.restcore.xyz:3000/pdfsplit/'+filename+'/'+number)
    .then(function (response) {
        // handle success
        if(response.data.status==200){
            setTimeout(() => { callbacksplit(filename,response.data.nextpage) },10000);
        }else{
            console.log('gotcha');
        }
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

            mkdirp('./tmp/'+filename);

            var datas = rows[0];
                datas.forEach(function(item, index, arr){
                var fileLoc = '/home/jcmcenter.restcore.xyz/public_html/riv-content/uploads/modules/file_magazine/' + filename + '.pdf';
                let dataBuffer = fs.readFileSync(fileLoc);

                var pathdir = './tmp/'+filename; 

                const pdf2pic = new PDF2Pic({
                  density: 100,           // output pixels per inch
                  savename: filename,   // output file name
                  savedir: pathdir,    // output file location
                  format: "jpg",          // output file format
                  size: "1080x1920"         // output size in pixels
                });
                            
                pdf(dataBuffer)
                .then(async function(data) {
                    if(item.total_page!=data.numrender || item.total_page==0){
                        conn.query(`UPDATE riv_` + table + ` SET total_page = ? ` + where + ` `, [data.numrender]);
                    }
                    console.log('step 1');

                    /*const pdf = await fs.readFile(fileLoc);*/
                    /*const pages = await splitPDF(pdf);*/

                    /*for (var i = 0; i < page; i++) {
                        var imgPath = "./tmp/" + filename + "/" + filename + "-" + i + ".jpg";
                        var existsFile = fs.existsSync(imgPath);
                        if (existsFile==false) {
                            pdf2pic.convertBulk(fileLoc, [i+1]).then((resolve) => {
                              console.log("image converter successfully!");
                             
                              return resolve;
                            });
                        }
                    }*/

                    // for (var y = 0; y < to; y++) {
                    //     var start = y*10;
                    //     var page = (y+1)*10;
                    //     if(to!=(y+1)){
                    //         for (var i = start; i < page; i++) {
                    //             console.log(i+1);
                    //             var imgPath = "./tmp/" + filename + "/" + filename + "-" + i + ".png";
                    //             var existsFile = fs.existsSync(imgPath);
                    //             if (existsFile==false) {
                    //                 await fs.writeFile(imgPath, pageImages[i]);
                    //                 console.log(imgPath);
                    //                 /*await fs.writeFile(filePath, pages[i]);*/
                    //             }
                    //             pdf2pic.convertBulk(fileLoc, [i+1]).then((resolve) => {
                    //               console.log("image converter successfully!");
                                 
                    //               return resolve;
                    //             });
                    //         }
                    //     }else{
                    //         for (var i = start; i < lastpage; i++) {
                    //             console.log(i+1);
                    //             var imgPath = "./tmp/" + filename + "/" + filename + "-" + i + ".png";
                    //             var existsFile = fs.existsSync(imgPath);
                    //             if (existsFile==false) {
                    //                 await fs.writeFile(imgPath, pageImages[i]);
                    //                 console.log(imgPath);
                    //                 /*await fs.writeFile(filePath, pages[i]);*/
                    //             }
                    //             /*pdf2pic.convertBulk(fileLoc, [i+1]).then((resolve) => {
                    //               console.log("image converter successfully!");
                                 
                    //               return resolve;
                    //             });*/
                    //         }
                    //     }
                    // }

                    /*const pdf = await fs.readFile(fileLoc);*/
                    /*const pages = await splitPDF(pdf);*/
                    /*const pageImages = await pdfToImage(pdf, 'png', 400  dpi );
                    for (var i = 0; i < page; i++) {*/
                        /*var filePath = "./tmp/" + filename + "/" + filename + "-" + i + ".pdf";*/
                        /*var imgPath = "./tmp/" + filename + "/" + filename + "-" + i + ".png";
                        var existsFile = fs.existsSync(imgPath);
                        if (existsFile==false) {
                            fs.writeFile(imgPath, pageImages[i]);
                            console.log(imgPath);
                            await fs.writeFile(filePath, pages[i]);
                        }*/
                        
                    /*}*/
                        
                        
                })
                /*.then(async function(data){
                    console.log('step 2');
                    callbacksplit(filename,1);
                });*/
            });

            var items = {}; 
                items["status"] = 200;
            resp.ok(items,res);
        }
    });
}