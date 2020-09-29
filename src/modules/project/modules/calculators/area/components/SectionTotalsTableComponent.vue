<template>
	<v-simple-table class="totals-table">
		<template v-slot:default>
			<thead>
				<tr>
					<th>Section</th>
					<th class="text-center">L x W x D x C</th>
					<th class="text-right">Subtotal</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(section, index) in sections" :key="index">
					<td>
						{{ (section.name || '').trim() || `Section ${index + 1}` }}
					</td>
					<td class="text-center">
						{{ presentDimensions(section.values) }}
					</td>
					<td class="text-right">
						{{ formatCalculationSection(section.values) }}
					</td>
				</tr>
			</tbody>
		</template>
	</v-simple-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { formatCalculationSection } from '@/modules/project/modules/calculators/area/utils';
import {
	SectionState,
	SectionValuesState,
} from '@/modules/project/modules/calculators/area/interfaces';

export default defineComponent({
	name: 'SectionTotalsTableComponent',
	props: {
		sections: {
			type: Array as PropType<SectionState[]>,
			required: true,
		},
	},
	setup() {
		return {
			formatCalculationSection,

			presentDimensions(values: SectionValuesState): string {
				const depthParsed = parseFloat(values.depth);
				const depth = Number.isNaN(depthParsed) ? '-' : depthParsed / 1000;
				const { length, width, cube } = values;

				return `${length || '-'} x ${width || '-'} x ${depth} x ${cube || '-'}`;
			},
		};
	},
});
</script>

<style scoped lang="scss">
.totals-table {
	td,
	th {
		&:first-child {
			padding-left: 0;
		}

		&:last-child {
			padding-right: 0;
		}
	}
}
</style>
