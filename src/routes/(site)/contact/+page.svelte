<script>
	import { siteConfig } from '$lib/config';
	import { H3, Body1 } from '$lib/components/internal/typography';
	import PageWrapper from '$lib/components/internal/PageWrapper/PageWrapper.svelte';
	import ContactForm from './ContactForm/ContactForm.svelte';
	import MediaIcon from './MediaIcon/MediaIcon.svelte';

	export let form;
</script>

<PageWrapper>
	<div class="contact">
		<H3>Contact</H3>

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
</PageWrapper>

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
					color: var(--clr-txt-500);
					display: flex;
					align-items: center;
					gap: var(--spacing-8);
				}
			}
		}
	}
</style>
