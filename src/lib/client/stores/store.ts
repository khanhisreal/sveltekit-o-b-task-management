import { writable } from 'svelte/store';
import type { UserSettings } from '../interfaces/Task';

const LOCAL_KEY = 'userSettings';

function createUserSettings() {
	let startValue: UserSettings = { isDarkMode: false, filterDefaultValue: 'All' };

	if (typeof localStorage !== 'undefined') {
		const stored = localStorage.getItem(LOCAL_KEY);
		if (stored) startValue = JSON.parse(stored);
	}

	const store = writable<UserSettings>(startValue);
	store.subscribe((val) => {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(LOCAL_KEY, JSON.stringify(val));
			document.documentElement.dataset.theme = val.isDarkMode ? 'dark' : 'light';
		}
	});

	return store;
}

export const userSettings = createUserSettings();
