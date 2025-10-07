<script lang="ts">
	import { userSettings } from '$lib/client/stores/store';
	const year = new Date().getFullYear();
</script>

<div class="container" class:dark={$userSettings.isDarkMode}>
	<div class="wrapper">
		<h5>O&B Svelte Sample App &copy; {year}</h5>
		<div class="links">
			<a href="https://github.com" target="_blank">GitHub</a>
			<a href="https://svelte.dev/docs/kit/introduction">Docs</a>
		</div>
	</div>
</div>

<style>
	.container {
		position: fixed;
		width: 100%;
		bottom: 0;
		background-color: var(--footer-bg);
		padding: 15px 20px;
		display: flex;
		justify-content: center;
		box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
		z-index: 1;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
		font-size: 0.9rem;
		color: #333;
	}

	.links {
		display: flex;
		gap: 10px;
	}

	.links a {
		color: var(--link-hover-color);
		text-decoration: none;
		transition: color 0.2s;
	}

	.links a:hover {
		color: #000;
	}

	h5 {
		color: var(--text-color);
	}
</style>
