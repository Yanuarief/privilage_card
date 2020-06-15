<template>
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h6 class="card-title">About Us</h6>
            <div id="form-input"></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

module.exports = {
    data() {
        return {
        }
    },
    computed:{
    },
    methods: {
    },
    mounted: async function(){

        const edit = await axios.get(rest["aboutusbyid"] + `?id=1`);
        var datas = edit.data.data

        var vue = this
        var act = {
            id: 1,
            api: rest["editaboutus"],
            vue: vue,
            action: 'edit',
            back: 'tenantcat'
        }

        $('#form-input').createForm(act,
        [
            $.inpimage('Image', 'image', 'image',true, {
                path: 'aboutus',
                accept: ['jpg','png','jpeg'],
                height: 250,
                width: 250,
                value: datas.image.large,
            }),
            $.inptext('Title','title','title',true,{
                placeholder: 'Title',
                value: datas.title
            }),
            $.inpckeditor('Description','description','description',false,{
                placeholder: 'Description',
                value: datas.description
            }),
        ]);
    }
};
</script>