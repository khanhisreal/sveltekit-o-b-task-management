<script lang="ts">
	import ComponentLayout from '$lib/client/components/layout/component-layout.svelte';
	import NoteTableActions from '$lib/client/components/note-table-actions.svelte';
	import NoteModal from '$lib/client/components/note-modal.svelte';
	import type { Note } from '$lib/client/interfaces/interface';

	const LOCAL_STORAGE_KEY = 'lastVisitedQuery';
	const { data } = $props();

	console.log(data);

	const task = data.task;
	const notes: Note[] | string | undefined = data.notes;

	let toggleModal = $state(false);
	let isAddNote = $state(true);

	function handleShowModal() {
		toggleModal = true;
	}

	function handleHideModal() {
		toggleModal = false;
	}

	function handleAddNote() {
		isAddNote = true;
	}

	function handleEditNote() {
		isAddNote = false;
	}

	const backURL = localStorage.getItem(LOCAL_STORAGE_KEY) ?? '/';
</script>

<ComponentLayout
	title={`Task: ${task!.title}`}
	description={`Here, you can leave some notes for dedicated to this task`}
	sectionTitle={'Task details'}
>
	<ul>
		<li><span>Id:</span> {task!.id}</li>
		<li><span>Description:</span> {task!.description}</li>
		<li><span>Status:</span> {task!.status}</li>
		<li><span>Due date:</span> {task!.due_date}</li>
	</ul>

	<a href={backURL} class="back-button"
		><i class="fa-solid fa-arrow-left"></i> <span>Comeback to task list</span></a
	>

	<NoteTableActions {handleShowModal} {handleAddNote} />

	{#if toggleModal}
		<NoteModal {handleHideModal} {isAddNote} taskId={task?.id} />
	{/if}

	{#if Array.isArray(notes) && notes!.length > 0}
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
									<button
										class="edit"
										onclick={() => {
											handleShowModal();
											handleEditNote();
										}}
									>
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
</ComponentLayout>

<style>
	ul {
		margin: 5px 0px 15px 0px;
	}

	ul span {
		font-weight: 600;
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
		margin-top: 20px;
		text-align: center;
		font-style: italic;
		color: var(--muted-color);
		font-size: 1rem;
		background: var(--muted-bg);
		padding: 50px;
		border-radius: 8px;
	}

	.back-button {
		display: inline-block;
		margin-bottom: 10px;
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
