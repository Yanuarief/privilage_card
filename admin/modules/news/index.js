let news = [{
        path: '/news',
        name: 'news',
        components: {
            header: httpVueLoader('./modules/layout/header.vue'),
            default: httpVueLoader('./modules/news/index.vue'),
            nav: httpVueLoader('./modules/layout/nav.vue'),
            footer: httpVueLoader('./modules/layout/footer.vue'),
        },
        meta: {
            title: 'Rivalinz :: news',
        },
    },
    {
        path: '/news/add',
        name: 'news_action_add',
        components: {
            header: httpVueLoader('./modules/layout/header.vue'),
            default: httpVueLoader('./modules/news/add.vue'),
            nav: httpVueLoader('./modules/layout/nav.vue'),
            footer: httpVueLoader('./modules/layout/footer.vue'),
        },
        meta: {
            title: 'Rivalinz :: news add',
        },
    },
    {
        path: '/news/edit/:id',
        name: 'news_action_edit',
        components: {
            header: httpVueLoader('./modules/layout/header.vue'),
            default: httpVueLoader('./modules/news/edit.vue'),
            nav: httpVueLoader('./modules/layout/nav.vue'),
            footer: httpVueLoader('./modules/layout/footer.vue'),
        },
        meta: {
            title: 'Rivalinz :: news edit',
        },
    }
];

export { news };