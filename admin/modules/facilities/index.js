let facilities = [
	{
	    path: '/facilities',
		name: 'facilities',
		components: {
			header: httpVueLoader('./modules/layout/header.vue'),
			default: httpVueLoader('./modules/facilities/index.vue'),
			nav: httpVueLoader('./modules/layout/nav.vue'),
			footer: httpVueLoader('./modules/layout/footer.vue'),
		},
		meta: {
			title: 'Rivalinz :: facilities',
		},
	},
	{
		path: '/facilities/:action',
		name: 'facilities_action_add',
		components: {
			header: httpVueLoader('./modules/layout/header.vue'),
			default: httpVueLoader('./modules/facilities/add.vue'),
			nav: httpVueLoader('./modules/layout/nav.vue'),
			footer: httpVueLoader('./modules/layout/footer.vue'),
		},
		meta: {
			title: 'Rivalinz :: facilities add',
		},
	},
	{
		path: '/facilities/:action/:id',
		name: 'facilities_action_edit',
		components: {
			header: httpVueLoader('./modules/layout/header.vue'),
			default: httpVueLoader('./modules/facilities/edit.vue'),
			nav: httpVueLoader('./modules/layout/nav.vue'),
			footer: httpVueLoader('./modules/layout/footer.vue'),
		},
		meta: {
			title: 'Rivalinz :: facilities edit',
		},
	}
];

export { facilities };