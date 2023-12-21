import { describe, it, expect } from 'vitest';

import { hasDefaultScriptMatcher } from './constants';
import { parseScripts } from './logic';

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
