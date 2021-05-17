<template>
	<div class="menuEntry">
		<a 
			class="mouseTarget"
			@click="onClick"
			:class="{hovered:isHovered, active:isActive}"
			>{{text}}
		</a>

		<template v-if="isOpen">
			<slot name="children"></slot>
		</template>	


	</div>
</template>

<script>
export default {
	name: "MenuEntry",

	props:["text", "target", "currentContent", "hoveredContent"],

	data(){
		return {	
			isOpen:false,
		}
	},

	computed: {
		isActive:function(){
			if (this.currentContent == null)
			return false;

			const split = this.currentContent.split(".");

			return (this.target == this.currentContent
				|| this.target == split[0]);
		},

		isHovered:function(){
			if (this.hoveredContent == null)
			return false;

			const split = this.hoveredContent.split(".");

			return (this.target == this.hoveredContent
				|| this.target == split[0]);
		},
	},

    methods: {

		onClick(){
			this.$emit("click")
		},

		open(){
			this.isOpen = true;
		},

		close(){
			this.isOpen = false;
		}
    }
};
</script>


<style scoped lang="less">
	a:hover, .hovered, .active {
		font-family: 'BTP regular';
		line-height: 1;
	}
</style>