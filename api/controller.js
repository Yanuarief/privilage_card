'use strict';

var response = require('./res');
var connection = require('./conn');
var axios = require('axios')

var tenant = require('./modules/tenant');
var tenantcategory = require('./modules/tenantcategory');
var slider = require('./modules/slider');
var menus = require('./modules/menus');
var floormaps = require('./modules/floormaps');
var magazine = require('./modules/magazine');
var facilities = require('./modules/facilities');
var events = require('./modules/events');
var career = require('./modules/career');
var aboutus = require('./modules/aboutus');
var promo = require('./modules/promo');
var moviexxi = require('./modules/moviexxi');
var contactus = require('./modules/contactus');
var favorite = require('./modules/favorite');
var ipuser = require('./modules/ipuser');
var address = require('./modules/address');

var pelanggan = require('./modules/pelanggan');
var tenantMember = require('./modules/tenantMember');
var eventMember = require('./modules/eventMember');
var souvenir = require('./modules/souvenir');
var hadiah = require('./modules/hadiah');
var news = require('./modules/news');

var setting_point = require('./modules/setting_point');
var bank = require('./modules/bank');
var earnpoint = require('./modules/earnpoint');
var reedem = require('./modules/reedem');


var url_admin = 'https://jcm.gmscode.net/';
var url_download = 'https://jcmcenter.restcore.xyz/dl/';

/* Super Account */
var superuser = require('./modules/superuser');
exports.regsu = function(req, res) {
    superuser.register(req, res, response, connection);
};

exports.loginsu = function(req, res) {
    superuser.login(req, res, response, connection);
};

exports.checking = function(req, res) {
    superuser.checking(req, res, response, connection);
};

exports.career = function(req, res) {
    var params = req.query;
    var list_params = {};
    list_params["per_page"] = params.per_page == null ? 10 : parseInt(params.per_page);
    list_params["current"] = params.page == null ? 1 : parseInt(params.page);
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    career.lists(response, connection, list_params, res);
};

exports.pdfcount = async function(req, res) {
    var params = req.query;
    var list_params = {};
    list_params["per_page"] = params.per_page == null ? 10 : parseInt(params.per_page);
    list_params["current"] = params.page == null ? 1 : parseInt(params.page);
    list_params["filename"] = req.params.filename == null ? '' : req.params.filename;
    list_params["filepage"] = req.params.filepage == null ? 1 : parseInt(req.params.filepage);
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    pdfcount.lists(response, connection, list_params, res);
};

exports.pdfsplit = async function(req, res) {
    var params = req.query;
    var list_params = {};
    list_params["per_page"] = params.per_page == null ? 10 : parseInt(params.per_page);
    list_params["current"] = params.page == null ? 1 : parseInt(params.page);
    list_params["filename"] = req.params.filename == null ? '' : req.params.filename;
    list_params["pagenumber"] = req.params.pagenumber == null ? 1 : parseInt(req.params.pagenumber);
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    pdfsplit.lists(response, connection, list_params, res);
};

exports.moviexxi = function(req, res) {
    var params = req.query;
    var list_params = {};
    list_params["per_page"] = params.per_page == null ? 10 : parseInt(params.per_page);
    list_params["current"] = params.page == null ? 1 : parseInt(params.page);
    list_params["id"] = params.id == null ? 0 : parseInt(params.id);
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    moviexxi.lists(response, connection, list_params, res);
};

exports.contactus = function(req, res) {
    var params = req.query;
    var inp = req.body;

    try {
        axios.get("https://www.google.com/recaptcha/api/siteverify?secret=6Lcxbc0UAAAAAEETxgyO8d5fyIS5v4Njbe0ng1hV&response=" + inp.g)
            .then(data => {
                contactus.lists(response, connection, params, res, inp, data.success);
            })
            .catch(err => res.send(err));
    } catch (err) {
        console.error("GG", err);
    }
};

exports.register = function(req, res) {
    var params = req.query;
    var inp = req.body
    account.register(response, connection, inp, res);
};

exports.login = function(req, res) {
    var params = req.query;
    var inp = req.body
    account.login(response, connection, inp, res);
};

exports.act = function(req, res) {
    account.act(req, res, response, connection);
};

exports.changepass = function(req, res) {
    account.changepass(req, res, response, connection);
};

exports.changeprofile = function(req, res) {
    account.changeprofile(req, res, response, connection);
};

