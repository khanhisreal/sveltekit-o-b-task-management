import type { Note, Task } from '$lib/client/interfaces/interface.js';
import { API_PATHS } from '$lib/server/constants/api-paths.js';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url, fetch }) => {
	const task_id = params.slug;

	const page = url.searchParams.get('page') ?? '1';
	const limit = url.searchParams.get('limit') ?? '5';
	const content = url.searchParams.get('content') ?? '';

	const taskRes = await fetch(`${API_PATHS.TASKS}/${task_id}`);
	const task: Task = await taskRes.json();

	const paginatedQuery = new URLSearchParams({
		task_id,
		page,
		limit,
		...(content && { content })
	});

	const res_note = await fetch(`${API_PATHS.NOTES}?${paginatedQuery.toString()}`);
	const notes: Note[] = await res_note.json();

	const countQuery = new URLSearchParams({
		task_id,
		...(content && { content })
	});
	const res_count = await fetch(`${API_PATHS.NOTES}?${countQuery.toString()}`);
	const allNotes: Note[] = await res_count.json();

	const totalCount = allNotes.length;
	const totalPages = Math.ceil(totalCount / Number(limit));

	return {
		task,
		notes,
		content,
		pagination: {
			page: Number(page),
			limit: Number(limit),
			totalCount,
			totalPages
		}
	};
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
		const id = form.get('id');
		const task_id = form.get('task_id');
		const created_at = String(form.get('created_at') ?? '').trim();
		const content = String(form.get('content') ?? '').trim();
		const due_date = String(form.get('due_date') ?? '').trim();

		const response = await fetch(`${API_PATHS.NOTES}/${id}`, {
			method: 'PUT',
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
	delete: async ({ request }) => {
		const form = await request.formData();
		const id = String(form.get('id'));

		const response = await fetch(`${API_PATHS.NOTES}/${id}`, {
			method: 'DELETE'
		});
		console.log(response.status);
	}
};
