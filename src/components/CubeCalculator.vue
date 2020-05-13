<template>
	<v-form>
		<v-container>
			<v-row>
				<v-col>
					<v-text-field
						v-model="materialState.length"
						label="Length (m)"
						type="number"
						inputmode="decimal"
						min="0"
					/>
				</v-col>
				<v-col
					><v-text-field
						v-model="materialState.width"
						label="Width (m)"
						type="number"
						inputmode="decimal"
						min="0"
				/></v-col>
				<v-col
					><v-text-field
						v-model="materialState.depth"
						label="Depth (mm)"
						type="number"
						inputmode="decimal"
						min="0"
				/></v-col>
				<v-col>
					<v-text-field
						v-model="materialState.cube"
						label="Cube (t/m3)"
						type="number"
						inputmode="decimal"
						min="0"
					/>
				</v-col>
			</v-row>
			<v-row justify="center">
				<v-col sm="4">
					<div v-show="materialTotal !== null">
						<h2 class="subtitle-2">Total:</h2>
						<span class="display-1">{{ materialTotal }}t</span>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from '@vue/composition-api';

interface MaterialState {
	length: string;
	width: string;
	depth: string;
	cube: string;
}

// export interface CubeCalculatorProps {}

export default defineComponent({
	setup() {
		const materialState = reactive<MaterialState>({
			length: '',
			width: '',
			depth: '',
			cube: '',
		});

		const materialTotal = computed<string | null>(() => {
			const values = Object.values(materialState);
			if (values.some(v => v === '' || Number.isNaN(parseFloat(v))))
				return null;

			const { length, width, depth, cube } = materialState;
			/* eslint-disable @typescript-eslint/no-non-null-assertion */
			return (
				Number.parseFloat(length!) *
				Number.parseFloat(width!) *
				(Number.parseFloat(depth!) / 1000) *
				Number.parseFloat(cube!)
			).toFixed(2);
			/* eslint-enable @typescript-eslint/no-non-null-assertion */
		});

		return {
			materialState,
			materialTotal,
		};
	},
});
</script>

<style scoped></style>
