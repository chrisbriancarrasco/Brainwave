<script>
	import { auth } from '$lib/auth';
</script>

<main>
	<header class="space-y-4">
		<nav class="flex gap-4">
			{#if $auth === undefined}
				Loading...
			{:else if $auth === null}
				<button class="hover:underline" on:click={auth.sign_in}>Sign In</button>
			{:else}
				<button class="hover:underline" on:click={auth.sign_out}>Sign Out</button> | {$auth.displayName}
				| {$auth.email}
				|
				<img class="profile_pic" src={$auth.photoURL} alt="$auth.displayName" />
			{/if}
		</nav>
	</header>
</main>

<style lang="postcss">
	.profile_pic {
		width: 50px;
		height: 50px;
	}
</style>
