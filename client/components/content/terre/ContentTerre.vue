<template>
	<div class="main">
		<ContentPoleTerre v-if="id == 'poleTerre'" />
		<ContentJardinPunk v-if="id == 'jardinPunk'" />
	</div>
</template>


<script>
export default {
	props: {
		id: String,
	},

	name: "ContentTerre",

	components: {},


	watch: {
		id: function () {
			this.$el.scrollTop = 0;
		},
	},
};
</script>



<style scoped lang=less>
</style>