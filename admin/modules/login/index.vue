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
                                    <div id="loc-alert"></div>
                                    <div class="form-group">
                                        <label for="username">Username</label>
                                        <input name="username" type="text" class="form-control" id="username" placeholder="Username">
                                    </div>
                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input name="password" type="password" class="form-control" id="password" autocomplete="current-password" placeholder="Password">
                                    </div>
                                    <div class="mt-3">
                                        <button id="submit-login" type="submit" v-on:click="fetchSomething($event)" class="btn btn-primary mr-2 mb-2 mb-md-0" style="display: block;">Login</button>
                                        <div class="progress" id="progress-login" style="display: none;">
                                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Please Wait...</div>
                                        </div>
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
        $('#submit-login').hide();
        $('#progress-login').show();
        $('#loc-alert').hide();
        var url = rest["loginsu"];
        let myForm = document.getElementById('form-login');
        let formData = new FormData(myForm);
        const response = await axios.post(url, formData);
        const data = response.data;
        if (data.token != null) {
            localStorage.setItem("token", data.token)
            location.reload();
        } else {
            $('#form-login').trigger('reset');
            $('#username').focus();
            $('#loc-alert').html(`<div class="alert alert-icon-danger" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                Sorry, username and password not valid.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>`);
            $('#loc-alert').show();
            $('#submit-login').show();
            $('#progress-login').hide();
        }
    },
  },
  mounted(){
  }
};
</script>