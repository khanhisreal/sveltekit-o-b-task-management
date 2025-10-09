<script lang="ts">
	import TableActions from '../lib/client/components/table-actions.svelte';
	import Modal from '../lib/client/components/modal.svelte';
	import ComponentLayout from '../lib/client/components/layout/component-layout.svelte';
	import { userSettings } from '$lib/client/stores/store';
	import { onMount } from 'svelte';

	//comes from +page.server.ts
	let { data, form } = $props();

	let tasks = $state([...data.tasks]);
	let page = data.page ?? 1;
	let limit = data.limit ?? 5;
	let totalPages = data.totalPages ?? 1;

	let status = $state(data.status ?? 'All');
	let search = data.search ?? '';

	let showAddForm = $state(false);
	let isAddTask = $state(false);
	let taskId = $state();

	onMount(() => {
		const unsubscribe = userSettings.subscribe((settings) => {
			if (status === 'All' && settings.filterDefaultValue !== 'All') {
				status = settings.filterDefaultValue;
				handleFilter(settings.filterDefaultValue);
			}
		});
		return unsubscribe; //clean up when component unmounts
	});

	function updateQuery(params: Record<string, string | number | undefined>) {
		const url = new URL(window.location.href);
		for (const key in params) {
			if (params[key] === undefined || params[key] === '' || params[key] === 'All') {
				url.searchParams.delete(key);
			} else {
				url.searchParams.set(key, String(params[key]));
			}
		}
		window.location.href = url.toString();
	}

	function handleAdd() {
		showAddForm = !showAddForm;
		isAddTask = true;
		taskId = undefined;
	}

	function handleEdit(id: string) {
		showAddForm = !showAddForm;
		isAddTask = false;
		taskId = id;
	}

	function handleSearch(query: string) {
		updateQuery({ search: query, page: 1 });
	}

	function handleFilter(selected: string) {
		updateQuery({ status: selected, page: 1 });
	}

	function goToPage(n: number) {
		if (n < 1 || n > totalPages) return;
		updateQuery({ page: n, limit });
	}
</script>

<ComponentLayout
	title={'Welcome to our Project Management App'}
	description={'Keep your projects on track with real-time updates.'}
	sectionTitle={'To-do list'}
>
	<TableActions
		onAdd={handleAdd}
		onSearch={handleSearch}
		onFilter={handleFilter}
		{status}
		{search}
	/>

	{#if showAddForm}
		<Modal onAdd={handleAdd} {isAddTask} {taskId} {tasks} {form} />
	{/if}

	<div class="table-container" id="table">
		<table>
			<thead>
				<tr>
					<th>Title</th>
					<th>Description</th>
					<th>Status</th>
					<th>Due Date</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each tasks as task}
					<tr>
						<td>{task.title}</td>
						<td>{task.description}</td>
						<td>
							<button
								class="status-btn"
								class:completed={task.status === 'Completed'}
								class:active={task.status === 'Active'}
								style="cursor: auto"
							>
								{task.status}
							</button>
						</td>
						<td>{task.due_date}</td>
						<td class="actions-cell">
							<div class="actions">
								<!-- svelte-ignore a11y_consider_explicit_label -->
								<button class="edit" onclick={() => handleEdit(task.id)}>
									<i class="fa-solid fa-pencil"></i>
								</button>
								<form
									method="POST"
									action="?/delete"
									onsubmit={(e) => {
										if (!confirm('Are you sure you want to delete this task?')) {
											e.preventDefault();
										}
									}}
								>
									<input type="hidden" name="id" value={task.id} />
									<!-- svelte-ignore a11y_consider_explicit_label -->
									<button type="submit" class="delete">
										<i class="fa-solid fa-trash"></i>
									</button>
								</form>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<div class="pagination">
			<button onclick={() => goToPage(page - 1)} disabled={page <= 1}
				><i class="fa-solid fa-arrow-left"></i> Prev</button
			>
			<span>Page {page} / {totalPages}</span>
			<button onclick={() => goToPage(page + 1)} disabled={page >= totalPages}
				>Next <i class="fa-solid fa-arrow-right"></i></button
			>
		</div>
	</div>
</ComponentLayout>

<style>
	.table-container {
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		border: 1px solid #ddd;
		border-radius: 8px;
		margin-top: 10px;
		background-color: var(--bg-color);
		color: var(--text-color);
	}

	table {
		border-collapse: collapse;
		width: 100%;
	}

	thead {
		position: sticky;
		top: 0;
		background-color: var(--header-bg);
		color: var(--text-color);
		z-index: 1;
	}

	th,
	td {
		padding: 12px 15px;
		border-bottom: 1px solid var(--muted-color);
		text-align: left;
	}

	.pagination {
		margin-top: 12px;
		margin-bottom: 12px;
		display: flex;
		gap: 8px;
		align-items: center;
		justify-content: center;
	}

	.pagination span {
		margin: 0px 8px;
	}

	.pagination button {
		padding: 5px;
		border-radius: 5px;
		border: 1px solid grey;
		background-color: var(--header-bg);
		color: var(--text-color);
	}

	.pagination button[disabled] {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.status-btn {
		background: none;
		border: 1px solid #ccc;
		padding: 4px 8px;
		border-radius: 4px;
		cursor: pointer;
		color: var(--text-color);
	}

	.completed {
		background-color: #f0fff0;
		color: #333;
		font-weight: 500;
	}

	.active {
		background-color: #fffbea;
		color: #333;
		font-weight: 500;
	}

	button {
		cursor: pointer;
	}

	.edit {
		background: #e0f7fa;
		border: none;
		padding: 4px 8px;
		border-radius: 4px;
		margin-right: 5px;
	}

	.delete {
		background: #ffebee;
		border: none;
		padding: 4px 8px;
		border-radius: 4px;
	}
	.actions-cell {
		width: 1%;
		white-space: nowrap;
	}

	.actions {
		display: flex;
		gap: 6px;
		align-items: center;
	}

	@media (max-width: 768px) {
		table {
			min-width: 800px;
		}
	}
</style>
