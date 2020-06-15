export default $(function(){
	Vue.component('boxtables', {
		template: `<div class="row">
					<div class="col-lg-12 grid-margin stretch-card">
						<div class="card">
						<div class="card-body">
							<div class="row">
								<div class="col-md-6">
									<h4 class="card-title">{{ titleTxt }}</h4>
								</div>
								<div class="col-md-6">
									<form class="float-right" id="search">
										Search <input name="query">
									</form>
								</div>
							</div>
							<div class="table-responsive pt-3">
							<table class="table table-dark">
								<thead id="this_column">
								</thead>
								<tbody id="this_tables">
								</tbody>
							</table>
							<div class="mt-3">
								<a href="#" class="btn btn-danger btn-icon-text">
									<i class="btn-icon-prepend" data-feather="trash"></i>
									Delete Selected
								</a>
							</div>
							</div>
						</div>
						</div>
					</div>
				</div>`,
		props: {
			title: String,
			urldata: String,
			columns: Array,
		},
		data: function () {
			return {
				titleTxt: this.title,
				contentTxt: this.content,
			}
		},
		computed: {
			showtitle: function(){
				return this.title
			}
		},
		filters: {
			capitalize: function (str) {
				return str.charAt(0).toUpperCase() + str.slice(1)
			}
		},
		methods: {
			
		},
		mounted: async function(){
			var columns = this.columns

			var title = ''
			if(columns!=null && columns.length>0){
				for(var i = 0; i < columns.length; i++){
	                title += `<th>${columns[i]}</th>`;
	            }
	            title = `<tr>
	                <th width="2%"><input type="checkbox" value="0" id="checkall"></th>
	                ${title}
	                <th width="8%">ACTION</th>
	            </tr>`
	            $('#this_column').html(title);

	            const list = await axios.get(this.urldata)
		        const datas = list.data;
		        console.log(datas);
		        var body = '';

		        if(datas["data"]!=null && datas["data"].length>0){
		        	for(var i = 0; i < datas['data'].length; i++){
			            body += `<tr>
	                        <td><input type="checkbox" class="checkbyitem" id="checkbyitem" data-id="${datas['data'][i].id}"></td>
	                        <td>${datas['data'][i].events}</td>
	                        <td>${datas['data'][i].floormaps.full_name}</td>
	                        <td>
	                            <a href="#" class="btn btn-xs btn-success btn-icon-text">Edit</a> | <a href="#" class="btn btn-xs btn-danger btn-icon-text">Delete</a>
	                        </td>
	                    </tr>`; 
	                }
		        }else{
		            body += `<tr><td colspan="${(columns.length+2)}" style="text-align:center;"><b>Sorry data not available!</b></td></tr>`;
		        }

	            $('#this_tables').html(body);
	        }

			
			/*<tr v-for="entry in showdatas">
				<td><input type="checkbox" class="checkbyitem" id="checkbyitem" :data-id=""></td>
				<td v-for="key in columns">
				{{entry[key]}}
				</td>
				<td><a href="#" class="btn btn-xs btn-success btn-icon-text">Edit</a> | <a href="#" class="btn btn-xs btn-danger btn-icon-text">Delete</a> </td>
			</tr>*/
		}
	})

	Vue.component('texteditor', {
		template: `<div v-bind:id="nameStr">{{contentStr}}</div>`,
		props: {
			name: String,
			content: String
		},
		data: function () {
			console.log(this.name);
			return {
			nameStr: this.name,
			contentStr: this.content
			}
		},
		mounted: function(){
			ClassicEditor
			.create( document.querySelector( '#'+this.nameStr ) )
			.then( editor => {
					console.log( editor );
			} )
			.catch( error => {
					console.error( error );
			} );
		}
	})
})