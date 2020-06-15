let promo = [
	{
	    path: '/promo',
		name: 'promo',
		components: {
			header: httpVueLoader('./modules/layout/header.vue'),
			default: httpVueLoader('./modules/promo/index.vue'),
			nav: httpVueLoader('./modules/layout/nav.vue'),
			footer: httpVueLoader('./modules/layout/footer.vue'),
		},
		meta: {
			title: 'Rivalinz :: promo',
		},
	},
	{
		path: '/promo/add',
		name: 'promo_action_add',
		components: {
			header: httpVueLoader('./modules/layout/header.vue'),
			default: httpVueLoader('./modules/promo/add.vue'),
			nav: httpVueLoader('./modules/layout/nav.vue'),
			footer: httpVueLoader('./modules/layout/footer.vue'),
		},
		meta: {
			title: 'Rivalinz :: promo Add',
		},
	},
	{
		path: '/promo/edit/:id',
		name: 'promo_action_edit',
		components: {
			header: httpVueLoader('./modules/layout/header.vue'),
			default: httpVueLoader('./modules/promo/edit.vue'),
			nav: httpVueLoader('./modules/layout/nav.vue'),
			footer: httpVueLoader('./modules/layout/footer.vue'),
		},
		meta: {
			title: 'Rivalinz :: promo Edit',
		},
	}
];

export { promo };