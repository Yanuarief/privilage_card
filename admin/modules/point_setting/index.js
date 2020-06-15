let point_setting = [{
    path: '/point_setting',
    name: 'point_setting',
    components: {
        header: httpVueLoader('./modules/layout/header.vue'),
        default: httpVueLoader('./modules/point_setting/index.vue'),
        nav: httpVueLoader('./modules/layout/nav.vue'),
        footer: httpVueLoader('./modules/layout/footer.vue'),
    },
    meta: {
        title: 'Rivalinz :: point_setting',
    },
}, ];

export { point_setting };