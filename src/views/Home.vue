<template>
	<div class="home">
		<CubeCalculator />
	</div>
</template>

<script>
// @ is an alias to /src
import CubeCalculator from '@/components/Calculator';

export default {
	name: 'Home',
	components: {
		CubeCalculator,
	},
};
</script>