exports.getprofile = function(req, res) {
    account.getprofile(req, res, response, connection);
};

exports.getemail = function(req, res) {
    account.getemail(req, res, response, connection);
};

exports.changeemail = function(req, res) {
    account.changeemail(req, res, response, connection);
};

exports.getphone = function(req, res) {
    account.getphone(req, res, response, connection);
};

exports.changephone = function(req, res) {
    account.changephone(req, res, response, connection);
};

exports.reqcode = function(req, res) {
    account.reqcode(req, res, response, connection);
};

exports.favorite = function(req, res) {
    favorite.favorite(req, res, response, connection);
};

exports.favlist = function(req, res) {
    var params = req.query;
    var list_params = {};
    list_params["per_page"] = params.per_page == null ? 10 : parseInt(params.per_page);
    list_params["current"] = params.page == null ? 1 : parseInt(params.page);
    list_params["id"] = params.id == null ? 0 : parseInt(params.id);
    list_params["url_admin"] = url_admin;
    favorite.lists(req, res, response, connection, list_params);
};

exports.ipuser = function(req, res) {
    var params = req.query;
    var list_params = {};
    list_params["per_page"] = params.per_page == null ? 10 : parseInt(params.per_page);
    list_params["current"] = params.page == null ? 1 : parseInt(params.page);
    list_params["search"] = params.search == null ? '' : params.search;
    list_params["filename"] = req.params.filename == null ? '' : req.params.filename;
    list_params["filepage"] = req.params.filepage == null ? '' : req.params.filepage;
    list_params["url_admin"] = url_admin;
    ipuser.public(response, connection, list_params, res, req);
};

exports.forgot = function(req, res) {
    account.forgot(req, res, response, connection);
};

exports.newpass = function(req, res) {
    account.newpass(req, res, response, connection);
};

exports.address = function(req, res) {
    address.lists(req, res, response, connection);
};

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};

/* Events */
exports.events = function(req, res) {
    var opt = {
        url_admin: url_admin
    };
    events.lists(req, res, response, connection, opt);
};

exports.eventsbyid = function(req, res) {
    var list_params = {};
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    events.byid(req, res, response, connection, list_params);
};

exports.addevents = function(req, res) {
    events.add(req, res, response, connection);
};

exports.editevents = function(req, res) {
    events.edit(req, res, response, connection);
};

exports.delevents = function(req, res) {
    events.del(req, res, response, connection);
};

/* Promo */
exports.promo = function(req, res) {
    var opt = {
        url_admin: url_admin
    };
    promo.lists(req, res, response, connection, opt);
};

exports.promobyid = function(req, res) {
    var list_params = {};
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    promo.byid(req, res, response, connection, list_params);
};

exports.addpromo = function(req, res) {
    promo.add(req, res, response, connection);
};

exports.editpromo = function(req, res) {
    promo.edit(req, res, response, connection);
};

exports.delpromo = function(req, res) {
    promo.del(req, res, response, connection);
};

/* Tenant */
exports.tenant = function(req, res) {
    var opt = {
        url_admin: url_admin
    };
    tenant.lists(req, res, response, connection, opt);
};

exports.tenantbyid = function(req, res) {
    var list_params = {};
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    tenant.byid(req, res, response, connection, list_params);
};

exports.addtenant = function(req, res) {
    tenant.add(req, res, response, connection);
};

exports.edittenant = function(req, res) {
    tenant.edit(req, res, response, connection);
};

exports.deltenant = function(req, res) {
    tenant.del(req, res, response, connection);
};

/* Tenant Category */
exports.tenantcat = function(req, res) {
    var opt = {
        url_admin: url_admin
    };
    tenantcategory.lists(req, res, response, connection, opt);
};

exports.tenantcatbyid = function(req, res) {
    var list_params = {};
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    tenantcategory.byid(req, res, response, connection, list_params);
};

exports.addtenantcat = function(req, res) {
    tenantcategory.add(req, res, response, connection);
};

exports.edittenantcat = function(req, res) {
    tenantcategory.edit(req, res, response, connection);
};

exports.deltenantcat = function(req, res) {
    tenantcategory.del(req, res, response, connection);
};

/* Floormaps */
exports.floormaps = function(req, res) {
    var params = req.query;
    var list_params = {};
    list_params["per_page"] = params.per_page == null ? 10 : parseInt(params.per_page);
    list_params["current"] = params.page == null ? 1 : parseInt(params.page);
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    floormaps.lists(response, connection, list_params, res);
};

