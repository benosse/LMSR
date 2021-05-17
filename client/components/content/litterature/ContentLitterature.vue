<template>

	<div class="main">

		<ContentAT v-if="id=='AT'" />
		<ContentBL v-else-if="id=='BL'" />
		<ContentBM v-else-if="id=='BM'" />
		<ContentDH v-else-if="id=='DH'" />
		<ContentNM v-else-if="id=='NM'" />
		<ContentSV v-else-if="id=='SV'" />
		<ContentVD v-else-if="id=='VD'" />
		
		
		<div v-else class="width2 left66 gutter">
			<div class="gutter">
				<h1><span class="underlined">Littérature fertile</span></h1>
				<div class="btp-regular">
					<p>
						404
					</p>
					
				</div>
			</div>
		</div> 
	</div>	
</template>


<script>
	import ContentAT from "./ContentAT.vue"
	import ContentBL from "./ContentBL.vue"
	import ContentBM from "./ContentBM.vue"
	import ContentDH from "./ContentDH.vue"
	import ContentNM from "./ContentNM.vue"
	import ContentSV from "./ContentSV.vue"
	import ContentVD from "./ContentVD.vue"

	export default {
		name: "ContentLitterature",

		components: {
			ContentBM,
			ContentAT,
			ContentBL,
			ContentDH,
			ContentNM,
			ContentSV,
			ContentVD
		},

		props: {
			id:String,
		},
	};
</script>


<style scoped lang=less>
	.main {
		background-color: white;

		position:fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;

		overflow-y:scroll;
	}
</style>