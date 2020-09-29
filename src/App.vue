<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<div class="d-flex align-center">Material Calculator</div>

			<v-spacer></v-spacer>

			<div>v{{ this.version }}</div>
			<!--			<v-btn-->
			<!--				href="https://github.com/vuetifyjs/vuetify/releases/latest"-->
			<!--				target="_blank"-->
			<!--				text-->
			<!--			>-->
			<!--				<span class="mr-2">Latest Release</span>-->
			<!--				<v-icon>mdi-open-in-new</v-icon>-->
			<!--			</v-btn>-->
		</v-app-bar>

		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { version } from '../package.json';

export default Vue.extend({
	name: 'App',

	components: {},

	data: () => ({
		version,
	}),
});
</script>
