<script lang="ts" setup>
import TheToaster from '@/components/TheToaster.vue';
</script>

<template>
	<div class="app">
		<routerView></routerView>
		<TheToaster></TheToaster>
	</div>
</template>

<style lang="scss">
body {
	font-family: 'Montserrat', sans-serif;
	background: #bccdcfb3;
}
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
</style>
