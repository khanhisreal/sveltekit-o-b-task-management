<script lang="ts">
	import favicon from '$lib/client/assets/favicon.svg';
	import NavigationBar from '../lib/client/components/navigation-bar.svelte';
	import Footer from '../lib/client/components/footer.svelte';
	import { userSettings } from '$lib/client/stores/store';

	let { children } = $props();
	let ready = $state(false);

	$effect(() => {
		const unsubscribe = userSettings.subscribe(() => {
			ready = true;
		});
		return unsubscribe;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if ready}
	<div class="layout" class:dark={$userSettings.isDarkMode}>
		<header>
			<NavigationBar />
		</header>

		<section>
			{@render children()}
		</section>

		<footer>
			<Footer />
		</footer>
	</div>
{/if}

<style>
	.layout {
		width: 100vw;
		min-height: 100vh;
		height: auto;
		background-color: var(--bg-color);
		color: var(--text-color);
		display: flex;
		flex-direction: column;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	section {
		padding: 10px;
	}
</style>
