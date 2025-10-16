import type { Note, Task } from '$lib/client/interfaces/interface.js';
import { API_PATHS } from '$lib/server/constants/api-paths.js';
import type { Actions } from '@sveltejs/kit';

let task: Task;
let notes: Note[];

export const load = async ({ params }) => {
	const task_id = params.slug;

	//task response
	const res = await fetch(`${API_PATHS.TASKS}/${task_id}`);
	task = await res.json();

	//note response
	const res_note = await fetch(`${API_PATHS.NOTES}?task_id=${task_id}`);
	notes = await res_note.json();

	if (task && notes) return { task, notes };
};

export const actions: Actions = {
	add: async ({ request }) => {
		const form = await request.formData();
		const task_id = form.get('task_id');
		const created_at = String(form.get('created_at') ?? '').trim();
		const content = String(form.get('content') ?? '').trim();
		const due_date = String(form.get('due_date') ?? '').trim();

		const response = await fetch(API_PATHS.NOTES, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				task_id,
				content,
				created_at,
				due_date
			})
		});
		console.log(response.status);
	},
	update: async ({ request }) => {
		const form = await request.formData();
		console.log(form);
	}
};
