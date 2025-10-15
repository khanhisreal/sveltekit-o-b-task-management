<script lang="ts">
	import ComponentLayout from '$lib/client/components/layout/component-layout.svelte';
	import NoteTableActions from '$lib/client/components/note-table-actions.svelte';
	import type { Note } from '$lib/client/interfaces/interface';

	const { data } = $props();
	const LOCAL_STORAGE_KEY = 'lastVisitedQuery';

	const backURL = localStorage.getItem(LOCAL_STORAGE_KEY) ?? '/';

	const notes: Note[] = [
		{
			id: '1',
			task_id: data.id,
			content: 'Remember to include diagrams in slides.',
			created_at: '2025-10-11',
			due_date: '2025-10-20'
		},
		{
			id: '2',
			task_id: data.id,
			content: 'Add team contributions section.',
			created_at: '2025-10-12',
			due_date: '2025-10-20'
		},
		{
			id: '3',
			task_id: data.id,
			content: 'Finalize before Friday meeting.',
			created_at: '2025-10-13',
			due_date: '2025-10-20'
		}
	];
</script>

<ComponentLayout
	title={`Task: ${data.title}`}
	description={`Here, you can leave some notes for this task`}
	sectionTitle={'Task details'}
>
	<ul>
		<li><span>Id:</span> {data.id}</li>
		<li><span>Description:</span> {data.description}</li>
		<li><span>Status:</span> {data.status}</li>
		<li><span>Due date:</span> {data.due_date}</li>
	</ul>

	<hr class="rounded" />

	<h3 class="notes-header">Notes</h3>
	<NoteTableActions />

	{#if notes.length > 0}
		<div class="table-container">
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Note</th>
						<th>Date Created</th>
						<th>Due Date</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each notes as note}
						<tr>
							<td>{note.id}</td>
							<td>{note.content}</td>
							<td>{note.created_at}</td>
							<td>{note.due_date}</td>
							<td class="actions-cell">
								<div class="actions">
									<!-- svelte-ignore a11y_consider_explicit_label -->
									<button class="edit">
										<i class="fa-solid fa-pencil"></i>
									</button>
									<form
										method="POST"
										action="?/delete"
										onsubmit={(e) => {
											if (!confirm('Are you sure you want to delete this note?')) {
												e.preventDefault();
											}
										}}
									>
										<input type="hidden" name="id" value={note.id} />
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
				<button><i class="fa-solid fa-arrow-left"></i> Prev</button>
				<span>Page 0 / 0</span>
				<button>Next <i class="fa-solid fa-arrow-right"></i></button>
			</div>
		</div>
	{:else}
		<p class="fallback">No notes yet for this task. You can start by adding one.</p>
	{/if}

	<a href={backURL} class="back-button"
		><i class="fa-solid fa-arrow-left"></i> <span>Back to the last page</span></a
	>
</ComponentLayout>

<style>
	ul {
		margin: 5px 0px 0px 0px;
	}

	hr {
		margin: 20px 0px;
	}

	hr.rounded {
		border-top: 1px solid var(--muted-color);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
		border-radius: 5px;
	}

	ul span {
		font-weight: 600;
	}

	.notes-header {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 10px;
	}

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

	button {
		cursor: pointer;
	}

	.edit {
		background: #e0f7fa;
		border: none;
		padding: 4px 8px;
		border-radius: 4px;
		margin-right: 5px;
		transition: 0.2s;
	}

	.edit:hover {
		background: #caecf1;
	}

	.delete {
		background: #ffebee;
		border: none;
		padding: 4px 8px;
		border-radius: 4px;
		transition: 0.2s;
	}

	.delete:hover {
		background: #f6c9cf;
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

	/* .pagination button[disabled] {
		opacity: 0.5;
		cursor: not-allowed;
	} */

	.fallback {
		margin-top: 10px;
		font-style: italic;
		color: var(--muted-color);
	}

	.back-button {
		display: inline-block;
		margin-top: 20px;
		padding: 5px 10px;
		border-radius: 5px;
		text-decoration: none;
		background-color: var(--accent-color);
		color: white;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	.back-button:hover {
		background-color: var(--link-hover-bg);
		color: var(--link-hover-color);
	}

	@media (max-width: 768px) {
		table {
			min-width: 800px;
		}
	}
</style>
