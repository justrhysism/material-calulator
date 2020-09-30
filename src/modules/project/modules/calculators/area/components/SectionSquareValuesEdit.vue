<template>
	<v-row no-gutters>
		<v-col>
			<v-row>
				<v-col cols="6">
					<v-text-field
						:value="value.length"
						@input="handleChange('length', $event)"
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
						:value="value.width"
						@input="handleChange('width', $event)"
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
						:value="value.depth"
						@input="handleChange('depth', $event)"
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
						:value="value.density"
						@input="handleChange('density', $event)"
						label="Density"
						type="number"
						inputmode="decimal"
						min="0"
						required
						suffix="t/m3"
						outlined
						prepend-inner-icon="mdi-gradient"
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
import { formatCalculationSectionSquare } from '@/modules/project/modules/calculators/area/utils';
import { SectionSquareValuesState } from '@/modules/project/modules/calculators/area/interfaces';

export default defineComponent({
	name: 'SectionSquareValuesEdit',
	props: {
		totalLabel: {
			type: String,
			default: 'Subtotal',
		},
		value: {
			type: Object as PropType<Partial<SectionSquareValuesState>>,
		},
	},
	setup(props, { emit }) {
		const total = computed<string | null>(() =>
			formatCalculationSectionSquare(props.value)
		);

		const handleChange = (
			field: keyof SectionSquareValuesState,
			input: string
		) => {
			const value = parseFloat(input);
			if (Number.isNaN(value)) return;

			emit('input', {
				...props.value,
				[field]: value,
			});
		};

		return { total, handleChange };
	},
});
</script>

<style scoped></style>