exports.floormapsbyid = function(req, res) {
    var list_params = {};
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    floormaps.byid(req, res, response, connection, list_params);
};

exports.addfloormaps = function(req, res) {
    floormaps.add(req, res, response, connection);
};

exports.editfloormaps = function(req, res) {
    floormaps.edit(req, res, response, connection);
};

exports.delfloormaps = function(req, res) {
    floormaps.del(req, res, response, connection);
};

/* Facilities */
exports.facilities = function(req, res) {
    var params = req.query;
    var list_params = {};
    list_params["per_page"] = params.per_page == null ? 10 : parseInt(params.per_page);
    list_params["current"] = params.page == null ? 1 : parseInt(params.page);
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    facilities.lists(response, connection, list_params, res);
};

exports.facilitiesbyid = function(req, res) {
    var list_params = {};
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    facilities.byid(req, res, response, connection, list_params);
};

exports.addfacilities = function(req, res) {
    facilities.add(req, res, response, connection);
};

exports.editfacilities = function(req, res) {
    facilities.edit(req, res, response, connection);
};

exports.delfacilities = function(req, res) {
    facilities.del(req, res, response, connection);
};

/* Slider */
exports.slider = function(req, res) {
    var params = req.query;
    var list_params = {};
    list_params["per_page"] = params.per_page == null ? 10 : parseInt(params.per_page);
    list_params["current"] = params.page == null ? 1 : parseInt(params.page);
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    slider.lists(response, connection, list_params, res);
};

exports.sliderbyid = function(req, res) {
    var list_params = {};
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    slider.byid(req, res, response, connection, list_params);
};

exports.addslider = function(req, res) {
    slider.add(req, res, response, connection);
};

exports.editslider = function(req, res) {
    slider.edit(req, res, response, connection);
};

exports.delslider = function(req, res) {
    slider.del(req, res, response, connection);
};

/* Menus */
exports.menus = function(req, res) {
    var params = req.query;
    var list_params = {};
    list_params["per_page"] = params.per_page == null ? 10 : parseInt(params.per_page);
    list_params["current"] = params.page == null ? 1 : parseInt(params.page);
    list_params["id"] = params.id == null ? 0 : parseInt(params.id);
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    menus.lists(response, connection, list_params, res);
};

exports.menusbyid = function(req, res) {
    var list_params = {};
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    menus.byid(req, res, response, connection, list_params);
};

exports.addmenus = function(req, res) {
    menus.add(req, res, response, connection);
};

exports.editmenus = function(req, res) {
    menus.edit(req, res, response, connection);
};

exports.delmenus = function(req, res) {
    menus.del(req, res, response, connection);
};

/* Magazine */
exports.magazine = function(req, res) {
    var params = req.query;
    var list_params = {};
    list_params["per_page"] = params.per_page == null ? 10 : parseInt(params.per_page);
    list_params["current"] = params.page == null ? 1 : parseInt(params.page);
    list_params["id"] = params.id == null ? 0 : parseInt(params.id);
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    magazine.lists(response, connection, list_params, res);
};

exports.magazinebyid = function(req, res) {
    var list_params = {};
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    magazine.byid(req, res, response, connection, list_params);
};

exports.addmagazine = function(req, res) {
    magazine.add(req, res, response, connection);
};

exports.editmagazine = function(req, res) {
    magazine.edit(req, res, response, connection);
};

exports.delmagazine = function(req, res) {
    magazine.del(req, res, response, connection);
};

/* About Us */
exports.aboutus = function(req, res) {
    var params = req.query;
    var list_params = {};
    list_params["per_page"] = params.per_page == null ? 10 : parseInt(params.per_page);
    list_params["current"] = params.page == null ? 1 : parseInt(params.page);
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    aboutus.lists(response, connection, list_params, res);
};

exports.aboutusbyid = function(req, res) {
    var list_params = {};
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    aboutus.byid(req, res, response, connection, list_params);
};

exports.editaboutus = function(req, res) {
    aboutus.edit(req, res, response, connection);
};

/* Select 2 Controller */
var select2 = require('./modules/select2');
exports.sel2floormaps = function(req, res) {
    select2.floormaps(req, res, response, connection);
};

