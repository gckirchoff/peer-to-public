<script lang="ts">
	import { Body2, SubTitle2 } from '$lib/components/internal/typography';
	import InputsContainer from './InputsContainer/InputsContainer.svelte';
	import LifeDeltaChart from './LifeDeltaChart/LifeDeltaChart.svelte';
	import MicrolifeDeltas from './MicrolifeDeltas/MicrolifeDeltas.svelte';
	import NumberInput from './NumberInput/NumberInput.svelte';
	import Select from './Select/Select.svelte';
	import type { Microlife, Sex } from './constants';
	import { getMicrolifeChanges } from './logic';

	const sectionStyles = 'text-decoration: underline;';

	const xAccessor = (d: Microlife): number => d.value;
	const yAccessor = (d: Microlife): string => d.name;

	let bmi = 0;
	let sex: Sex = 'female';

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
					<option value="female">Female</option>
					<option value="male">Male</option>
				</Select>
				<Body2>Sex</Body2>
			</label>
			<NumberInput bind:value={bmi} label="BMI" min={0} max={50} step="0.1" />
		</InputsContainer>

		<SubTitle2 style={sectionStyles}>Activity Level:</SubTitle2>
		<InputsContainer>
			<NumberInput
				bind:value={hoursSedentaryPerDay}
				label="Hours sedentary screen time per days"
				min={0}
				max={24}
				step="0.5"
			/>
			<NumberInput
				bind:value={exerciseSessionsPerWeek}
				label="Days exercised per week"
				min={0}
				max={7}
			/>
			<NumberInput
				bind:value={minutesPerExerciseSession}
				label="Minutes exercised per day"
				min={0}
				max={60}
			/>
		</InputsContainer>

		<SubTitle2 style={sectionStyles}>Diet:</SubTitle2>
		<InputsContainer>
			<NumberInput bind:value={servingsRedMeat} label="Servings red meat per week" min={0} />
			<NumberInput bind:value={servingsVeg} label="Servings fruits/vegetables per week" min={0} />
		</InputsContainer>

		<SubTitle2 style={sectionStyles}>Risky behavior:</SubTitle2>
		<InputsContainer>
			<NumberInput bind:value={cigarettesPerDay} label="Cigarettes per day" min={0} />
			<NumberInput
				bind:value={drinkingSessionsPerWeek}
				label="Days per week alcohol is consumed"
				min={0}
				max={7}
			/>
			<NumberInput bind:value={drinksPerSession} label="Drinks consumed per day" min={0} />
			<label>
				<input
					type="checkbox"
					on:change={() => (preventsCovidInfection = !preventsCovidInfection)}
					checked={!preventsCovidInfection}
				/>
				Lives in SARS-CoV-2 pandemic without preventing infections
			</label>
			<label>
				<input type="checkbox" bind:checked={receivesYearlyCovidVaccine} />
				Receives yearly COVID-19 vaccine
			</label>
		</InputsContainer>
	</section>
	<section class="right">
		<div class="life-delta-chart">
			<LifeDeltaChart {microlives} />
		</div>
		<div class="microlives-chart">
			<MicrolifeDeltas {microlives} {xAccessor} {yAccessor} />
		</div>
	</section>
</div>

<style lang="scss">
	.viz {
		display: flex;
		flex-wrap: wrap;

		section {
			flex: 1;
		}

		.right {
			min-width: 35rem;
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
