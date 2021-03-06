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
									<span v-if="open" key="0">Section</span>
									<span v-else key="1">
										{{ (section.name || '').trim() || `Section ${index + 1}` }}
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
					<SectionEditComponent v-model="area.sections[index]">
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
					</SectionEditComponent>
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
					<SectionTotalsTableComponent :sections="area.sections" />
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
import {
	defineComponent,
	computed,
	ref,
	unref,
	PropType,
} from '@vue/composition-api';
import {
	calculateSection,
	getSectionState,
	formatCalculationSection,
	calculateArea,
} from '@/modules/project/modules/calculators/area/utils';
import { AreaState } from '@/modules/project/modules/calculators/area/interfaces';
import SectionEditComponent from '@/modules/project/modules/calculators/area/components/SectionEditComponent.vue';
import SectionTotalsTableComponent from '@/modules/project/modules/calculators/area/components/SectionTotalsTableComponent.vue';

export default defineComponent({
	name: 'AreaEditComponent',
	components: {
		SectionTotalsTableComponent,
		SectionEditComponent,
	},
	props: {
		value: {
			type: Object as PropType<AreaState>,
			default: () => ({ name: 'New Area', sections: [getSectionState()] }),
		},
	},
	setup(props) {
		const area = props.value;
		const confirmDeleteIndex = ref(-1);
		const confirmDeleteTimeout = ref(-1);

		const addSection = () => {
			area.sections.push(getSectionState());
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
		};

		const areaTotal = computed(() =>
			calculateArea({ sections: unref(area.sections) })
		);

		const areaTotalDisplay = computed(() => {
			if (areaTotal.value === 0) return '-';
			return `${areaTotal.value.toFixed(2)}t`;
		});

		return {
			area,
			addSection,
			clearDeleteIndex,
			confirmDeleteIndex,
			deleteSection,
			confirmDeleteSection,
			calculateSection,
			getSectionState,
			formatCalculationSection,
			areaTotal,
			areaTotalDisplay,
		};
	},
});
</script>
