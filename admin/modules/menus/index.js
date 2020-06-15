let menus = [
	{
	    path: '/menus',
		name: 'menus',
		components: {
			header: httpVueLoader('./modules/layout/header.vue'),
			default: httpVueLoader('./modules/menus/index.vue'),
			nav: httpVueLoader('./modules/layout/nav.vue'),
			footer: httpVueLoader('./modules/layout/footer.vue'),
		},
		meta: {
			title: 'Rivalinz :: menus',
		},
	},
	{
		path: '/menus/:action',
		name: 'menus_action_add',
		components: {
			header: httpVueLoader('./modules/layout/header.vue'),
			default: httpVueLoader('./modules/menus/add.vue'),
			nav: httpVueLoader('./modules/layout/nav.vue'),
			footer: httpVueLoader('./modules/layout/footer.vue'),
		},
		meta: {
			title: 'Rivalinz :: menus Add',
		},
	},
	{
		path: '/menus/:action/:id',
		name: 'menus_action_edit',
		components: {
			header: httpVueLoader('./modules/layout/header.vue'),
			default: httpVueLoader('./modules/menus/edit.vue'),
			nav: httpVueLoader('./modules/layout/nav.vue'),
			footer: httpVueLoader('./modules/layout/footer.vue'),
		},
		meta: {
			title: 'Rivalinz :: menus Edit',
		},
	}
];

export { menus };