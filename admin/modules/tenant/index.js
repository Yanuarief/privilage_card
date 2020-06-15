let tenant = [
	{
	    path: '/tenant',
		name: 'tenant',
		components: {
			header: httpVueLoader('./modules/layout/header.vue'),
			default: httpVueLoader('./modules/tenant/index.vue'),
			nav: httpVueLoader('./modules/layout/nav.vue'),
			footer: httpVueLoader('./modules/layout/footer.vue'),
		},
		meta: {
			title: 'Rivalinz :: tenant',
		},
	},
	{
		path: '/tenant/add',
		name: 'tenant_action_add',
		components: {
			header: httpVueLoader('./modules/layout/header.vue'),
			default: httpVueLoader('./modules/tenant/add.vue'),
			nav: httpVueLoader('./modules/layout/nav.vue'),
			footer: httpVueLoader('./modules/layout/footer.vue'),
		},
		meta: {
			title: 'Rivalinz :: tenant add',
		},
	},
	{
		path: '/tenant/edit/:id',
		name: 'tenant_action_edit',
		components: {
			header: httpVueLoader('./modules/layout/header.vue'),
			default: httpVueLoader('./modules/tenant/edit.vue'),
			nav: httpVueLoader('./modules/layout/nav.vue'),
			footer: httpVueLoader('./modules/layout/footer.vue'),
		},
		meta: {
			title: 'Rivalinz :: tenant edit',
		},
	}
];

export { tenant };