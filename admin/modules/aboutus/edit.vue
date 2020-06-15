<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Edit menus</h6>
	        <div id="loc-alert"></div>
	        <form method="post" class="forms-sample" id="edit-menus" enctype="multipart/form-data" v-on:submit="submitAct($event)">
				<div class="row">
					<div class="col-sm-12">
						<div class="form-group" id="imagedrop" style="display:none;">
							<label>Image</label>
						    <input type="file" name="images" id="myDropify" data-height="250" class="border" accept=".png, .jpg, .jpeg"/>
		                </div>
	                </div>
	            </div>
				<div class="form-group">
					<label>Title</label>
					<input type="text" name="title" class="form-control" autocomplete="off" placeholder="Title" required>
				</div>
				<div id="loading-submit" style="display:none;">
					<div class="progress">
					  <div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
					</div>
				</div>
				<div id="loading-action" style="display:show;">
					<button type="submit" class="btn btn-primary mr-2">Edit</button>
					<router-link :to="{path: `/menus` }" class="btn btn-light">Cancel</router-link>
		        </div>
	        </form>
	      </div>
	    </div>
	  </div>
	</div>
</template>

<script>

module.exports = {
	data() {
		return {
		  file: [],
		}
	},
	computed:{
	    values(){
	        return {
	            file: this.file
	        }
	    }
	},
	methods: {
		submitAct: async function(event) {
		    event.preventDefault();
		    /*
    		for (var pair of formData.entries()) {
			    console.log(pair[0]+ ', ' + pair[1]); 
			}*/
		    $('#loading-submit').show();
		    $('#loading-action').hide();
		    

		    let myForm = document.getElementById('edit-menus');
		    const formData = new FormData(myForm);
		    if(this.file.length>0){
			    const nfl = this.file[0].name.split("."); 
			    const type = nfl[nfl.length-1]
			    	  formData.append("type", type);
			}
			const aind = {
              'Authorization': token
            }

			const data = await axios.post(rest["editmenus"] + `?id=${this.$route.params.id}`, formData, {headers: aind});

		   	const aupl = {
		   	  'Content-Type': 'application/json; charset=utf-8',
              'Authorization': data.data.authupl,
            }

            if(this.file.length>0){
			    const formFile = new FormData();
			    	  formFile.append("file", this.file[0]);
			    	  formFile.append("name", data.data.data.image);
			    	  formFile.append("path", 'menus/');

				const image = await axios.post(rest["uploadimage"], formFile, {headers: aupl});
			}

			$('#loc-alert').html(`<div class="alert alert-icon-success" role="alert">
			  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
			  Update data success
			  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
			    <span aria-hidden="true">&times;</span>
			  </button>
			</div>`);

		    $('#loading-submit').hide();
		    $('#loading-action').show();

		    $('html, body').animate({
		        scrollTop: $(".page-content").offset().top-60
		    }, 500);
		    
		},
		prepareUpload(event)
	    {
	        this.file = event.target.files;
	    }
		/*FileUpdate: async function(files){
			this.file = files.map(files => files.file);
		}*/
	},
	mounted: async function(){

		$('#myDropify').on('change', this.prepareUpload);

		const edit = await axios.get(rest["menusbyid"] + `?id=${this.$route.params.id}`);
		var single_data = edit.data.data

		$('input[name=title]').val($('<div/>').html(single_data.title).text())

		$('#myDropify').data('default-file', `${single_data.image.original}`);
		$('#myDropify').dropify();
		var height_img = parseInt($('#imagedrop .dropify-wrapper').height())+12;
		$('#imagedrop .dropify-wrapper').css('width', `762px`);
		$('#imagedrop').show();
	}
};
</script>