<script>
	import { H3, Body1 } from '$lib/components/internal/typography';
	import { Github, Twitter, Youtube } from '$lib/icons';
	import ContactForm from '$lib/components/internal/ContactForm/ContactForm.svelte';

	export let form;
</script>

<div class="contact">
	<H3>Contacts</H3>

	<ul>
		<li>
			<Body1>
				<a href="/contact" target="_blank" rel="noopener noreferrer">
					<Youtube /> Youtube
				</a>
			</Body1>
		</li>
		<li>
			<Body1>
				<a href="/contact" target="_blank" rel="noopener noreferrer">
					<Twitter /> Twitter
				</a>
			</Body1>
		</li>
		<li>
			<Body1>
				<a href="/contact" target="_blank" rel="noopener noreferrer">
					<Github /> Github
				</a>
			</Body1>
		</li>
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
