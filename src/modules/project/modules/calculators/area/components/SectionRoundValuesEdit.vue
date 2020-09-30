<template>
	<v-row no-gutters>
		<v-col>
			<v-row>
				<v-col cols="6">
					<v-text-field
						:value="value.quantity"
						@change="handleChange('quantity', $event)"
						label="Count"
						type="number"
						inputmode="decimal"
						min="0"
						required
						outlined
						prepend-inner-icon="mdi-pound"
					/>
				</v-col>
				<v-col cols="6">
					<v-text-field
						:value="value.diameter"
						@change="handleChange('diameter', $event)"
						label="Width"
						type="number"
						inputmode="decimal"
						min="0"
						required
						suffix="mm"
						outlined
						prepend-inner-icon="mdi-arrow-expand-horizontal"
					/>
				</v-col>
				<v-col cols="6">
					<v-text-field
						:value="value.depth"
						@change="handleChange('depth', $event)"
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
						@change="handleChange('density', $event)"
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
import { formatCalculationSectionRound } from '@/modules/project/modules/calculators/area/utils';
import { SectionRoundValuesState } from '@/modules/project/modules/calculators/area/interfaces';

export default defineComponent({
	name: 'SectionRoundValuesEdit',
	props: {
		totalLabel: {
			type: String,
			default: 'Subtotal',
		},
		value: {
			type: Object as PropType<Partial<SectionRoundValuesState>>,
		},
	},
	setup(props, { emit }) {
		const total = computed<string | null>(() =>
			formatCalculationSectionRound(props.value)
		);

		const handleChange = (
			field: keyof SectionRoundValuesState,
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
