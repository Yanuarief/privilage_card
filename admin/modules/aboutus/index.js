let aboutus = [
	{
	    path: '/aboutus',
		name: 'aboutus',
		components: {
			header: httpVueLoader('./modules/layout/header.vue'),
			default: httpVueLoader('./modules/aboutus/index.vue'),
			nav: httpVueLoader('./modules/layout/nav.vue'),
			footer: httpVueLoader('./modules/layout/footer.vue'),
		},
		meta: {
			title: 'Rivalinz :: aboutus',
		},
	},
];

export { aboutus };