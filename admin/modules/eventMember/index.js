let eventMember = [{
        path: '/eventMember',
        name: 'eventMember',
        components: {
            header: httpVueLoader('./modules/layout/header.vue'),
            default: httpVueLoader('./modules/eventMember/index.vue'),
            nav: httpVueLoader('./modules/layout/nav.vue'),
            footer: httpVueLoader('./modules/layout/footer.vue'),
        },
        meta: {
            title: 'Rivalinz :: eventMember',
        },
    },
    {
        path: '/eventMember/add',
        name: 'eventMember_action_add',
        components: {
            header: httpVueLoader('./modules/layout/header.vue'),
            default: httpVueLoader('./modules/eventMember/add.vue'),
            nav: httpVueLoader('./modules/layout/nav.vue'),
            footer: httpVueLoader('./modules/layout/footer.vue'),
        },
        meta: {
            title: 'Rivalinz :: eventMember add',
        },
    },
    {
        path: '/eventMember/edit/:id',
        name: 'eventMember_action_edit',
        components: {
            header: httpVueLoader('./modules/layout/header.vue'),
            default: httpVueLoader('./modules/eventMember/edit.vue'),
            nav: httpVueLoader('./modules/layout/nav.vue'),
            footer: httpVueLoader('./modules/layout/footer.vue'),
        },
        meta: {
            title: 'Rivalinz :: eventMember edit',
        },
    }
];

export { eventMember };