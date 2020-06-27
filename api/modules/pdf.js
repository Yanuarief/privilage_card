/*const PDFImage = require("pdf-image").PDFImage;*/
const mkdirp = require('mkdirp');
const pdf = require('pdf-parse');
const PDF2Pic = require("pdf2pic");

const { base64encode, base64decode } = require('nodejs-base64');
const fs = require('mz/fs');
const {splitPDF} = require('pdf-toolz/SplitCombine');

exports.lists = async function(resp,conn,params,res){
	var table   = 'magazine';

    var where = ` WHERE magazine_label LIKE '` + filename + `%' `;

    var filename = params.filename;
    var filepage = params.filepage;
    
    var page_number = parseInt(filepage);
    var hal = parseInt(page_number)-1;

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
                datas.forEach(function(item, index, arr){

                mkdirp('./tmp/'+filename);
                var pathdir = './tmp/'+filename; 
                var fileLoc = '/home/jcmcenter.restcore.xyz/public_html/riv-content/uploads/modules/file_magazine/' + filename + '.pdf';

                const pdf2pic = new PDF2Pic({
                  density: 300,           // output pixels per inch
                  savename: filename,   // output file name
                  savedir: pathdir,    // output file location
                  format: "jpg",          // output file format
                  size: "1080x1920"         // output size in pixels
                });
                var imgPath = "./tmp/" + filename + "/" + filename + "_" + page_number + ".jpg";
                var existsFile = fs.existsSync(imgPath);
                if (existsFile==false) {
                    /*console.log(page_number);
                    await fs.writeFile(imgPath, pageImages[page_number-1]);*/
                    pdf2pic.convertBulk(fileLoc, [page_number]).then((resolve) => {
                        console.log('create ' + page_number);
                        fs.readdir(pathdir, (err, files) => {
                        	conn.query(`UPDATE ` + table + ` SET part_upload = ? ` + where + ` `, [files.length]);
            			});

                        var items = {}; 
                            item["sum"] = item.total_page;
                            items["nextpage"] = item.total_page==page_number?item.total_page:page_number+1;
                            items["prevpage"] = page_number-1==1?1:page_number-1;
                            items["status"] = 200;
                        resp.ok(items,res);
                    });
                }else{
                    console.log('already ' + page_number);
                    fs.readdir(pathdir, (err, files) => {
                    	conn.query(`UPDATE ` + table + ` SET part_upload = ? ` + where + ` `, [files.length]);
            		});

                    var items = {}; 
                        items["sum"] = item.total_page;
                        items["nextpage"] = item.total_page==page_number?item.total_page:page_number+1;
                        items["prevpage"] = page_number-1==1?1:page_number-1;
                        items["status"] = 200;
                    resp.ok(items,res);
                } 
            });
        }
    });
}