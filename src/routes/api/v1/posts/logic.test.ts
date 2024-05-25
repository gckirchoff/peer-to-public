import { describe, it, test, expect, beforeEach, vi, afterEach } from 'vitest';

import { hasDefaultScriptMatcher } from './constants';
import { parseScripts, deriveDates } from './logic';
import type Post from '$lib/types/post';

const dummyPost = `
# My Cool Post!
This is a post.
`;

const dummyPostMatcher = /My Cool Post/;

describe('parseScripts', () => {
	it('Adds a script if post is made without one', () => {
		const got = parseScripts(dummyPost);

		expect(/<script> \/\/ usables/.test(got)).toBe(true);
		expect(dummyPostMatcher.test(got)).toBe(true);
	});

	it('merges the script of a new post with the default script', () => {
		const content = `<script>
        console.log('hello');
</script>
${dummyPost}`;
		const customScriptMatcher = /console.log\('hello'\);/;

		const got = parseScripts(content);

		expect(hasDefaultScriptMatcher.test(got)).toBe(true);
		expect(customScriptMatcher.test(got)).toBe(true);
		expect(dummyPostMatcher.test(got)).toBe(true);
	});

	it('Does nothing if post already contains a script with default content', () => {
		const content = `<script> // usables
        import Something from '$lib/stuff/Something.svelte';

        console.log('hello');
</script>
${dummyPost}`;

		const got = parseScripts(content);

		expect(got).toBe(content);
	});
});

describe('deriveDates', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	describe("Creating a new post results in now being the post date and no update time (published true/false doesn't matter)", () => {
		const tests = [{ published: true }, { published: false }];

		test.each(tests)('$published', ({ published }) => {
			const now = new Date();
			vi.setSystemTime(now);

			const got = deriveDates({ currentPostMeta: undefined, published });

			expect(got.publishedDate).toBe(now.toString());
			expect(got.updateDate).toBeNull();
		});
	});

	it('resets dates when updating a previously unpublished post to published status', () => {
		const now = new Date();
		vi.setSystemTime(now);

		const publishedDate = new Date(2000, 1, 1, 19).toString();
		const previousPost: Post = {
			title: 'cool post',
			published: false,
			date: publishedDate.toString(),
		} as Post;

		const got = deriveDates({ currentPostMeta: previousPost, published: true });

		expect(got.publishedDate).toBe(now.toString());
		expect(got.updateDate).toBeNull();
	});

	describe('Update scenarios that result in the update time being updated, while preserving the original publish date', () => {
		const tests = [
			{
				description: 'previously unpublished staying unpublished',
				previousPublishedStatus: false,
				newPublishedStatus: false,
			},
			{
				description: 'previously published post staying published',
				previousPublishedStatus: true,
				newPublishedStatus: true,
			},
			{
				description: 'previously published post switching to unpublished',
				previousPublishedStatus: true,
				newPublishedStatus: false,
			},
		];

		test.each(tests)('$description', ({ previousPublishedStatus, newPublishedStatus }) => {
			const now = new Date();
			vi.setSystemTime(now);
			const originalPublishDate = new Date(2000, 1, 1, 19).toString();
			const previousPost: Post = {
				title: 'cool post',
				published: previousPublishedStatus,
				date: originalPublishDate.toString(),
			} as Post;

			const got = deriveDates({ currentPostMeta: previousPost, published: newPublishedStatus });

			expect(got.publishedDate).toBe(originalPublishDate);
			expect(got.updateDate).toBe(now.toString());
		});
	});
});
