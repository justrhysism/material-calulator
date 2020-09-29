/**
 * Project Repository Store
 */

import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { AppState } from '@/store/interfaces';
import { ProjectState } from '@/modules/project/interfaces';

//#region Mutation Types

//#endregion

const state: ProjectState = {
	areas: [],
};

const getters: GetterTree<ProjectState, AppState> = {};

const mutations: MutationTree<ProjectState> = {};

const actions: ActionTree<ProjectState, AppState> = {};

export const projectModule = {
	namespace: true,
	state,
	getters,
	mutations,
	actions,
};
