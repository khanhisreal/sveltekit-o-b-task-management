<script lang="ts">
	import type { Task } from '../interfaces/Task';
	import { fade } from 'svelte/transition';

	let { onAdd, isAddTask, taskId, tasks, form } = $props();

	let task = !isAddTask && taskId ? tasks.find((t: Task) => t.id === taskId) : null;

	let title = isAddTask ? 'Add Task' : 'Edit Task';

	const today = new Date().toISOString().split('T')[0];
</script>

<div class="modal" transition:fade={{ duration: 200 }}>
	<div class="container">
		<div class="form-header">
			<h3>{title}</h3>
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button onclick={onAdd}><i class="fa-solid fa-xmark"></i></button>
		</div>
		<div class="form-content">
			<form method="POST" action={isAddTask ? '?/add' : '?/update'}>
				{#if !isAddTask}
					<input type="hidden" name="id" value={taskId} />
				{/if}
				<div>
					<label for="name">Name:<span>*</span></label>
					<input
						type="text"
						name="name"
						id="name"
						placeholder="Add task name"
						value={task?.title ?? ''}
						required
					/>
				</div>
				<div>
					<label for="description">Description:</label>
					<textarea name="description" id="description" placeholder="Add description" rows="3">
						{task?.description ?? ''}
					</textarea>
				</div>
				<div>
					<label for="due_date">Due date:</label>
					<input
						type="date"
						name="due_date"
						id="due_date"
						value={task?.due_date ?? ''}
						min={today}
						required
					/>
				</div>
				{#if !isAddTask && task}
					<div>
						<label for="status">Set status:</label>
						<select name="status" id="status" value={task?.status ?? 'Active'}>
							<option value="Active">Active</option>
							<option value="Completed">Completed</option>
						</select>
					</div>
				{/if}
				<div class="action-buttons">
					<button type="button" onclick={onAdd} class="cancel">Cancel</button>
					<button type="submit" class="confirm">Confirm</button>
				</div>
			</form>
		</div>
	</div>
</div>

<style>
	.modal {
		position: fixed;
		z-index: 2;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.4);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container {
		background-color: var(--bg-color);
		width: 360px;
		padding: 15px;
		border-radius: 10px;
	}

	.form-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.form-header button {
		border-radius: 50%;
		border: none;
		padding: 10px;
		cursor: pointer;
	}

	.form-header button:hover {
		background-color: #e0e0e0;
	}

	.form-header button:active {
		background-color: lightgrey;
	}

	.form-content form {
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 400px;
	}

	.form-content form label {
		width: 120px;
		font-weight: 500;
	}

	.form-content form label span {
		color: red;
	}

	.form-content form input,
	.form-content form select {
		flex: 1;
		padding: 6px 8px;
		color: var(--text-color);
		border: 1px solid var(--muted-color);
		background-color: var(--bg-color);
		border-radius: 5px;
		transition:
			background-color 0.3s ease,
			color 0.3s ease,
			border-color 0.3s ease;
	}

	input[type='text']::placeholder {
		color: var(--muted-color);
	}

	input[type='text']:focus {
		border-color: var(--accent-color);
		outline: none;
	}

	input[type='date'],
	select {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		background-color: var(--bg-color);
		color: var(--text-color);
		border: 1px solid var(--muted-color);
		border-radius: 5px;
		padding: 6px 8px;
		font-family: inherit;
		font-size: 14px;
		cursor: pointer;
	}

	input[type='date']:focus,
	select:focus {
		border-color: var(--accent-color);
		outline: none;
	}

	.form-content form div {
		display: flex;
		align-items: center;
	}

	select {
		background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='12' width='12' xmlns='http://www.w3.org/2000/svg'><path d='M2 4l4 4 4-4z'/></svg>");
		background-repeat: no-repeat;
		background-position: right 10px center;
		background-size: 12px;
		padding-right: 30px;
	}

	input[type='date']::-webkit-calendar-picker-indicator {
		filter: invert(50%);
		cursor: pointer;
	}

	textarea {
		flex: 1;
		padding: 6px 8px;
		min-height: 32px;
		max-height: 128px;
		color: var(--text-color);
		border: 1px solid var(--muted-color);
		background-color: var(--bg-color);
		border-radius: 5px;
		font-family: inherit;
		font-size: 14px;
		resize: vertical;
		transition:
			background-color 0.3s ease,
			color 0.3s ease,
			border-color 0.3s ease;
	}

	textarea::placeholder {
		color: var(--muted-color);
	}

	textarea:focus {
		border-color: var(--accent-color);
		outline: none;
	}

	.action-buttons {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
		margin-top: 15px;
	}

	.action-buttons button {
		padding: 10px 18px;
		border: none;
		border-radius: 6px;
		font-size: 14px;
		cursor: pointer;
		transition:
			transform 0.1s ease,
			background-color 0.2s ease;
	}

	.action-buttons .cancel {
		background-color: #e0e0e0;
		color: #333;
	}

	.action-buttons .cancel:hover {
		background-color: #d6d6d6;
	}

	.action-buttons .cancel:active {
		transform: scale(0.95);
	}

	.action-buttons .confirm {
		background-color: var(--accent-color);
		color: white;
	}

	.action-buttons .confirm:hover {
		background-color: var(--link-hover-bg);
		color: var(--link-hover-color);
	}

	.action-buttons .confirm:active {
		transform: scale(0.95);
	}
</style>
