/**
 * +page.server.ts = server-side controller for the page
 */
import { API_PATHS } from '$lib/server/constants/api-paths';
import type { Actions, PageServerLoad } from './$types';

async function getPaginatedTasks(page = 1, limit = 5, status = 'All', search = '') {
	const params = new URLSearchParams({
		page: String(page),
		limit: String(limit)
	});

	if (search) params.set('search', search);
	if (status && status !== 'All') params.set('status', status);

	const countParams = new URLSearchParams();
	if (search) countParams.set('search', search);
	if (status && status !== 'All') countParams.set('status', status);

	const [pageRes, countRes] = await Promise.all([
		fetch(`${API_PATHS.TASKS}?${params.toString()}`),
		fetch(`${API_PATHS.TASKS}?${countParams.toString()}`)
	]);

	if (!pageRes.ok || !countRes.ok) return { tasks: [], totalPages: 0 };

	const tasks = await pageRes.json();
	const allFilteredTasks = await countRes.json();

	if (!tasks || tasks.length === 0) {
		return { tasks: [], totalPages: 0 };
	}

	const totalPages = Math.ceil(allFilteredTasks.length / limit);

	return { tasks, totalPages };
}

export const load: PageServerLoad = async ({ url }) => {
	const page = Number(url.searchParams.get('page') ?? '1');
	const limit = Number(url.searchParams.get('limit') ?? '5');
	const status = url.searchParams.get('status') ?? 'All';
	const search = url.searchParams.get('search') ?? '';

	const { tasks, totalPages } = await getPaginatedTasks(page, limit, status, search);

	return {
		tasks,
		page,
		limit,
		totalPages,
		search,
		status
	};
};

//the server also runs any form actions
export const actions: Actions = {
	delete: async ({ request, url }) => {
		const form = await request.formData();
		const id = String(form.get('id'));

		await fetch(`${API_PATHS.TASKS}/${id}`, { method: 'DELETE' });

		const page = Number(url.searchParams.get('page') ?? '1');
		const limit = Number(url.searchParams.get('limit') ?? '5');
		const statusURL = url.searchParams.get('status') ?? undefined;
		return getPaginatedTasks(page, limit, statusURL);
	},

	add: async ({ request, url }) => {
		const form = await request.formData();
		const title = String(form.get('name') ?? '').trim();
		const description = String(form.get('description') ?? '').trim();
		const due_date = String(form.get('due_date') ?? '').trim();

		if (!title) return { error: 'Title is required' };

		await fetch(API_PATHS.TASKS, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title,
				description,
				status: 'Active',
				due_date
			})
		});

		const page = Number(url.searchParams.get('page') ?? '1');
		const limit = Number(url.searchParams.get('limit') ?? '5');
		const statusURL = url.searchParams.get('status') ?? undefined;
		return getPaginatedTasks(page, limit, statusURL);
	},

	update: async ({ request, url }) => {
		const form = await request.formData();
		const id = String(form.get('id'));
		const title = String(form.get('name') ?? '').trim();
		const description = String(form.get('description') ?? '').trim();
		const due_date = String(form.get('due_date') ?? '').trim();
		const status = String(form.get('status') ?? 'Active').trim();

		if (!title) return { error: 'Title is required' };

		await fetch(`${API_PATHS.TASKS}/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title,
				description,
				status: status === 'Completed' ? 'Completed' : 'Active',
				due_date
			})
		});

		const page = Number(url.searchParams.get('page') ?? '1');
		const limit = Number(url.searchParams.get('limit') ?? '5');
		const statusURL = url.searchParams.get('status') ?? undefined;
		return getPaginatedTasks(page, limit, statusURL);
	}
};
