<script lang="ts">
	import { Body2, SubTitle2 } from '$lib/components/internal/typography';
	import InputsContainer from './InputsContainer/InputsContainer.svelte';
	import NumberInput from './NumberInput/NumberInput.svelte';
	import Select from './Select/Select.svelte';

	const sectionStyles = 'text-decoration: underline;';

	let bmi = 0;
	let sex: 'male' | 'female';

	let hoursSedentaryPerDay = 0;
	let exerciseSessionsPerWeek = 0;
	let minutesPerExerciseSession = 0;

	let servingsRedMeat = 0;
	let servingsVeg = 0;

	let cigarettesPerDay = 0;
	let drinkingSessionsPerWeek = 0;
	let drinksPerSession = 0;
	let receivesYearlyCovidVaccine = false;
	let preventsCovidInfection = false;
</script>

<div class="viz">
	<section class="left">
		<SubTitle2 style={sectionStyles}>Basic Information:</SubTitle2>
		<InputsContainer>
			<label class="sex-select" for="sex-select">
				<Select bind:value={sex} id="sex-select">
					<option value="male">Male</option>
					<option value="female">Female</option>
				</Select>
				<Body2>Sex</Body2>
			</label>
			<NumberInput bind:value={bmi} label="BMI" />
		</InputsContainer>

		<SubTitle2 style={sectionStyles}>Activity Level:</SubTitle2>
		<InputsContainer>
			<NumberInput bind:value={hoursSedentaryPerDay} label="hours sedentary per day" />
			<NumberInput bind:value={exerciseSessionsPerWeek} label="exercise sessions per week" />
			<NumberInput bind:value={minutesPerExerciseSession} label="minutes per exercise session" />
		</InputsContainer>

		<SubTitle2 style={sectionStyles}>Diet:</SubTitle2>
		<InputsContainer>
			<NumberInput bind:value={servingsRedMeat} label="Servings red meat per week" />
			<NumberInput bind:value={servingsVeg} label="Servings fruits/vegetables per week" />
		</InputsContainer>

		<SubTitle2 style={sectionStyles}>Risky behavior:</SubTitle2>
		<InputsContainer>
			<NumberInput bind:value={cigarettesPerDay} label="Cigarettes per day" />
			<NumberInput bind:value={drinkingSessionsPerWeek} label="Drinking sessions per week" />
			<NumberInput bind:value={drinksPerSession} label="drinks per session" />
			<label>
				<input type="checkbox" bind:value={receivesYearlyCovidVaccine} />
				receives yearly COVID-19 vaccine
			</label>
			<label>
				<input type="checkbox" bind:value={preventsCovidInfection} />
				actively prevents COVID-19 infection
			</label>
		</InputsContainer>
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
		padding: var(--spacing-16);

		.sex-select {
			display: flex;
			align-items: center;
			gap: var(--spacing-16);
		}

		label {
			cursor: pointer;
			user-select: none;

			input {
				cursor: pointer;
			}
		}
	}
	.right {
		background-color: green;
	}
</style>
