<script lang="ts">
	import { Body2, H6 } from '$lib/components/internal/typography';
</script>

<div class="viz">
	<section class="left">
		<H6>Basic Information:</H6>
		<Body2>BMI</Body2>
		<Body2>Sex</Body2>

		<H6>Activity Level:</H6>
		<Body2>hours sedentary per day</Body2>
		<Body2>exercise sessions per week</Body2>
		<Body2>minutes per exercise session</Body2>

		<H6>Diet:</H6>
		<Body2>Servings red meat per week</Body2>
		<Body2>Servings fruits/vegetables per week</Body2>

		<H6>Risky behavior:</H6>
		<Body2>Cigarettes per day</Body2>
		<Body2>Drinking sessions per week</Body2>
		<Body2>drinks per session</Body2>
		<Body2>Receives yearly Covid-19 vaccination</Body2>
		<Body2>Actively prevents Covid-19 infection</Body2>
	</section>
	<section class="right">
		<div class="life-delta-chart"></div>
		<div class="microlives-chart"></div>
	</section>
</div>

<style lang="scss">
	.viz {
		display: flex;

		section {
			flex: 1;
		}
	}
	.left {
		background-color: red;
	}
	.right {
		background-color: green;
	}
</style>
