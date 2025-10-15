import { API_PATHS } from '$lib/server/constants/api-paths.js';

let current_task = null;

export const load = async ({ params }) => {
	const task_id = params.slug;

	const res = await fetch(`${API_PATHS.TASKS}/${task_id}`);
	current_task = await res.json();

	if (current_task) return current_task;
};
