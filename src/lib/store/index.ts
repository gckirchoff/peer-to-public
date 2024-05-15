import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

const defaultTheme: Theme = 'light';

const userTheme: string | false | null = browser && localStorage.getItem('color-theme');

export const theme = writable((userTheme as Theme) || defaultTheme);

export const toggleTheme = () => {
	theme.update((currentTheme) => {
		const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';

		document.documentElement.setAttribute('color-theme', newTheme);
		localStorage.setItem('color-theme', newTheme);

		return newTheme;
	});
};
