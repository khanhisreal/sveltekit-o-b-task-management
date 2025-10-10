export const FILTER_OPTIONS = ['All', 'Active', 'Completed'] as const;
export type FilterOption = (typeof FILTER_OPTIONS)[number];

export interface Task {
	id: string;
	title: string;
	description: string;
	status: 'Active' | 'Completed';
	due_date: string;
}

export interface UserSettings {
	isDarkMode: boolean;
	filterDefaultValue: FilterOption;
	pageLimitDefaultValue: string;
}
