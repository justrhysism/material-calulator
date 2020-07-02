<template>
	<div>
		<div>
			<h2 class="headline mb-2">{{ area.name }}</h2>
		</div>
		<v-expansion-panels>
			<v-expansion-panel v-for="(section, index) in area.sections" :key="index">
				<v-expansion-panel-header expand-icon="mdi-pencil" disable-icon-rotate>
					<template v-slot:default="{ open }">
						<v-row no-gutters>
							<v-col cols="9">
								<v-fade-transition leave-absolute>
									<span v-if="open" key="0">
										Section
									</span>
									<span v-else key="1">
										{{ (section.name || '').trim() || `Section ${index + 1}` }}
									</span>
								</v-fade-transition>
							</v-col>
							<v-col cols="3" class="text-right pr-3">
								<v-fade-transition leave-absolute>
									<span v-if="!open" key="0">
										{{ formatCalculationSection }}
									</span>
								</v-fade-transition>
							</v-col>
						</v-row>
					</template>
				</v-expansion-panel-header>
				<v-expansion-panel-content>
					<v-text-field
						v-model="area.sections[index].name"
						label="Name"
						outlined
						prepend-inner-icon="mdi-name"
						placeholder="e.g. Driveway"
					/>
					<CubeCalculatorSectionForm v-model="area.sections[index].values">
						<template v-slot:actions-left>
							<div v-if="area.sections.length > 1">
								<v-btn
									v-if="confirmDeleteIndex === index"
									outlined
									color="error"
									@click="deleteSection"
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
									@click="confirmDeleteSection"
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
									<span v-if="!open" key="0">{{ areaTotalDisplay }}</span>
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
											(area.sections[index].name || '').trim() ||
												`Section ${index + 1}`
										}}
									</td>
									<td class="text-center">
										{{ presentDimensions }}
									</td>
									<td class="text-right">
										{{ formatCalculationSection }}
									</td>
								</tr>
							</tbody>
						</template>
					</v-simple-table>
					<div class="text-right">
						<h3 class="subtitle-1">Total</h3>
						<span class="display-1">{{ areaTotalDisplay }}</span>
					</div>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>
<script lang="ts">
import { reactive, ref, defineComponent } from '@vue/composition-api';
import { calculateSection, getSectionState } from '@/helpers/calculator';
import {
	AreaState,
	SectionValuesState,
} from '@/store/modules/project/interfaces';

export default defineComponent({
	name: 'AreaControl',
	props: {
		value: {
			type: Object,
			default: () => ({ name: 'New Area', sections: [getSectionState()] }),
		},
	},
	setup(props, { emit }) {
		const { value } = props;
		const area = reactive<AreaState>(value as AreaState);
		const confirmDeleteIndex = ref(-1);
		const confirmDeleteTimeout = ref(-1);

		const emitInput = () => emit('input', area);

		const addSection = () => {
			area.sections.push(getSectionState());
			emitInput();
		};

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
			emitInput();
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
			addSection,
			clearDeleteIndex,
			deleteSection,
			confirmDeleteSection,
			calculateSection,
			getSectionState,
			areaTotal,
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
