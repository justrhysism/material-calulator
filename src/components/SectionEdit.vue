<template>
	<v-row no-gutters>
		<v-col>
			<v-row>
				<v-col cols="6">
					<v-text-field
						v-model="value.length"
						@input="updateValue('length', $event.target.value)"
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
						@input="updateValue('width', $event.target.value)"
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
						@input="updateValue('depth', $event.target.value)"
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
						@input="updateValue('cube', $event.target.value)"
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
import { computed, defineComponent, toRefs } from '@vue/composition-api';
import {
	calculateSection,
	formatCalculationSection,
	getSectionValues,
} from '@/helpers/calculator';
import { SectionValuesState } from '@/store/modules/project/interfaces';

export default defineComponent({
	name: 'SectionEdit',
	props: {
		totalLabel: {
			type: String,
			default: 'Subtotal',
		},
		value: {
			type: Object,
			default: getSectionValues(),
		},
	},
	setup(props, { emit }) {
		const { value, totalLabel } = props;

		const total = computed<string | null>(() =>
			formatCalculationSection(value as SectionValuesState)
		);

		const updateValue = (key: keyof SectionValuesState, val: string) =>
			emit('input', {
				...value,
				[key]: val,
			});

		return { value, total, totalLabel, updateValue };
	},
});
</script>

<style scoped></style>
