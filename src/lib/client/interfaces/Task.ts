export interface Task {
	id: string;
	title: string;
	description: string;
	status: 'Active' | 'Completed';
	due_date: string;
}

export interface UserSettings {
	isDarkMode: boolean;
	filterDefaultValue: 'All' | 'Completed' | 'Active';
}
