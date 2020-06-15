let pelanggan = [{
        path: '/pelanggan',
        name: 'pelanggan',
        components: {
            header: httpVueLoader('./modules/layout/header.vue'),
            default: httpVueLoader('./modules/pelanggan/index.vue'),
            nav: httpVueLoader('./modules/layout/nav.vue'),
            footer: httpVueLoader('./modules/layout/footer.vue'),
        },
        meta: {
            title: 'Rivalinz :: pelanggan',
        },
    },
    {
        path: '/pelanggan/add',
        name: 'pelanggan_action_add',
        components: {
            header: httpVueLoader('./modules/layout/header.vue'),
            default: httpVueLoader('./modules/pelanggan/add.vue'),
            nav: httpVueLoader('./modules/layout/nav.vue'),
            footer: httpVueLoader('./modules/layout/footer.vue'),
        },
        meta: {
            title: 'Rivalinz :: pelanggan add',
        },
    },
    {
        path: '/pelanggan/edit/:id',
        name: 'pelanggan_action_edit',
        components: {
            header: httpVueLoader('./modules/layout/header.vue'),
            default: httpVueLoader('./modules/pelanggan/edit.vue'),
            nav: httpVueLoader('./modules/layout/nav.vue'),
            footer: httpVueLoader('./modules/layout/footer.vue'),
        },
        meta: {
            title: 'Rivalinz :: pelanggan edit',
        },
    }
];

export { pelanggan };