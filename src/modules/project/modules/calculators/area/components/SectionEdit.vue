<template>
	<div>
		<v-row>
			<v-col align="center">
				<v-text-field
					v-model="value.name"
					label="Name"
					outlined
					prepend-inner-icon="mdi-name"
					placeholder="e.g. Driveway"
					hide-details
				/>
			</v-col>
		</v-row>

		<v-row>
			<v-col align="center">
				<v-btn-toggle v-model="value.type" mandatory>
					<v-btn value="square">
						<v-icon left>mdi-cube</v-icon>
						<span>Square</span>
					</v-btn>
					<v-btn value="round">
						<v-icon left>mdi-database</v-icon>
						<span>Drill Holes</span>
					</v-btn>
				</v-btn-toggle>
			</v-col>
		</v-row>

		<SectionSquareValuesEdit
			:value="squareValues"
			@input="handleValuesChange('square', $event)"
			v-if="isSquare"
		>
			<template v-slot:actions-left>
				<slot name="actions-left" />
			</template>
		</SectionSquareValuesEdit>

		<SectionRoundValuesEdit
			:value="roundValues"
			@input="handleValuesChange('round', $event)"
			v-if="isRound"
		>
			<template v-slot:actions-left>
				<slot name="actions-left" />
			</template>
		</SectionRoundValuesEdit>
	</div>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	PropType,
	reactive,
	ref,
	watch,
} from '@vue/composition-api';
import {
	SectionRoundValuesState,
	SectionSquareValuesState,
	SectionState,
	SectionStateType,
} from '@/modules/project/modules/calculators/area/interfaces';
import {
	getRoundSectionState,
	getSectionState,
	getSquareSectionState,
} from '@/modules/project/modules/calculators/area/utils';
import SectionSquareValuesEdit from '@/modules/project/modules/calculators/area/components/SectionSquareValuesEdit.vue';
import SectionRoundValuesEdit from '@/modules/project/modules/calculators/area/components/SectionRoundValuesEdit.vue';

export default defineComponent({
	name: 'SectionEdit',
	components: { SectionSquareValuesEdit, SectionRoundValuesEdit },
	props: {
		value: {
			type: Object as PropType<SectionState>,
			default: () => getSectionState(),
		},
	},
	setup(props, { emit }) {
		const isSquare = computed<boolean>(() => props.value.type === 'square');
		const isRound = computed<boolean>(() => props.value.type === 'round');

		const squareValues = ref(
			isSquare ? props.value.values : getSquareSectionState()
		);
		const roundValues = ref(
			isRound ? props.value.values : getRoundSectionState()
		);

		const emitChange = (type: SectionStateType) => {
			switch (type) {
				case 'square':
					emit('input', {
						...props.value,
						values: squareValues.value,
						type: 'square',
					});
					break;

				case 'round':
					emit('input', {
						...props.value,
						values: roundValues.value,
						type: 'round',
					});
					break;
			}
		};

		const handleValuesChange = (
			type: SectionStateType,
			input: SectionSquareValuesState | SectionRoundValuesState
		) => {
			switch (type) {
				case 'square':
					squareValues.value = input;
					break;
				case 'round':
					roundValues.value = input;
					break;
			}

			emitChange();
		};

		watch(() => props.value.type, emitChange);

		return {
			squareValues,
			roundValues,
			handleValuesChange,
			isSquare,
			isRound,
		};
	},
});
</script>

<style scoped lang="scss"></style>
