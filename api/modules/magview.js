/*const PDFImage = require("pdf-image").PDFImage;*/
const mkdirp = require('mkdirp');
const pdf = require('pdf-parse');
const PDF2Pic = require("pdf2pic");

const { base64encode, base64decode } = require('nodejs-base64');
const fs = require('mz/fs');
const {splitPDF} = require('pdf-toolz/SplitCombine');
var path = require('path');

exports.lists = async function(resp,conn,params,res){
    var filename = params.filename;
    var filepage = params.filepage;
    
    var page_number = parseInt(filepage);
    var hal = parseInt(page_number)-1;
    var imgPath = "./tmp/" + filename + "/" + filename + "_" + page_number + ".jpg";
    var existsFile = fs.existsSync(imgPath);

    var public = path.join(__dirname, '../');
    
    mkdirp('./tmp/'+filename);
    res.sendFile(path.join(public, "tmp/" + filename + "/" + filename + "_" + page_number + ".jpg"));
    console.log('Get File Success');
}