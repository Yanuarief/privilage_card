let home = [{
	path: '/home',
	name: 'home',
	components: {
		header: httpVueLoader('./modules/layout/header.vue'),
		default: httpVueLoader('./modules/home/index.vue'),
		nav: httpVueLoader('./modules/layout/nav.vue'),
		footer: httpVueLoader('./modules/layout/footer.vue'),
	},
	meta: {
		title: 'Rivalinz :: Home',
	}
}];

export { home };