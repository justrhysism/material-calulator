<template>
	<div class="home">
		<CubeCalculator />
	</div>
</template>

<script lang="ts">
// @ is an alias to /src
import CubeCalculator from '@/modules/project/modules/calculators/area/components/Calculator';

export default {
	name: 'Home',
	components: {
		CubeCalculator,
	},
};
</script>
