import All from './modules/index.js'
import Req from './controllers/request/index.js'
import Func from './controllers/function/index.js'

export default
$(function() {

    const loc = window.location.pathname;
    const dir = "/member";
    var pathname = loc.replace(dir + "/", "");
    pathname = pathname == "" ? null : pathname;

    const routes = All
    const router = new VueRouter({
        base: dir,
        mode: 'history',
        linkActiveClass: 'active',
        routes
    })

    async function init() {

        if (token == null) {
            this.$router.replace('/')
            $("#app .page-wrapper").addClass(" full-page");
            $("#app .page-content").hide();
        }

        if (token != null && pathname == null) {
            this.$router.replace('/home')
        } else if (token != null) {
            const auth = await axios.get(rest["checking"], {
                headers: {
                    Authorization: token
                }
            });
            var active = auth.data.active;

            if (active == false) {
                localStorage.removeItem('token');
                location.reload();
            }
        }

        Req;
        Func;
    }
    var vm = new Vue({
        router,
        methods: {
            init
        },
        mounted() {
            init.call(this)
        }
    }).$mount('#app')

    vm.$forceUpdate();
});