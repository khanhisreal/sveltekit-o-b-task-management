<script lang="ts">
	import ComponentLayout from '../../lib/client/components/layout/component-layout.svelte';
	import { userSettings } from '$lib/client/stores/store';

	function toggleTheme() {
		userSettings.update((current) => ({
			...current,
			isDarkMode: !current.isDarkMode
		}));
	}
</script>

<ComponentLayout
	title={'App Settings'}
	description={'Customize how your Task Manager app looks and behaves.'}
	sectionTitle={'Preferences & Theming'}
>
	<div class="toggle-theme">
		<span>Toggle theme</span>
		<label class="switch">
			<input type="checkbox" on:change={toggleTheme} />
			<span class="slider"></span>
		</label>
	</div>

	<div class="default-filter">
		<span>Set default filter</span>
	</div>
</ComponentLayout>

<style>
	div {
		margin: 20px 0px;
	}

	.toggle-theme {
		display: flex;
		align-items: center;
		gap: 1rem;
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
</style>
