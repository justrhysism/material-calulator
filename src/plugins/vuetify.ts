import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { preset } from 'vue-cli-plugin-vuetify-preset-rally/preset';

Vue.use(Vuetify);

export default new Vuetify({
	preset,
	theme: {
		dark: true,
	},
});
