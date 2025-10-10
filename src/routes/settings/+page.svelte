<script lang="ts">
	import ComponentLayout from '../../lib/client/components/layout/component-layout.svelte';
	import { userSettings } from '$lib/client/stores/store';
	import { FILTER_OPTIONS } from '$lib/client/interfaces/Task';
</script>

<ComponentLayout
	title={'App Settings'}
	description={'Customize how your Task Manager app looks and behaves.'}
	sectionTitle={'Preferences & Theming'}
>
	<div class="toggle-theme">
		<span>Toggle theme</span>
		<label class="switch">
			<input type="checkbox" bind:checked={$userSettings.isDarkMode} />
			<span class="slider"></span>
		</label>
	</div>

	<div class="default-filter">
		<span>Set default filter</span>
		<select bind:value={$userSettings.filterDefaultValue}>
			{#each FILTER_OPTIONS as option}
				<option value={option}>{option}</option>
			{/each}
		</select>
	</div>

	<div class="page-limit">
		<span>Set page limit</span>
		<select bind:value={$userSettings.pageLimitDefaultValue}>
			<option value={'5'}>5</option>
			<option value={'10'}>10</option>
			<option value={'15'}>15</option>
			<option value={'20'}>20</option>
		</select>
	</div>
</ComponentLayout>

<style>
	div {
		margin: 20px 0px;
		gap: 1rem;
		display: flex;
		align-items: center;
	}

	.switch {
		position: relative;
		display: inline-block;
		width: 50px;
		height: 26px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		transition: 0.4s;
		border-radius: 26px;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 20px;
		width: 20px;
		left: 3px;
		bottom: 3px;
		background-color: white;
		transition: 0.4s;
		border-radius: 50%;
	}

	input:checked + .slider {
		background-color: #4caf50;
	}

	input:checked + .slider:before {
		transform: translateX(24px);
	}

	select {
		padding: 6px 12px;
		border: 1px solid #ccc;
		border-radius: 6px;
		background-color: var(--bg-color);
		color: var(--text-color);
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	select:hover {
		border-color: var(--accent-color);
	}

	select:focus {
		outline: none;
	}
</style>
