<template>
	<v-row no-gutters>
		<v-col>
			<v-row>
				<v-col cols="6">
					<v-text-field
						v-model="value.length"
						label="Length"
						type="number"
						inputmode="decimal"
						min="0"
						required
						suffix="m"
						outlined
						prepend-inner-icon="mdi-arrow-expand-vertical"
					/>
				</v-col>
				<v-col cols="6">
					<v-text-field
						v-model="value.width"
						label="Width"
						type="number"
						inputmode="decimal"
						min="0"
						required
						suffix="m"
						outlined
						prepend-inner-icon="mdi-arrow-expand-horizontal"
					/>
				</v-col>
				<v-col cols="6">
					<v-text-field
						v-model="value.depth"
						label="Depth"
						type="number"
						inputmode="decimal"
						min="0"
						required
						suffix="mm"
						outlined
						prepend-inner-icon="mdi-arrow-expand-down"
					/>
				</v-col>
				<v-col cols="6">
					<v-text-field
						v-model="value.cube"
						label="Cube"
						type="number"
						inputmode="decimal"
						min="0"
						required
						suffix="t/m3"
						outlined
						prepend-inner-icon="mdi-arrow-expand-down"
					/>
				</v-col>
			</v-row>
			<v-row align="end">
				<v-col cols="6">
					<slot name="actions-left" />
				</v-col>
				<v-col cols="6">
					<div class="text-right">
						<h3 class="subtitle-2">{{ totalLabel }}:</h3>
						<span class="display-1">{{ total }}</span>
					</div>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api';
import {
	formatCalculationSection,
	getSectionValues,
} from '@/modules/project/modules/calculators/area/utils';
import { SectionValuesState } from '@/modules/project/modules/calculators/area/interfaces';

export default defineComponent({
	name: 'SectionValuesEditComponent',
	props: {
		totalLabel: {
			type: String,
			default: 'Subtotal',
		},
		value: {
			type: Object as PropType<SectionValuesState>,
			default: getSectionValues(),
		},
	},
	setup(props) {
		const total = computed<string | null>(() =>
			formatCalculationSection(props.value)
		);

		return { total };
	},
});
</script>

<style scoped></style>
