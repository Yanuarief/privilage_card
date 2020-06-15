let earnpoint = [{
        path: '/earnpoint',
        name: 'earnpoint',
        components: {
            header: httpVueLoader('./modules/layout/header.vue'),
            default: httpVueLoader('./modules/earnpoint/index.vue'),
            nav: httpVueLoader('./modules/layout/nav.vue'),
            footer: httpVueLoader('./modules/layout/footer.vue'),
        },
        meta: {
            title: 'Rivalinz :: earnpoint',
        },
    },
    {
        path: '/earnpoint/add',
        name: 'earnpoint_action_add',
        components: {
            header: httpVueLoader('./modules/layout/header.vue'),
            default: httpVueLoader('./modules/earnpoint/add.vue'),
            nav: httpVueLoader('./modules/layout/nav.vue'),
            footer: httpVueLoader('./modules/layout/footer.vue'),
        },
        meta: {
            title: 'Rivalinz :: earnpoint add',
        },
    },
    {
        path: '/earnpoint/edit/:id',
        name: 'earnpoint_action_edit',
        components: {
            header: httpVueLoader('./modules/layout/header.vue'),
            default: httpVueLoader('./modules/earnpoint/edit.vue'),
            nav: httpVueLoader('./modules/layout/nav.vue'),
            footer: httpVueLoader('./modules/layout/footer.vue'),
        },
        meta: {
            title: 'Rivalinz :: earnpoint edit',
        },
    }
];

export { earnpoint };