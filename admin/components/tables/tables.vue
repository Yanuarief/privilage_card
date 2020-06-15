<template>
	    <boxtables
			:heroes="gridData"
			:columns="gridColumns"
			:filter-key="searchQuery">
		</boxtables>
</template>
<script>
module.exports = {
data() {
return {
	searchQuery: '',
	gridColumns: ['no', 'name', 'power'],
	gridData: [
		{ no: 1, name: 'Chuck Norris', power: Infinity },
		{ no: 2, name: 'Bruce Lee', power: 9000 },
		{ no: 3, name: 'Jackie Chan', power: 7000 },
		{ no: 4, name: 'Jet Li', power: 8000 }
	]
}},
mounted: function(){
	if($('#dashboardDate').length) {
		var date = new Date();
		var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		$('#dashboardDate').datepicker({
		format: "dd-MM-yyyy",
		todayHighlight: true,
		autoclose: true
		});
		$('#dashboardDate').datepicker('setDate', today);
	}
}}
</script>