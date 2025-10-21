<script lang="ts">
	const PAGE_OPTIONS = ['1', '2', '3', '4', '5'];
	const { handleAddNote, currentLimit, initialContent = '' } = $props();

	let searchQuery = $state(initialContent);
	let selectedLimit = $state(String(currentLimit));

	function handleLimitChange(e: Event) {
		const limit = (e.target as HTMLSelectElement).value;
		const url = new URL(window.location.href);
		url.searchParams.set('limit', limit);
		url.searchParams.set('page', '1');
		window.location.href = url.toString();
	}

	function handleSearch(e: Event) {
		e.preventDefault();
		const q = searchQuery.trim();

		const url = new URL(window.location.href);

		if (q) {
			url.searchParams.set('content', q);
			url.searchParams.set('page', '1');
		} else {
			url.searchParams.delete('content');
			url.searchParams.set('page', '1');
		}
		window.location.href = url.toString();
	}
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<div class="container">
	<button
		onclick={() => {
			handleAddNote();
		}}
		><i class="fa-solid fa-plus"></i>
	</button>

	<form onsubmit={handleSearch} style="display: flex; gap: 0; align-items: center;">
		<input type="text" placeholder="Start typing here..." bind:value={searchQuery} />
		<button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
	</form>

	<label for="page-limit">Records per page:</label>
	<select name="page-limit" bind:value={selectedLimit} onchange={handleLimitChange}>
		{#each PAGE_OPTIONS as option}
			<option value={`${option}`}>{option}</option>
		{/each}
	</select>
</div>

<style>
	.container {
		margin-top: 10px;
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
		padding: 15px;
		border: 1px solid #ddd;
		border-radius: 8px;
		width: fit-content;
	}

	button {
		padding: 9px 12px;
		border-radius: 5px;
		border: none;
		margin-left: 8px;
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
		width: auto;
		min-width: 220px;
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
</style>
