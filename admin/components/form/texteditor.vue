<template>
	<texteditor
        :name="nameStr"
        :content="contentStr"
    ></texteditor>
</template>
<script>
module.exports = {
    data() {
    return {
            nameStr: 'texteditor_aja',
            contentStr: 'Salam Hebat 2020'
        }
    },
    /* mounted: function(){
        ClassicEditor
        .create( document.querySelector( '#'+this.nameStr ) )
        .then( editor => {
                console.log( editor );
        } )
        .catch( error => {
                console.error( error );
        } );
    } */
};
</script>
<style>
    .ck.ck-editor__main p {
        color: #000;
    }
</style>