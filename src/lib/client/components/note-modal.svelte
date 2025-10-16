<script>
	import { fade } from 'svelte/transition';

	const { handleHideModal, isAddNote, taskId } = $props();

	console.log(taskId);

	//get current date
	const today = new Date();

	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');

	const current_date = `${year}-${month}-${day}`;
</script>

<div class="modal" transition:fade={{ duration: 200 }}>
	<div class="container">
		<div class="form-header">
			<h3>
				{#if isAddNote}
					Add a note
				{:else if !isAddNote}
					Edit a note
				{/if}
			</h3>
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button type="button" onclick={handleHideModal}>
				<i class="fa-solid fa-xmark"></i>
			</button>
		</div>
		<div class="form-content">
			<form method="POST" action={isAddNote ? '?/add' : '?/update'}>
				<input hidden type="text" name="task_id" value={taskId} />
				<input hidden type="date" name="created_at" value={current_date} />
				<div>
					<label for="content">Content:<span>*</span></label>
					<textarea
						name="content"
						id="content"
						placeholder="Add content for this note..."
						rows="2"
						required
					></textarea>
				</div>
				<div>
					<label for="due_date">Due date:</label>
					<input type="date" name="due_date" id="due_date" min={current_date} required />
				</div>

				<div class="action-buttons">
					<button type="button" class="cancel" onclick={handleHideModal}>Cancel</button>
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

	.form-content form input {
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

	input[type='date'] {
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

	input[type='date']:focus {
		border-color: var(--accent-color);
		outline: none;
	}

	.form-content form div {
		display: flex;
		align-items: center;
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

	.error {
		color: #ff4545;
	}
</style>
