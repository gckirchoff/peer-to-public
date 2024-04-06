<script lang="ts">
	import { Body2, SubTitle2 } from '$lib/components/internal/typography';
	import InputsContainer from './InputsContainer/InputsContainer.svelte';
	import MicrolifeDeltas from './MicrolifeDeltas/MicrolifeDeltas.svelte';
	import NumberInput from './NumberInput/NumberInput.svelte';
	import Select from './Select/Select.svelte';
	import type { Microlife, Sex } from './constants';
	import { getMicrolifeChanges } from './logic';

	const sectionStyles = 'text-decoration: underline;';

	const xAccessor = (d: Microlife): number => d.value;
	const yAccessor = (d: Microlife): string => d.name;

	let bmi = 0;
	let sex: Sex = 'male';

	let hoursSedentaryPerDay = 0;
	let exerciseSessionsPerWeek = 0;
	let minutesPerExerciseSession = 0;

	let servingsRedMeat = 0;
	let servingsVeg = 0;

	let cigarettesPerDay = 0;
	let drinkingSessionsPerWeek = 0;
	let drinksPerSession = 0;
	let receivesYearlyCovidVaccine = false;
	let preventsCovidInfection = true;

	$: microlives = getMicrolifeChanges({
		hoursSedentaryPerDay,
		exerciseSessionsPerWeek,
		minutesPerExerciseSession,
		sex,
		servingsRedMeat,
		servingsVeg,
		cigarettesPerDay,
		bmi,
		drinksPerSession,
		drinkingSessionsPerWeek,
		receivesYearlyCovidVaccine,
		preventsCovidInfection,
	});
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
			<NumberInput bind:value={hoursSedentaryPerDay} label="Hours sedentary per day" />
			<NumberInput bind:value={exerciseSessionsPerWeek} label="Days exercise per week" />
			<NumberInput
				bind:value={minutesPerExerciseSession}
				label="Minutes exercised each day exercise occurs"
			/>
		</InputsContainer>

		<SubTitle2 style={sectionStyles}>Diet:</SubTitle2>
		<InputsContainer>
			<NumberInput bind:value={servingsRedMeat} label="Servings red meat per week" />
			<NumberInput bind:value={servingsVeg} label="Servings fruits/vegetables per week" />
		</InputsContainer>

		<SubTitle2 style={sectionStyles}>Risky behavior:</SubTitle2>
		<InputsContainer>
			<NumberInput bind:value={cigarettesPerDay} label="Cigarettes per day" />
			<NumberInput bind:value={drinkingSessionsPerWeek} label="Days per week alcohol is consumed" />
			<NumberInput bind:value={drinksPerSession} label="Drinks consumed each day drinking occurs" />
			<label>
				<input
					type="checkbox"
					on:change={() => (preventsCovidInfection = !preventsCovidInfection)}
					checked={!preventsCovidInfection}
				/>
				Does not actively avoid SARS-CoV-2 infection
			</label>
			<label>
				<input type="checkbox" bind:checked={receivesYearlyCovidVaccine} />
				Receives yearly COVID-19 vaccine
			</label>
		</InputsContainer>
	</section>
	<section class="right">
		<div class="life-delta-chart"></div>
		<div class="microlives-chart">
			<MicrolifeDeltas {microlives} {xAccessor} {yAccessor} />
		</div>
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
</style>
