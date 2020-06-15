let login = [{
	path: '/',
	name: 'login',
	components: {
		login: httpVueLoader('./modules/login/index.vue'),
	},
	meta: {
		title: 'Rivalinz :: Login',
	}
}];

export { login };