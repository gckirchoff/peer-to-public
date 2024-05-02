import { fail } from '@sveltejs/kit';
import { siteConfig } from '$lib/config.js';

export const actions = {
	default: async ({ request, fetch }) => {
		try {
			const formData = await request.formData();
			const { formAccessKey } = siteConfig.pages.contact;

			const email = formData.get('email');
			const subject = formData.get('subject');
			const message = formData.get('message');

			const honeypot = formData.get('honeypot');
			const challenge = formData.get('challenge');
			const answer = formData.get('answer');

			if (honeypot) {
				return {
					status: 'success' as const,
				};
			}

			if (challenge !== answer) {
				return {
					status: 'fail' as const,
				};
			}

			const response = await fetch('https://api.staticforms.xyz/submit', {
				method: 'POST',
				body: JSON.stringify({
					email,
					subject,
					message,
					honeypot,
					accessKey: formAccessKey,
					replyTo: '@',
				}),
				headers: { 'Content-Type': 'application/json' },
			});

			const data = (await response.json()) as { success: boolean };

			if (data.success) {
				return {
					status: 'success' as const,
				};
			}
			return fail(400, {
				status: 'fail' as const,
			});
		} catch (err) {
			return fail(400, {
				status: 'fail' as const,
			});
		}
	},
};
