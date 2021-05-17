<template>


	<ContentAlexis v-if="id=='alexis'" />	
	<ContentBenoit v-else-if="id=='benoit'" />
	<ContentClara v-else-if="id=='clara'" />
	<ContentDorian v-else-if="id=='dorian'" />
	<ContentGuy v-else-if="id=='guy'" />
	<ContentInes v-else-if="id=='ines'" />
	<ContentKatja v-else-if="id=='katja'" />
	<ContentLola v-else-if="id=='lola'" />
	<ContentLucas v-else-if="id=='lucas'" />
	<ContentMarc v-else-if="id=='marc'" />
	<ContentMathilde v-else-if="id=='mathilde'" />
	<ContentValentine v-else-if="id=='valentine'" />

	<div v-else class="width2 left66 gutter">
		<div class="gutter">
			<h1><span class="underlined">Les Projets</span></h1>
			<p>
				404
			</p>
		</div>
	</div> 	
	
</template>


<script>
	import ContentInes from "./ContentInes.vue"
	import ContentAlexis from "./ContentAlexis.vue"
	import ContentGuy from "./ContentGuy.vue"
	import ContentBenoit from "./ContentBenoit.vue"
	import ContentKatja from "./ContentKatja.vue"
	import ContentLucas from "./ContentLucas.vue"
	import ContentValentine from "./ContentValentine.vue"

	export default {

		props: {
			id:String,
		},

		name: "ContentProjets",

		components: {
			ContentInes,
			ContentAlexis,
			ContentGuy,
			ContentBenoit,
			ContentKatja,
			ContentLucas,
			ContentValentine,
		},
	};
</script>



<style scoped lang=less>
</style>