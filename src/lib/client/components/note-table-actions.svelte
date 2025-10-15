<script>
	const PAGE_OPTIONS = ['1', '2', '3', '4', '5'];
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<div class="container">
	<button><i class="fa-solid fa-plus"></i> <span>Add a note</span></button>
	<input type="text" placeholder="Search by id, note, date created, or due date" />
	<select>
		{#each PAGE_OPTIONS as option}
			<option value={`${option}`}>{option}</option>
		{/each}
	</select>
	<button><i class="fa-solid fa-magnifying-glass"></i> <span>Search</span></button>
</div>

<style>
	.container {
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
	}

	button {
		padding: 6px 12px;
		border-radius: 5px;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 5px;
		font-weight: 500;
		background-color: var(--accent-color);
		color: white;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	button:hover {
		background-color: var(--link-hover-bg);
		color: var(--link-hover-color);
	}

	input[type='text'] {
		flex: 1;
		min-width: 180px;
		padding: 6px 10px;
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

	select {
		padding: 6px 10px;
		border: 1px solid var(--muted-color);
		background-color: var(--bg-color);
		color: var(--text-color);
		border-radius: 5px;
		transition:
			background-color 0.3s ease,
			color 0.3s ease,
			border-color 0.3s ease;
	}

	select:hover {
		border-color: var(--accent-color);
	}

	select:focus {
		outline: none;
	}

	@media screen and (max-width: 534px) {
		button span {
			display: none;
		}
	}
</style>
