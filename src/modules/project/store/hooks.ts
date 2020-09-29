/**
 * Project State Hooks
 */

import { reactive, Ref, toRefs } from '@vue/composition-api';
import { ProjectState } from '@/modules/project/interfaces';
import { AreaState } from '@/modules/project/modules/calculators/area/interfaces';

const state = reactive<ProjectState>({ areas: [] });

export const useProjectState = (
	initialState?: ProjectState
): { areas: Ref<AreaState[]> } => {
	if (initialState) {
		state.areas = initialState.areas;
	}

	return { ...toRefs(state) };
};
