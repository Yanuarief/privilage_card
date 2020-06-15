let tenantcat = [
	{
	    path: '/tenant/tenantcat',
		name: 'tenantcat',
		components: {
			header: httpVueLoader('./modules/layout/header.vue'),
			default: httpVueLoader('./modules/tenantcat/index.vue'),
			nav: httpVueLoader('./modules/layout/nav.vue'),
			footer: httpVueLoader('./modules/layout/footer.vue'),
		},
		meta: {
			title: 'Rivalinz :: tenantcat',
		},
	},
	{
		path: '/tenant/tenantcat/add',
		name: 'tenantcat_action_add',
		components: {
			header: httpVueLoader('./modules/layout/header.vue'),
			default: httpVueLoader('./modules/tenantcat/add.vue'),
			nav: httpVueLoader('./modules/layout/nav.vue'),
			footer: httpVueLoader('./modules/layout/footer.vue'),
		},
		meta: {
			title: 'Rivalinz :: tenantcat add',
		},
	},
	{
		path: '/tenant/tenantcat/edit/:id',
		name: 'tenantcat_action_edit',
		components: {
			header: httpVueLoader('./modules/layout/header.vue'),
			default: httpVueLoader('./modules/tenantcat/edit.vue'),
			nav: httpVueLoader('./modules/layout/nav.vue'),
			footer: httpVueLoader('./modules/layout/footer.vue'),
		},
		meta: {
			title: 'Rivalinz :: tenantcat edit',
		},
	}
];

export { tenantcat };