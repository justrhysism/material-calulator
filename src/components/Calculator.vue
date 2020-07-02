<template>
	<v-container>
		<!-- Area/Sections -->
		<v-row v-for="(area, index) in areas">
			<v-col>
				<AreaControl v-model="areas[index]" />
			</v-col>
		</v-row>

		<!-- Truck -->
		<!--		<v-row>-->
		<!--			<v-col>-->
		<!--				<h2 class="headline mb-2 mt-4">Truck</h2>-->
		<!--				<v-sheet elevation="2" class="px-6 pt-2">-->
		<!--					<v-row>-->
		<!--						<v-col col="6">-->
		<!--							<v-text-field-->
		<!--								v-model="truckCapacity"-->
		<!--								label="Capacity"-->
		<!--								type="number"-->
		<!--								inputmode="decimal"-->
		<!--								min="0"-->
		<!--								suffix="t"-->
		<!--								outlined-->
		<!--								required-->
		<!--								prepend-inner-icon="mdi-dump-truck"-->
		<!--							/>-->
		<!--						</v-col>-->
		<!--						<v-col col="6" class="text-right">-->
		<!--							<h3 class="subtitle-1">Trips</h3>-->
		<!--							<p>-->
		<!--								<span class="d-block display-2">-->
		<!--									{{ truckTripQuantityDisplay }}-->
		<!--								</span>-->
		<!--								<span class="d-block overline" v-show="Boolean(tripQuantity)">-->
		<!--									Last load:-->
		<!--									<span class="text-lowercase">-->
		<!--										{{ truckTripQuantityLastLoad }}-->
		<!--									</span>-->
		<!--								</span>-->
		<!--							</p>-->
		<!--						</v-col>-->
		<!--					</v-row>-->
		<!--				</v-sheet>-->
		<!--			</v-col>-->
		<!--		</v-row>-->
	</v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from '@vue/composition-api';
import Section from '@/components/SectionEdit.vue';
import {
	calculateSection,
	formatCalculationSection,
	getAreaState,
} from '@/helpers/calculator';
import AreaControl from '@/components/AreaControl.vue';
import { AreaState } from '@/store/modules/project/interfaces';

export default defineComponent({
	components: { AreaControl, Section },
	setup() {
		const areas = reactive<AreaState[]>([getAreaState()]);
		// const truckCapacity = ref<number | ''>('');
		// const tripQuantity = computed<number>(() => {
		// 	const total = areaTotal();
		// 	if (total === 0 || truckCapacity.value === '') return 0;
		// 	return total / truckCapacity.value;
		// });
		// const truckTripQuantityDisplay = computed<string>(() =>
		// 	tripQuantity.value === 0 ? '-' : Math.ceil(tripQuantity.value).toString()
		// );
		// const truckTripQuantityLastLoad = computed<string>(() =>
		// 	tripQuantity.value === 0 || truckCapacity.value === ''
		// 		? '-'
		// 		: `${(areaTotal() % (truckCapacity.value || 0)).toFixed(2)}t`
		// );

		return {
			areas,
			// truckCapacity,
			// truckTripQuantityDisplay,
			// truckTripQuantityLastLoad,
			// calculateSection,
			// formatCalculationSection,
		};
	},
});
</script>
