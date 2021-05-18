<template>

	<div class="main">

		<ContentAlexis v-if="id=='alexis'" />	
		<ContentBastian v-if="id=='bastian'" />	
		<ContentBenoit v-else-if="id=='benoit'" />
		<ContentClara v-else-if="id=='clara'" />
		<ContentDorian v-else-if="id=='dorian'" />
		<ContentFelix v-if="id=='felix'" />	
		<ContentGuy v-else-if="id=='guy'" />
		<ContentInes v-else-if="id=='ines'" />
		<ContentKatja v-else-if="id=='katja'" />
		<ContentLola v-else-if="id=='lola'" />
		<ContentLucas v-else-if="id=='lucas'" />
		<ContentMarc v-else-if="id=='marc'" />
		<ContentMathilde v-else-if="id=='mathilde'" />
		<ContentPauline v-else-if="id=='pauline'" />	
		<ContentValentine v-else-if="id=='valentine'" />

		<div class="width2 left66 gutter back">
			<h2 class="mouseTarget" @click="onClickMainContent">Retour</h2>
		</div> 

	</div>
	
</template>


<script>

	export default {

		props: {
			id:String,
		},

		name: "ContentProjets",

		components: {
		},

		methods: {
			onClickMainContent(){
				if (this.id)
					this.$root.reActivateContent("projets." + this.id.toString());
				else
					this.$root.reActivateContent("projets");
			}
		}
	};
</script>



<style scoped lang=less>

</style>