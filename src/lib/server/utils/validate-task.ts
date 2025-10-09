import { fail } from '@sveltejs/kit';

export function validateTaskData({
	title,
	description,
	due_date
}: {
	title: string;
	description: string;
	due_date: string;
}) {
	title = title.trim();
	description = description.trim();
	due_date = due_date.trim();

	if (!title) {
		throw fail(400, { error: 'The task title must not be empty.' });
	}
	if (title.length > 100) {
		throw fail(422, { error: 'The task title must not exceed 100 characters.' });
	}

	if (description.length > 400) {
		throw fail(422, { error: 'The task description must not exceed 400 characters.' });
	}

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const dueDateObj = new Date(due_date);
	if (isNaN(dueDateObj.getTime())) {
		throw fail(400, { error: 'Invalid due date format.' });
	}
	if (dueDateObj < today) {
		throw fail(422, { error: 'The due date cannot be in the past.' });
	}
}
