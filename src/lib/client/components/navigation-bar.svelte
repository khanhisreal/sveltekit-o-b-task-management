<script>
	import { page } from '$app/stores';
	import { userSettings } from '$lib/client/stores/store';
	$: currentPath = $page.url.pathname;
</script>

<div class="container" class:dark={$userSettings.isDarkMode}>
	<a href="/" class:active={currentPath === '/'}>
		<i class="fa-solid fa-house"></i> Homepage
	</a>
	<a href="/settings" class:active={currentPath === '/settings'}>
		<i class="fa-solid fa-gear"></i> Settings
	</a>
</div>

<style>
	.container {
		width: 100%;
		padding: 10px;
		background-color: var(--header-bg);
		display: flex;
		flex-wrap: wrap;
	}

	a {
		display: block;
		padding: 10px 15px;
		margin-right: 15px;
		border-radius: 5px;
		font-size: 95%;
		color: var(--accent-color);
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	a i {
		margin-right: 5px;
	}

	a:hover {
		color: var(--link-hover-color);
		background-color: var(--link-hover-bg);
		cursor: pointer;
		text-decoration: none;
	}

	a.active {
		background-color: gray;
		color: lightgray;
		text-decoration: none;
	}
</style>
