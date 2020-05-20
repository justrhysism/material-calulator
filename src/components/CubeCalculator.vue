<template>
	<v-container>
		<v-row>
			<v-col>
				<v-expansion-panels :mandatory="area.sections.length === 1">
					<v-expansion-panel
						v-for="(section, index) in area.sections"
						:key="index"
					>
						<v-expansion-panel-header
							expand-icon="mdi-pencil"
							disable-icon-rotate
						>
							<template v-slot:default="{ open }">
								<v-row no-gutters>
									<v-col cols="9">
										<v-fade-transition leave-absolute>
											<span v-if="open" key="0">
												Section
											</span>
											<span v-else key="1">
												{{
													(section.label || '').trim() || `Section ${index + 1}`
												}}
											</span>
										</v-fade-transition>
									</v-col>
									<v-col cols="3" class="text-right pr-3">
										<v-fade-transition leave-absolute>
											<span v-if="!open" key="0">
												{{ formatCalculationSection(section.values) }}
											</span>
										</v-fade-transition>
									</v-col>
								</v-row>
							</template>
						</v-expansion-panel-header>
						<v-expansion-panel-content>
							<v-text-field
								v-model="area.sections[index].label"
								label="Name"
								outlined
								prepend-inner-icon="mdi-label"
								placeholder="e.g. Driveway"
							/>
							<CubeCalculatorSectionForm v-model="area.sections[index].values">
								<template v-slot:actions-left>
									<div v-if="area.sections.length > 1">
										<v-btn
											v-if="confirmDeleteIndex === index"
											outlined
											color="error"
											@click="deleteSection(index)"
										>
											<v-icon left>mdi-delete-outline</v-icon>
											Confirm Delete?
										</v-btn>
										<v-btn
											v-else
											icon
											tile
											outlined
											color="error"
											@click="confirmDeleteSection(index)"
										>
											<v-icon>mdi-delete-outline</v-icon>
										</v-btn>
									</div>
								</template>
							</CubeCalculatorSectionForm>
						</v-expansion-panel-content>
					</v-expansion-panel>
					<v-expansion-panel>
						<v-expansion-panel-header>
							<template v-slot:default="{ open }">
								<v-row no-gutters>
									<v-col cols="9" class="font-weight-bold">Total</v-col>
									<v-col cols="3" class="text-right pr-3 font-weight-bold">
										<v-fade-transition leave-absolute>
											<span v-if="!open" key="0">{{ areaTotalDisplay() }}</span>
										</v-fade-transition>
									</v-col>
								</v-row>
							</template>
						</v-expansion-panel-header>
						<v-expansion-panel-content>
							<v-simple-table class="totals-table">
								<template v-slot:default>
									<thead>
										<tr>
											<th>Section</th>
											<th class="text-center">
												L x W x D x C
											</th>
											<th class="text-right">
												Subtotal
											</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(section, index) in area.sections" :key="index">
											<td>
												{{
													(area.sections[index].label || '').trim() ||
														`Section ${index + 1}`
												}}
											</td>
											<td class="text-center">
												{{ presentDimensions(area.sections[index].values) }}
											</td>
											<td class="text-right">
												{{
													formatCalculationSection(area.sections[index].values)
												}}
											</td>
										</tr>
									</tbody>
									<tfoot>
										<tr>
											<th class="text-right" colspan="2">Total</th>
											<td class="text-right">{{ areaTotalDisplay() }}</td>
										</tr>
									</tfoot>
								</template>
							</v-simple-table>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<div class="text-center">
					<v-btn outlined color="primary" @click="addSection">
						<v-icon left>mdi-shape-rectangle-plus</v-icon>
						Add Section
					</v-btn>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from '@vue/composition-api';
import CubeCalculatorSectionForm from '@/components/CubeCalculatorSectionForm.vue';
import {
	AreaState,
	SectionState,
	SectionValuesState,
} from '@/interfaces/calculator';
import {
	calculateSection,
	formatCalculationSection,
	getSectionState,
} from '@/helpers/calculator';
import { isNumber } from 'lodash-es';

export default defineComponent({
	components: { CubeCalculatorSectionForm },
	setup() {
		const area = reactive<AreaState>({
			label: '',
			sections: [getSectionState()],
		});
		const confirmDeleteIndex = ref(-1);
		const confirmDeleteTimeout = ref(-1);

		const addSection = () => area.sections.push(getSectionState());
		const clearDeleteIndex = () => {
			confirmDeleteIndex.value = -1;
		};
		const confirmDeleteSection = (index: number) => {
			confirmDeleteIndex.value = index;
			clearTimeout(confirmDeleteTimeout.value);
			confirmDeleteTimeout.value = setTimeout(clearDeleteIndex, 3000);
		};
		const deleteSection = (index: number) => {
			area.sections.splice(index, 1);
			clearDeleteIndex();
		};

		const areaTotal = () =>
			area.sections.reduce(
				(acc, curr) => acc + (calculateSection(curr.values) ?? 0.0),
				0.0
			);

		const areaTotalDisplay = () => {
			const total = areaTotal();
			if (total === 0) return '-';
			return `${areaTotal().toFixed(2)}t`;
		};

		const presentDimensions = (values: SectionValuesState): string => {
			const depthParsed = parseFloat(values.depth);
			const depth = Number.isNaN(depthParsed) ? '-' : depthParsed / 1000;
			const { length, width, cube } = values;

			return `${length || '-'} x ${width || '-'} x ${depth} x ${cube || '-'}`;
		};

		return {
			area,
			calculateSection,
			formatCalculationSection,
			addSection,
			clearDeleteIndex,
			confirmDeleteIndex,
			confirmDeleteSection,
			deleteSection,
			areaTotalDisplay,
			presentDimensions,
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
