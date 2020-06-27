const mkdirp = require('mkdirp');
const pdf = require('pdf-parse');
const PDF2Pic = require("pdf2pic");

const fs = require('mz/fs');
const {splitPDF} = require('pdf-toolz/SplitCombine');
const {pdfToImage} = require('pdf-toolz/PDF2Image');

exports.lists = function(resp,conn,params,res){
    var table   = 'magazine';
    var current = params.filepage;
    var per_page = 1;
    var filename = params.filename;
    var url_admin = params.url_admin;
    var page_number = params.pagenumber;

    var page = (current-1)*(per_page>0?per_page:10);

    var where = ` WHERE magazine_label LIKE '` + filename + `%' `;

    var limit = ` LIMIT 1`;
    var main_qry = `SELECT 
        *
        FROM 
        ` + table + ` 
        ` + where + `
        ORDER BY id DESC
        ` + limit + `;`;

    conn.query(` ` + main_qry + `
        SELECT COUNT(*) as sum FROM ` + table + ` ` + where + ` limit 1;
        `, [1, 2],  function (error, rows, fields){
        
        if(error){
            console.log(error)
        }else{

            var datas = rows[0];
                datas.forEach( async function(item, index, arr){
                    var fileLoc = '/home/jcmcenter.restcore.xyz/public_html/riv-content/uploads/modules/file_magazine/' + filename + '.pdf';

                    var pathdir = './tmp/'+filename; 

                    const pdf2pic = new PDF2Pic({
                      density: 140,           // output pixels per inch
                      savename: filename,   // output file name
                      savedir: pathdir,    // output file location
                      format: "jpg",          // output file format
                      size: "1080x1920"         // output size in pixels
                    });

                    // const pdf = await fs.readFile(fileLoc);
                    // const pageImages = await pdfToImage(pdf, 'png', 400  /*dpi*/ );
                    
                    var imgPath = "./tmp/" + filename + "/" + filename + "_" + page_number + ".jpg";
                    var existsFile = fs.existsSync(imgPath);
                    console.log(item.total_page);
                    if(page_number==item.total_page){
                        if (existsFile==false) {
                            /*console.log(page_number);
                            await fs.writeFile(imgPath, pageImages[page_number-1]);*/
                            pdf2pic.convertBulk(fileLoc, [page_number]).then((resolve) => {
                                console.log('create ' + page_number); 
                                fs.readdir(pathdir, (err, files) => {
	                            	conn.query(`UPDATE ` + table + ` SET part_upload = ? ` + where + ` `, [files.length]);
								});
								
                                conn.query(`UPDATE ` + table + ` SET splitdone = ? ` + where + ` `, ['1']);
                                var items = {}; 
                                    items["status"] = 404;
                                resp.ok(items,res);
                            });
                        }else{
                            console.log('create ' + page_number); 
                            fs.readdir(pathdir, (err, files) => {
                            	conn.query(`UPDATE ` + table + ` SET part_upload = ? ` + where + ` `, [files.length]);
							});

                            conn.query(`UPDATE ` + table + ` SET splitdone = ? ` + where + ` `, ['1']);
                            var items = {}; 
                                items["status"] = 404;
                            resp.ok(items,res);
                        }
                        
                    }else{
                        if (existsFile==false) {
                            /*console.log(page_number);
                            await fs.writeFile(imgPath, pageImages[page_number-1]);*/
                            pdf2pic.convertBulk(fileLoc, [page_number]).then((resolve) => {
                                console.log('create ' + page_number);
	                            fs.readdir(pathdir, (err, files) => {
	                            	conn.query(`UPDATE ` + table + ` SET part_upload = ? ` + where + ` `, [files.length]);
								});

                                var items = {}; 
                                    items["nextpage"] = page_number+1;
                                    items["status"] = 200;
                                resp.ok(items,res);
                            });
                        }else{
                            console.log('create ' + page_number);
                            fs.readdir(pathdir, (err, files) => {
                            	conn.query(`UPDATE ` + table + ` SET part_upload = ? ` + where + ` `, [files.length]);
							});

                            var items = {}; 
                                items["nextpage"] = page_number+1;
                                items["status"] = 200;
                            resp.ok(items,res);
                        }   

                        
                    }
                });
        }
    });
}