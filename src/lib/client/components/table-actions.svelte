<script lang="ts">
	import { userSettings } from '$lib/client/stores/store';
	import type { FilterOption, UserSettings } from '../interfaces/Task';

	let { onAdd, onSearch, onFilter, status, search } = $props();

	let searchQuery = $state(search ?? '');
	let selectedStatus = $state(status ?? 'All');

	const unsubscribe = userSettings.subscribe((settings: UserSettings) => {
		selectedStatus = settings.filterDefaultValue ?? 'All';
	});

	function handleSearch() {
		onSearch(searchQuery);
	}

	function handleFilter(event: Event) {
		const target = event.target as HTMLSelectElement;
		const value = target.value;
		selectedStatus = value;
		userSettings.update((current: UserSettings) => ({
			...current,
			filterDefaultValue: value as FilterOption
		}));
		onFilter(value);
	}

	$effect(() => () => unsubscribe());
</script>

<div class="container">
	<button class="btn" onclick={onAdd}>
		<i class="fa-solid fa-plus"></i> <span>Add Task</span>
	</button>

	<input type="text" placeholder="Search tasks..." bind:value={searchQuery} />

	<button class="btn" onclick={handleSearch}
		><i class="fa-solid fa-magnifying-glass"></i> <span>Search</span>
	</button>

	<select bind:value={selectedStatus} onchange={handleFilter}>
		<option value="All">All</option>
		<option value="Active">Active</option>
		<option value="Completed">Completed</option>
	</select>
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
	}

	.btn {
		background-color: var(--accent-color);
		color: white;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	.btn:hover {
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
		.btn span {
			display: none;
		}
	}
</style>
