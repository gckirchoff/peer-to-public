<script lang="ts">
	import { enhance } from '$app/forms';

	import Button from '$lib/components/internal/Button/Button.svelte';
	import { Body1 } from '$lib/components/internal/typography';
	import { getChallenge } from './logic';

	export let form: { status?: 'success' | 'fail' } | null;

	const challenge = getChallenge();

	let currentAnswer: number | undefined = undefined;
	$: passedCaptcha = currentAnswer === challenge.answer;
</script>

<form method="post" use:enhance>
	<label for="email">Email</label>
	<input type="email" name="email" id="email" />

	<label for="subject">Subject</label>
	<input name="subject" id="subject" type="text" />

	<label for="message">Message</label>
	<textarea name="message" id="message"></textarea>

	<!-- If we receive data in this field submission will be ignored -->
	<input type="text" name="honeypot" style="display: none;" />

	<!-- Challenge user input -->
	<input type="number" name="answer" style="display: none;" bind:value={challenge.answer} />
	<!-- Challenge answer -->
	<label for="challenge">Challenge {challenge.question}</label>
	<input bind:value={currentAnswer} type="number" name="challenge" />

	{#if form?.status === 'success'}
		<Body1 style="color: var(--clr-success-500);">Sent!</Body1>
	{:else if form?.status === 'fail'}
		<Body1 style="color: var(--clr-error-500);">Error sending request</Body1>
	{/if}

	<Button type="submit" disabled={!passedCaptcha}>Submit</Button>
</form>

<style lang="scss">
	form {
		border-radius: 5px;
		background-color: var(--clr-surface-200);
		border: 1px solid var(--clr-primary-500);
		padding: var(--spacing-24);
		width: min(100%, 80rem);

		input,
		textarea {
			width: 100%;
			padding: 12px;
			border: 1px solid var(--clr-primary-500);
			border-radius: 4px;
			box-sizing: border-box;
			margin-top: 6px;
			margin-bottom: 16px;
			resize: vertical;
		}
	}
</style>
