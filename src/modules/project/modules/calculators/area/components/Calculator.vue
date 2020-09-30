<template>
	<v-container>
		<!-- Area/Sections -->
		<v-row v-for="(area, index) in areas" :key="index">
			<v-col>
				<AreaEditComponent v-model="areas[index]" />
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
								<span class="display-2" style="display: block">
									{{ truckTripQuantityDisplay }}
								</span>
								<span
									class="overline"
									style="display: block"
									v-show="showLastLoad"
								>
									Last load:
									<span class="text-lowercase">
										{{ truckTripQuantityLastLoadDisplay }}
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
import { computed, defineComponent, ref, unref } from '@vue/composition-api';
import {
	calculateArea,
	getAreaState,
} from '@/modules/project/modules/calculators/area/utils';
import AreaEditComponent from '@/modules/project/modules/calculators/area/components/AreaEdit.vue';
import { useProjectState } from '@/modules/project/store/hooks';

export default defineComponent({
	components: {
		AreaEditComponent,
	},
	setup() {
		const { areas } = useProjectState({ areas: [getAreaState()] });

		const projectTotal = computed(() =>
			unref(areas).reduce(
				(acc, area) => acc + calculateArea({ sections: area.sections }) ?? 0.0,
				0.0
			)
		);

		const truckCapacity = ref<number | ''>('');

		const tripQuantity = computed<number>(() => {
			if (projectTotal.value === 0 || truckCapacity.value === '') return 0;
			return projectTotal.value / truckCapacity.value;
		});

		const truckTripQuantityDisplay = computed<string>(() =>
			tripQuantity.value === 0 ? '-' : Math.ceil(tripQuantity.value).toString()
		);

		const truckTripQuantityLastLoadValue = computed<number>(() =>
			tripQuantity.value === 0 || truckCapacity.value === ''
				? 0
				: projectTotal.value % (truckCapacity.value || 0)
		);

		const truckTripQuantityLastLoadDisplay = computed<string>(() =>
			tripQuantity.value === 0 || truckCapacity.value === ''
				? '-'
				: `${truckTripQuantityLastLoadValue.value.toFixed(2)}t`
		);

		const showLastLoad = computed<boolean>(
			() =>
				Boolean(tripQuantity.value) && truckTripQuantityLastLoadValue.value > 0
		);

		return {
			areas,
			truckCapacity,
			tripQuantity,
			truckTripQuantityDisplay,
			truckTripQuantityLastLoadValue,
			truckTripQuantityLastLoadDisplay,
			showLastLoad,
		};
	},
});
</script>
