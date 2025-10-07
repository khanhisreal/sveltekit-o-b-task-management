import { writable } from 'svelte/store';
import type { UserSettings } from '../interfaces/Task';

export const userSettings = writable<UserSettings>({
	isDarkMode: false,
	filterDefaultValue: 'All'
});
//returns {subscribe, set, update}
