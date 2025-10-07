<script>
	const { title, description, sectionTitle } = $props();
</script>

<div class="container">
	<div class="heading">
		<h3>{title}</h3>
		<p>{description}</p>
	</div>

	<!-- svelte-ignore slot_element_deprecated -->
	<div class="table">
		<h3>{sectionTitle}</h3>
		<slot/>
	</div>
</div>

<style>
	.heading {
		text-align: center;
	}
</style>
