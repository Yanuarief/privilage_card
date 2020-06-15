<template>
    <div class="page-content d-flex align-items-center justify-content-center">
        <div class="row w-100 mx-0 auth-page">
            <div class="col-md-8 col-xl-4 mx-auto">
                <div class="card">
                    <div class="row">
                        <div class="col-md-12 pl-md-0">
                            <div class="auth-form-wrapper px-4 py-4">
                                <span class="noble-ui-logo logo-light d-block mb-1">Admin<span>istrator</span></span>
                                <h5 class="text-muted font-weight-normal mb-4">Welcome back! Log in to your account.</h5>
                                <form method="post" class="forms-sample" id="form-login" enctype="multipart/form-data">
                                    <div class="form-group">
                                        <label for="username">Username</label>
                                        <input name="username" type="text" class="form-control" id="username" placeholder="Username">
                                    </div>
                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input name="password" type="password" class="form-control" id="password" autocomplete="current-password" placeholder="Password">
                                    </div>
                                    <div class="mt-3">
                                        <button type="submit" v-on:click="fetchSomething($event)" class="btn btn-primary mr-2 mb-2 mb-md-0">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

module.exports = {
   methods: {
    fetchSomething: async function(event) {
        event.preventDefault();
        var url = rest["loginsu"];
        let myForm = document.getElementById('form-login');
        let formData = new FormData(myForm);
        const response = await axios.post(url, formData);
        const data = response.data;
        if(data.token!=null){
            localStorage.setItem("token", data.token)
            location.reload();
        }
    },
  },
  mounted(){
    /*if(token!=null){
        window.applicationCache.swapCache();
        location.reload(true);
    }*/
  }
};
</script>