import Vue from 'vue';
import Vuex from 'vuex';

import { projectModule as project } from './modules/project';
import { AppState } from '@/store/interfaces';

Vue.use(Vuex);

export default new Vuex.Store<AppState>({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		project,
	},
});
