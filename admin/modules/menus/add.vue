<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Add menus</h6>
	        <div id="loc-alert"></div>
	        <div id="anjay"></div>
	        <!-- <form method="post" class="forms-sample" id="add-menus" enctype="multipart/form-data" v-on:submit="submitAct($event)">
				<div class="row">
					<div class="col-sm-12">
						<div class="form-group" id="imagedrop">
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
					<button type="submit" class="btn btn-primary mr-2">Add</button>
					<router-link :to="{path: `/menus` }" class="btn btn-light">Cancel</router-link>
		        </div>
	        </form> -->
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
		    $('#loading-submit').show();
		    $('#loading-action').hide();

		    let myForm = document.getElementById('add-menus');
		    const formData = new FormData(myForm);
		   	if(this.file.length>0){
			    const nfl = this.file[0].name.split("."); 
			    const type = nfl[nfl.length-1]
			    	  formData.append("type", type);
				
				const aind = {
	              'Authorization': token
	            }

				const data = await axios.post(rest["addmenus"], formData, {headers: aind});

			   	const aupl = {
			   	  'Content-Type': 'application/json; charset=utf-8',
	              'Authorization': data.data.authupl,
	            }

			    const formFile = new FormData();
			    	  formFile.append("file", this.file[0]);
			    	  formFile.append("name", data.data.data.image);
			    	  formFile.append("path", 'menus/');

				const image = await axios.post(rest["uploadimage"], formFile, {headers: aupl});
				$("#imagedrop .dropify-clear").trigger("click");
				event.target.reset()

				$('#loc-alert').html(`<div class="alert alert-icon-success" role="alert">
				  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
				  Input data success
				  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
				    <span aria-hidden="true">&times;</span>
				  </button>
				</div>`);
			}else{
				$('#loc-alert').html(`<div class="alert alert-icon-danger" role="alert">
				  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
				  Input file image
				  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
				    <span aria-hidden="true">&times;</span>
				  </button>
				</div>`);
			}

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
	},
	mounted(){
		/*console.log($.text('anjay'));*/
		var tvalue = [
			{
				value: 'A',
				name: 'Example 1'
			},
			{
				value: 'B',
				name: 'Example 2'
			},
			{
				value: 'C',
				name: 'Example 3'
			},
			{
				value: 'D',
				name: 'Example 4'
			},
			{
				value: 'E',
				name: 'Example 5'
			}
		];
 		
		var input = [
			$.inpimage('Image', 'image', 'image',this.prepareUpload,['jpg','png','pdf','docx'], 250, 250),
			$.inpcurrency('Currency', 'currency', 'anjay'),
			$.inpemail('Email', 'email', 'anjay'),
			$.inptag('Tag', 'tag', 'tag'),
			$.inptext('Text','text'),
			$.inphidden('Hidden','hidden'),
			$.inppassword('Password','password'),
			$.inpnumber('Number','number'),
			$.inpcheckbox('Checkbox','checkbox', 'checkbox'),
			$.inpradiobox('Radiobox','radiobox', 'radiobox'),
			$.inpselect(`Select`,`select`,`select`,tvalue),
			$.inpselect(`Multi Select`,`multiselect`,`multiselect`,tvalue,true),
			$.inpselect2(`Select2 Ajax`,`select2`,`select2`, `Choose Select2`, rest["sel2floormaps"]),
			$.inpselect2(`Select2 Ajax Multi`,`multiselect2`,`multiselect2`, `Choose Multi Select2`, rest["sel2floormaps"],true),
		]
		var route = this.$router
		$('#anjay').createForm(input,route,'menus');
		/*$('#myDropify').on('change', this.prepareUpload);

	    $('#myDropify').dropify();
		var height_img = parseInt($('#imagedrop .dropify-wrapper').height())+12;
		$('#imagedrop .dropify-wrapper').css('width', `762px`);*/
	}
};
</script>