<script>
	import { siteConfig } from '$lib/config';
	import { H3, Body1 } from '$lib/components/internal/typography';
	import ContactForm from './ContactForm/ContactForm.svelte';
	import MediaIcon from './MediaIcon/MediaIcon.svelte';

	export let form;
</script>

<div class="contact">
	<H3>Contacts</H3>

	<ul>
		{#each siteConfig.pages.contact.links as { href, type }}
			<li>
				<Body1>
					<a {href} target="_blank" rel="noopener noreferrer">
						<MediaIcon {type} />
						{type}
					</a>
				</Body1>
			</li>
		{/each}
	</ul>

	<ContactForm {form} />
</div>

<style lang="scss">
	@import '/src/styles/mixins.scss';
	.contact {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-16);

		@include respond('mobile') {
			padding: var(--spacing-24);
		}

		ul {
			list-style: none;

			li {
				display: flex;
				align-items: center;
				gap: 1rem;

				a {
					color: var(--clr-txt);
					display: flex;
					align-items: center;
					gap: var(--spacing-8);
				}
			}
		}
	}
</style>
