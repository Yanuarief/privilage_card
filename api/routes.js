'use strict';

module.exports = function(app, upload) {
    var todoList = require('./controller');

    /* First */
    app.get('/', todoList.index);

    /* Super User */
    app.post('/regsu', todoList.regsu);
    app.post('/loginsu', todoList.loginsu);
    app.get('/checking', todoList.checking);

    app.get('/career', todoList.career);

    app.get('/moviexxi', todoList.moviexxi);

    app.post('/contactus', todoList.contactus);

    app.post('/register', todoList.register);

    app.post('/login', todoList.login);

    app.post('/active', todoList.act);

    app.get('/reqcode', todoList.reqcode);

    app.post('/forgot', todoList.forgot);

    app.post('/newpass', todoList.newpass);

    app.post('/changepass', todoList.changepass);

    app.post('/changeprofile', todoList.changeprofile);

    app.post('/changeemail', todoList.changeemail);

    app.post('/changephone', todoList.changephone);

    app.post('/address', todoList.address);

    app.get('/getprofile', todoList.getprofile);

    app.get('/getemail', todoList.getemail);

    app.get('/getphone', todoList.getphone);

    app.get('/favorite', todoList.favorite);

    app.get('/listfav', todoList.favlist);

    app.get('/ipinfo', todoList.ipuser);

    /* Events */
    app.get('/events', todoList.events);
    app.get('/eventsbyid', todoList.eventsbyid);
    app.post('/addevents', todoList.addevents);
    app.post('/editevents', todoList.editevents);
    app.post('/delevents', todoList.delevents);

    /* Promo */
    app.get('/promo', todoList.promo);
    app.get('/promobyid', todoList.promobyid);
    app.post('/addpromo', todoList.addpromo);
    app.post('/editpromo', todoList.editpromo);
    app.post('/delpromo', todoList.delpromo);

    /* Tenant */
    app.get('/tenant', todoList.tenant);
    app.get('/tenantbyid', todoList.tenantbyid);
    app.post('/addtenant', todoList.addtenant);
    app.post('/edittenant', todoList.edittenant);
    app.post('/deltenant', todoList.deltenant);

    /* Tenant Category */
    app.get('/tenantcat', todoList.tenantcat);
    app.get('/tenantcatbyid', todoList.tenantcatbyid);
    app.post('/addtenantcat', todoList.addtenantcat);
    app.post('/edittenantcat', todoList.edittenantcat);
    app.post('/deltenantcat', todoList.deltenantcat);

    /* Floormaps */
    app.get('/floormaps', todoList.floormaps);
    app.get('/floormapsbyid', todoList.floormapsbyid);
    app.post('/addfloormaps', todoList.addfloormaps);
    app.post('/editfloormaps', todoList.editfloormaps);
    app.post('/delfloormaps', todoList.delfloormaps);

    /* Facilites */
    app.get('/facilities', todoList.facilities);
    app.get('/facilitiesbyid', todoList.facilitiesbyid);
    app.post('/addfacilities', todoList.addfacilities);
    app.post('/editfacilities', todoList.editfacilities);
    app.post('/delfacilities', todoList.delfacilities);

    /* Slider */
    app.get('/slider', todoList.slider);
    app.get('/sliderbyid', todoList.sliderbyid);
    app.post('/addslider', todoList.addslider);
    app.post('/editslider', todoList.editslider);
    app.post('/delslider', todoList.delslider);

    /* Menus */
    app.get('/menus', todoList.menus);
    app.get('/menusbyid', todoList.menusbyid);
    app.post('/addmenus', todoList.addmenus);
    app.post('/editmenus', todoList.editmenus);
    app.post('/delmenus', todoList.delmenus);

    /* Magazine */
    app.get('/magazine', todoList.magazine);
    app.get('/magazinebyid', todoList.magazinebyid);
    app.post('/addmagazine', todoList.addmagazine);
    app.post('/editmagazine', todoList.editmagazine);
    app.post('/delmagazine', todoList.delmagazine);

    /* About Us */
    app.get('/aboutus', todoList.aboutus);
    app.get('/aboutusbyid', todoList.aboutusbyid);
    app.post('/editaboutus', todoList.editaboutus);

    /* Select 2 */
    app.get('/sel2floormaps', todoList.sel2floormaps);
    app.get('/sel2tenant', todoList.sel2tenant);
    app.get('/sel2tenantcat', todoList.sel2tenantcat);

    /* Pelanggan */
    app.get('/pelanggan', todoList.pelanggan);
    app.get('/pelangganbyid', todoList.pelangganbyid);
    app.post('/addpelanggan', todoList.addpelanggan);
    app.post('/editpelanggan', todoList.editpelanggan);
    app.post('/delpelanggan', todoList.delpelanggan);

    /* Tenant Member */
    app.get('/tenantMember', todoList.tenantMember);
    app.get('/tenantMemberbyid', todoList.tenantMemberbyid);
    app.post('/addtenantMember', todoList.addtenantMember);
    app.post('/edittenantMember', todoList.edittenantMember);
    app.post('/deltenantMember', todoList.deltenantMember);

    /* Event Member */
    app.get('/eventMember', todoList.eventMember);
    app.get('/eventMemberbyid', todoList.eventMemberbyid);
    app.post('/addeventMember', todoList.addeventMember);
    app.post('/editeventMember', todoList.editeventMember);
    app.post('/deleventMember', todoList.deleventMember);

    /* Souvenir */
    app.get('/souvenir', todoList.souvenir);
    app.get('/souvenirbyid', todoList.souvenirbyid);
    app.post('/addsouvenir', todoList.addsouvenir);
    app.post('/editsouvenir', todoList.editsouvenir);
    app.post('/delsouvenir', todoList.delsouvenir);

    /* Hadiah */
    app.get('/hadiah', todoList.hadiah);
    app.get('/hadiahbyid', todoList.hadiahbyid);
    app.post('/addhadiah', todoList.addhadiah);
    app.post('/edithadiah', todoList.edithadiah);
    app.post('/delhadiah', todoList.delhadiah);

    /* Bank */
    app.get('/bank', todoList.bank);
    app.get('/bankbyid', todoList.bankbyid);
    app.post('/addbank', todoList.addbank);
    app.post('/editbank', todoList.editbank);
    app.post('/delbank', todoList.delbank);
    app.get('/listbank', todoList.listBank);
    app.get('/listprod', todoList.listProduk);
    app.post('/addkartu', todoList.addKartu);
    app.get('/byidfull', todoList.byidfull);
    app.post('/editkartu', todoList.editkartu);

    /* Earn Points */
    app.get('/earnpoint', todoList.earnpoint);
    app.get('/listmember', todoList.listmember);
    app.get('/listmemberbyid', todoList.listmemberbyid);
    app.get('/listtenant', todoList.listtenant);
    app.get('/listtenantbyid', todoList.listtenantbyid);
    app.post('/addearnpoint', todoList.addearnpoint);

    /* Reedem Points */
    app.get('/reedem', todoList.reedem);
    app.get('/reedembyid', todoList.reedembyid);
    app.get('/reedemitem', todoList.reedemitem);
    app.post('/editreedem', todoList.editreedem);

    /* Setting Point */
    app.get('/get_point_setting', todoList.point_get);
    app.post('/post_point_setting', todoList.point_post);
    app.get('/getsetpoint', todoList.getsetpoint);

    /* News */
    app.get('/news', todoList.news);
    app.get('/newsbyid', todoList.newsbyid);
    app.post('/addnews', todoList.addnews);
    app.post('/editnews', todoList.editnews);
    app.post('/delnews', todoList.delnews);
};