/**
 * Vuex Project Store
 */

import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { AppState } from '@/store/interfaces';
import { ProjectState } from '@/store/modules/project/interfaces';

//#region Mutation Types
export const CREATE_AREA = 'CREATE_AREA';
export const REMOVE_AREA = 'REMOVE_AREA';
export const DELETE_AREA = 'DELETE_AREA';
//#endregion

const state: ProjectState = {
	areas: [],
};

const getters: GetterTree<ProjectState, AppState> = {};

const mutations: MutationTree<ProjectState> = {
	[CREATE_AREA]: (state, payload) => {},
};

const actions: ActionTree<ProjectState, AppState> = {};

export const projectModule = {
	namespace: true,
	state,
	getters,
	mutations,
	actions,
};