exports.sel2tenant = function(req, res) {
    select2.tenant(req, res, response, connection);
};

exports.sel2tenantcat = function(req, res) {
    select2.tenantcat(req, res, response, connection);
};


/* Pelanggan */
exports.pelanggan = function(req, res) {
    var params = req.query;
    var list_params = {};
    list_params["per_page"] = params.per_page == null ? 10 : parseInt(params.per_page);
    list_params["current"] = params.page == null ? 1 : parseInt(params.page);
    list_params["search"] = params.val == null ? '' : params.val;
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    pelanggan.lists(response, connection, list_params, res);
};

exports.pelangganbyid = function(req, res) {
    var list_params = {};
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    pelanggan.byid(req, res, response, connection, list_params);
};

exports.addpelanggan = function(req, res) {
    pelanggan.add(req, res, response, connection);
};

exports.editpelanggan = function(req, res) {
    pelanggan.edit(req, res, response, connection);
};

exports.delpelanggan = function(req, res) {
    pelanggan.del(req, res, response, connection);
};


/* Tenant Member */
exports.tenantMember = function(req, res) {
    var params = req.query;
    var list_params = {};
    list_params["per_page"] = params.per_page == null ? 10 : parseInt(params.per_page);
    list_params["current"] = params.page == null ? 1 : parseInt(params.page);
    list_params["search"] = params.val == null ? '' : params.val;
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    tenantMember.lists(response, connection, list_params, res);
};

exports.tenantMemberbyid = function(req, res) {
    var list_params = {};
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    tenantMember.byid(req, res, response, connection, list_params);
};

exports.addtenantMember = function(req, res) {
    tenantMember.add(req, res, response, connection);
};

exports.edittenantMember = function(req, res) {
    tenantMember.edit(req, res, response, connection);
};

exports.deltenantMember = function(req, res) {
    tenantMember.del(req, res, response, connection);
};


/* Event Member */
exports.eventMember = function(req, res) {
    var params = req.query;
    var list_params = {};
    list_params["per_page"] = params.per_page == null ? 10 : parseInt(params.per_page);
    list_params["current"] = params.page == null ? 1 : parseInt(params.page);
    list_params["search"] = params.val == null ? '' : params.val;
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    eventMember.lists(response, connection, list_params, res);
};

exports.eventMemberbyid = function(req, res) {
    var list_params = {};
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    eventMember.byid(req, res, response, connection, list_params);
};

exports.addeventMember = function(req, res) {
    eventMember.add(req, res, response, connection);
};

exports.editeventMember = function(req, res) {
    eventMember.edit(req, res, response, connection);
};

exports.deleventMember = function(req, res) {
    eventMember.del(req, res, response, connection);
};

/* Souvenir */
exports.souvenir = function(req, res) {
    var params = req.query;
    var list_params = {};
    list_params["per_page"] = params.per_page == null ? 10 : parseInt(params.per_page);
    list_params["current"] = params.page == null ? 1 : parseInt(params.page);
    list_params["search"] = params.val == null ? '' : params.val;
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    souvenir.lists(response, connection, list_params, res);
};

exports.souvenirbyid = function(req, res) {
    var list_params = {};
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    souvenir.byid(req, res, response, connection, list_params);
};

exports.addsouvenir = function(req, res) {
    souvenir.add(req, res, response, connection);
};

exports.editsouvenir = function(req, res) {
    souvenir.edit(req, res, response, connection);
};

exports.delsouvenir = function(req, res) {
    souvenir.del(req, res, response, connection);
};


/* Hadiah */
exports.hadiah = function(req, res) {
    var params = req.query;
    var list_params = {};
    list_params["per_page"] = params.per_page == null ? 10 : parseInt(params.per_page);
    list_params["current"] = params.page == null ? 1 : parseInt(params.page);
    list_params["search"] = params.val == null ? '' : params.val;
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    hadiah.lists(response, connection, list_params, res);
};

exports.hadiahbyid = function(req, res) {
    var list_params = {};
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    hadiah.byid(req, res, response, connection, list_params);
};

exports.addhadiah = function(req, res) {
    hadiah.add(req, res, response, connection);
};

exports.edithadiah = function(req, res) {
    hadiah.edit(req, res, response, connection);
};

exports.delhadiah = function(req, res) {
    hadiah.del(req, res, response, connection);
};


