var token = localStorage.getItem("token")
 	token = token==null?'unbind':'bind'

var login;
switch(token){
    case 'unbind':
        login = [{
			path: '/',
			name: 'login',
			components: {
				login: httpVueLoader('./modules/login/index.vue'),
			},
			meta: {
				title: 'Rivalinz :: Login',
			}
		}];
    break;

    case 'bind':
        login = [{
			path: '/',
			name: 'login',
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
    break;

}

export { login };