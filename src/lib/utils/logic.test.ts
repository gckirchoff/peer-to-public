import { describe, it, expect } from 'vitest';

import { escapeString } from './logic';

describe('escapeString', () => {
	it('escapes double quotes', () => {
		const input = 'The "wow" burger';

		const got = escapeString(input);

		expect(got).toBe('The \\"wow\\" burger');
	});
});
