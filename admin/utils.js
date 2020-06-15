var baseurl = `http://${document.location.host}:3000/`
var token = localStorage.getItem('token')

var rest = {
    loginsu: baseurl + "loginsu",
    logoutsu: baseurl + "logoutsu",
    checking: baseurl + "checking",

    /* Select 2 Value */
    sel2floormaps: baseurl + "sel2floormaps",
    sel2tenant: baseurl + "sel2tenant",
    sel2tenantcat: baseurl + "sel2tenantcat",
    /* End Select 2 Value */

    /* Events */
    events: baseurl + "events",
    addevents: baseurl + "addevents",
    editevents: baseurl + "editevents",
    delevents: baseurl + "delevents",
    eventsbyid: baseurl + "eventsbyid",
    /* End Events */

    /* Promo */
    promo: baseurl + "promo",
    addpromo: baseurl + "addpromo",
    editpromo: baseurl + "editpromo",
    delpromo: baseurl + "delpromo",
    promobyid: baseurl + "promobyid",
    /* End Promo */

    /* Promo */
    tenant: baseurl + "tenant",
    tenantbyid: baseurl + "tenantbyid",
    addtenant: baseurl + "addtenant",
    edittenant: baseurl + "edittenant",
    deltenant: baseurl + "deltenant",
    /* End Promo */

    /* Tenant Category */
    tenantcat: baseurl + "tenantcat",
    tenantcatbyid: baseurl + "tenantcatbyid",
    addtenantcat: baseurl + "addtenantcat",
    edittenantcat: baseurl + "edittenantcat",
    deltenantcat: baseurl + "deltenantcat",
    /* End Tenant Category */

    /* Floormaps */
    floormaps: baseurl + "floormaps",
    floormapsbyid: baseurl + "floormapsbyid",
    addfloormaps: baseurl + "addfloormaps",
    editfloormaps: baseurl + "editfloormaps",
    delfloormaps: baseurl + "delfloormaps",
    /* End Floormaps */

    /* Facilities */
    facilities: baseurl + "facilities",
    facilitiesbyid: baseurl + "facilitiesbyid",
    addfacilities: baseurl + "addfacilities",
    editfacilities: baseurl + "editfacilities",
    delfacilities: baseurl + "delfacilities",
    /* End Facilities */

    /* Slider */
    slider: baseurl + "slider",
    sliderbyid: baseurl + "sliderbyid",
    addslider: baseurl + "addslider",
    editslider: baseurl + "editslider",
    delslider: baseurl + "delslider",
    /* End Slider */

    /* Menus */
    menus: baseurl + "menus",
    menusbyid: baseurl + "menusbyid",
    addmenus: baseurl + "addmenus",
    editmenus: baseurl + "editmenus",
    delmenus: baseurl + "delmenus",
    /* End Menus */

    /* Menus */
    magazine: baseurl + "magazine",
    magazinebyid: baseurl + "magazinebyid",
    addmagazine: baseurl + "addmagazine",
    editmagazine: baseurl + "editmagazine",
    delmagazine: baseurl + "delmagazine",
    /* End Menus */

    /* About Us */
    aboutus: baseurl + "aboutus",
    aboutusbyid: baseurl + "aboutusbyid",
    editaboutus: baseurl + "editaboutus",
    /* End About Us */

    /* Pelanggan */
    pelanggan: baseurl + "pelanggan",
    pelangganbyid: baseurl + "pelangganbyid",
    addpelanggan: baseurl + "addpelanggan",
    editpelanggan: baseurl + "editpelanggan",
    delpelanggan: baseurl + "delpelanggan",
    /* End Pelanggan */

    /* Tenant Member */
    tenantMember: baseurl + "tenantMember",
    tenantMemberbyid: baseurl + "tenantMemberbyid",
    addtenantMember: baseurl + "addtenantMember",
    edittenantMember: baseurl + "edittenantMember",
    deltenantMember: baseurl + "deltenantMember",
    /* End Tenant Member */

    /* Event Member */
    eventMember: baseurl + "eventMember",
    eventMemberbyid: baseurl + "eventMemberbyid",
    addeventMember: baseurl + "addeventMember",
    editeventMember: baseurl + "editeventMember",
    deleventMember: baseurl + "deleventMember",
    /* End Event Member */

    /* Souvenir */
    souvenir: baseurl + "souvenir",
    souvenirbyid: baseurl + "souvenirbyid",
    addsouvenir: baseurl + "addsouvenir",
    editsouvenir: baseurl + "editsouvenir",
    delsouvenir: baseurl + "delsouvenir",
    /* End Souvenir */

    /* Hadiah */
    hadiah: baseurl + "hadiah",
    hadiahbyid: baseurl + "hadiahbyid",
    addhadiah: baseurl + "addhadiah",
    edithadiah: baseurl + "edithadiah",
    delhadiah: baseurl + "delhadiah",
    /* End Hadiah */

    /* Bank */
    bank: baseurl + "bank",
    bankbyid: baseurl + "bankbyid",
    addbank: baseurl + "addbank",
    editbank: baseurl + "editbank",
    delbank: baseurl + "delbank",
    listbank: baseurl + "listbank",
    listprod: baseurl + "listprod",
    addkartu: baseurl + "addkartu",
    byidfull: baseurl + "byidfull",
    editkartu: baseurl + "editkartu",
    /* End Bank */

    /* News */
    earnpoint: baseurl + "earnpoint",
    earnpointbyid: baseurl + "earnpointbyid",
    addearnpoint: baseurl + "addearnpoint",
    editearnpoint: baseurl + "editearnpoint",
    delearnpoint: baseurl + "delearnpoint",
    listmember: baseurl + "listmember",
    listmemberbyid: baseurl + "listmemberbyid",
    listtenant: baseurl + "listtenant",
    listtenantbyid: baseurl + "listtenantbyid",
    /* End News */


    /* Setting Point */
    get_point_setting: baseurl + "get_point_setting",
    post_point_setting: baseurl + "post_point_setting",
    getsetpoint: baseurl + "getsetpoint",
    /* Setting Point */

    /* News */
    news: baseurl + "news",
    newsbyid: baseurl + "newsbyid",
    addnews: baseurl + "addnews",
    editnews: baseurl + "editnews",
    delnews: baseurl + "delnews",
    /* End News */

    uploadimg: "https://jcm.gmscode.net/uimg",
    uploadfile: "https://jcm.gmscode.net/ufile",

}