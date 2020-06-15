let bank = [{
        path: '/bank',
        name: 'bank',
        components: {
            header: httpVueLoader('./modules/layout/header.vue'),
            default: httpVueLoader('./modules/bank/index.vue'),
            nav: httpVueLoader('./modules/layout/nav.vue'),
            footer: httpVueLoader('./modules/layout/footer.vue'),
        },
        meta: {
            title: 'Rivalinz :: bank',
        },
    },
    {
        path: '/bank/add',
        name: 'bank_action_add',
        components: {
            header: httpVueLoader('./modules/layout/header.vue'),
            default: httpVueLoader('./modules/bank/add.vue'),
            nav: httpVueLoader('./modules/layout/nav.vue'),
            footer: httpVueLoader('./modules/layout/footer.vue'),
        },
        meta: {
            title: 'Rivalinz :: bank add',
        },
    },
    {
        path: '/bank/edit/:id',
        name: 'bank_action_edit',
        components: {
            header: httpVueLoader('./modules/layout/header.vue'),
            default: httpVueLoader('./modules/bank/edit.vue'),
            nav: httpVueLoader('./modules/layout/nav.vue'),
            footer: httpVueLoader('./modules/layout/footer.vue'),
        },
        // props(route) {
        //     return { id: route.query.idedit }
        // },
        meta: {
            title: 'Rivalinz :: bank edit',
        },
    },
    {
        path: '/bank/add_kartu',
        name: 'bank_action_add_kartu',
        components: {
            header: httpVueLoader('./modules/layout/header.vue'),
            default: httpVueLoader('./modules/bank/addkartu.vue'),
            nav: httpVueLoader('./modules/layout/nav.vue'),
            footer: httpVueLoader('./modules/layout/footer.vue'),
        },
        meta: {
            title: 'Rivalinz :: bank add kartu',
        },
    },
    {
        path: '/bank/edit_kartu/:id',
        name: 'bank_action_edit_kartu',
        components: {
            header: httpVueLoader('./modules/layout/header.vue'),
            default: httpVueLoader('./modules/bank/editkartu.vue'),
            nav: httpVueLoader('./modules/layout/nav.vue'),
            footer: httpVueLoader('./modules/layout/footer.vue'),
        },
        meta: {
            title: 'Rivalinz :: bank edit kartu',
        },
    },
];

export { bank };