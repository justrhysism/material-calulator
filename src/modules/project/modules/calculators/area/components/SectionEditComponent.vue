<template>
	<div>
		<v-text-field
			v-model="value.name"
			label="Name"
			outlined
			prepend-inner-icon="mdi-name"
			placeholder="e.g. Driveway"
		/>

		<SectionValuesEditComponent v-model="value.values">
			<template v-slot:actions-left>
				<slot name="actions-left" />
			</template>
		</SectionValuesEditComponent>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { SectionState } from '@/modules/project/modules/calculators/area/interfaces';
import { getSectionState } from '@/modules/project/modules/calculators/area/utils';
import SectionValuesEditComponent from '@/modules/project/modules/calculators/area/components/SectionValuesEditComponent.vue';

export default defineComponent({
	name: 'SectionEditComponent',
	components: { SectionValuesEditComponent },
	props: {
		value: {
			type: Object as PropType<SectionState>,
			default: () => getSectionState(),
		},
	},
});
</script>

<style scoped lang="scss"></style>