/* Bank */
exports.bank = function(req, res) {
    var params = req.query;
    var list_params = {};
    list_params["per_page"] = params.per_page == null ? 10 : parseInt(params.per_page);
    list_params["current"] = params.page == null ? 1 : parseInt(params.page);
    list_params["search"] = params.val == null ? '' : params.val;
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    bank.lists(response, connection, list_params, res);
};

exports.bankbyid = function(req, res) {
    var list_params = {};
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    bank.byid(req, res, response, connection, list_params);
};

exports.addbank = function(req, res) {
    bank.add(req, res, response, connection);
};

exports.editbank = function(req, res) {
    bank.edit(req, res, response, connection);
};

exports.delbank = function(req, res) {
    bank.del(req, res, response, connection);
};

exports.listBank = function(req, res) {
    bank.listBank(req, res, response, connection);
};
exports.listProduk = function(req, res) {
    bank.listProduk(req, res, response, connection);
};
exports.addKartu = function(req, res) {
    bank.addKartu(req, res, response, connection);
};
exports.byidfull = function(req, res) {
    bank.byidfull(req, res, response, connection);
};
exports.editkartu = function(req, res) {
    bank.editkartu(req, res, response, connection);
};


/* Earn Points */
exports.earnpoint = function(req, res) {
    var params = req.query;
    var list_params = {};
    list_params["per_page"] = params.per_page == null ? 10 : parseInt(params.per_page);
    list_params["current"] = params.page == null ? 1 : parseInt(params.page);
    list_params["search"] = params.val == null ? '' : params.val;
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    earnpoint.lists(response, connection, list_params, res);
};

exports.earnpointsbyid = function(req, res) {
    var list_params = {};
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    earnpoint.byid(req, res, response, connection, list_params);
};

exports.addearnpoint = function(req, res) {
    earnpoint.add(req, res, response, connection);
};

exports.editearnpoints = function(req, res) {
    earnpoint.edit(req, res, response, connection);
};

exports.delearnpoints = function(req, res) {
    earnpoint.del(req, res, response, connection);
};
exports.listmember = function(req, res) {
    earnpoint.listmember(req, res, response, connection);
};
exports.listmemberbyid = function(req, res) {
    earnpoint.listmemberbyid(req, res, response, connection);
};
exports.listtenant = function(req, res) {
    earnpoint.listtenant(req, res, response, connection);
};
exports.listtenantbyid = function(req, res) {
    earnpoint.listtenantbyid(req, res, response, connection);
};


/* Reedem Points */
exports.reedem = function(req, res) {
    var params = req.query;
    var list_params = {};
    list_params["per_page"] = params.per_page == null ? 10 : parseInt(params.per_page);
    list_params["current"] = params.page == null ? 1 : parseInt(params.page);
    list_params["search"] = params.val == null ? '' : params.val;
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    reedem.lists(response, connection, list_params, res);
};

exports.reedembyid = function(req, res) {
    var list_params = {};
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    reedem.byid(req, res, response, connection, list_params);
};

exports.reedemitem = function(req, res) {
    var params = req.query;
    var list_params = {};
    list_params["per_page"] = params.per_page == null ? 10 : parseInt(params.per_page);
    list_params["current"] = params.page == null ? 1 : parseInt(params.page);
    list_params["search"] = params.val == null ? '' : params.val;
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    reedem.reedemitem(response, connection, list_params, res, req);
};

exports.editreedem = function(req, res) {
    reedem.edit(req, res, response, connection);
};



/* Setting Point */
exports.point_get = function(req, res) {
    setting_point.get(req, res, response, connection);
};

exports.point_post = function(req, res) {
    setting_point.post(req, res, response, connection);
};
exports.getsetpoint = function(req, res) {
    setting_point.getsetpoint(req, res, response, connection);
};



/* News */
exports.news = function(req, res) {
    var opt = {
        url_admin: url_admin
    };
    news.lists(req, res, response, connection, opt);
};

exports.newsbyid = function(req, res) {
    var list_params = {};
    list_params["url_admin"] = url_admin;
    list_params["url_download"] = url_download;
    news.byid(req, res, response, connection, list_params);
};

exports.addnews = function(req, res) {
    news.add(req, res, response, connection);
};

exports.editnews = function(req, res) {
    news.edit(req, res, response, connection);
};

exports.delnews = function(req, res) {
    news.del(req, res, response, connection);
};