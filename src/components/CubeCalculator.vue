<template>
	<v-container>
		<v-row>
			<v-col>
				<v-expansion-panels multiple :mandatory="area.sections.length === 1">
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
									<v-col cols="10">
										<v-fade-transition leave-absolute>
											<span v-if="open" key="0">
												Section
											</span>
											<span v-else key="1">
												{{ section.label || `Section ${index + 1}` }}
											</span>
										</v-fade-transition>
									</v-col>
									<v-col cols="2">
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
							<CubeCalculatorSectionForm
								v-model="area.sections[index].values"
							/>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-col>
		</v-row>
		<v-row></v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api';
import CubeCalculatorSectionForm from '@/components/CubeCalculatorSectionForm.vue';
import { AreaState, SectionValuesState } from '@/interfaces/calculator';
import {
	formatCalculationSection,
	getSectionState,
} from '@/helpers/calculator';

export default defineComponent({
	components: { CubeCalculatorSectionForm },
	setup() {
		const area = reactive<AreaState>({
			label: '',
			sections: [getSectionState()],
		});

		return {
			area,
			formatCalculationSection,
		};
	},
});
</script>

<style scoped></style>
