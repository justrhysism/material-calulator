<template>
	<v-container>
		<!-- Area/Sections -->
		<v-row>
			<v-col>
				<h2 class="headline mb-2">Area</h2>
				<v-expansion-panels>
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

					<!-- Add Section Button -->
					<v-expansion-panel readonly>
						<v-expansion-panel-header hide-actions>
							<v-row no-gutters>
								<v-col class="text-center">
									<v-btn outlined small color="primary" @click="addSection">
										<v-icon left>mdi-shape-rectangle-plus</v-icon>
										Add Section
									</v-btn>
								</v-col>
							</v-row>
						</v-expansion-panel-header>
					</v-expansion-panel>

					<!-- Total -->
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
								</template>
							</v-simple-table>
							<div class="text-right">
								<h3 class="subtitle-1">Total</h3>
								<span class="display-1">{{ areaTotalDisplay() }}</span>
							</div>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-col>
		</v-row>

		<!-- Truck -->
		<v-row>
			<v-col>
				<h2 class="headline mb-2 mt-4">Truck</h2>
				<v-sheet elevation="2" class="px-6 pt-2">
					<v-row>
						<v-col col="6">
							<v-text-field
								v-model="truckCapacity"
								label="Capacity"
								type="number"
								inputmode="decimal"
								min="0"
								suffix="t"
								outlined
								required
								prepend-inner-icon="mdi-dump-truck"
							/>
						</v-col>
						<v-col col="6" class="text-right">
							<h3 class="subtitle-1">Trips</h3>
							<p>
								<span class="d-block display-2">
									{{ truckTripQuantityDisplay }}
								</span>
								<span class="d-block overline" v-show="Boolean(tripQuantity)">
									Last load:
									<span class="text-lowercase">
										{{ truckTripQuantityLastLoad }}
									</span>
								</span>
							</p>
						</v-col>
					</v-row>
				</v-sheet>
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

		const truckCapacity = ref<number | ''>('');
		const tripQuantity = computed<number>(() => {
			const total = areaTotal();
			if (total === 0 || truckCapacity.value === '') return 0;
			return total / truckCapacity.value;
		});
		const truckTripQuantityDisplay = computed<string>(() =>
			tripQuantity.value === 0 ? '-' : Math.ceil(tripQuantity.value).toString()
		);
		const truckTripQuantityLastLoad = computed<string>(() =>
			tripQuantity.value === 0 || truckCapacity.value === ''
				? '-'
				: `${(areaTotal() % (truckCapacity.value || 0)).toFixed(2)}t`
		);

		return {
			area,
			truckCapacity,
			truckTripQuantityDisplay,
			truckTripQuantityLastLoad,
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
