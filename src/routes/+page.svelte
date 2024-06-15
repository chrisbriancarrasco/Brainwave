<script>
	import {goto} from '$app/navigation';
</script>

<h1>Welcome to Brainwave, your personal study recommendation chatbot</h1>

<button on:click={()=> goto("/about")}>About page</button>
<button on:click={()=> goto("/mainpage")}>Main page</button>

<p>Go to page that is publicly available.</p>
<button on:click={() => {goto('/public')}}>/public</button>

<p>Go to page that is available only to logged-in users (or Admin users).</p>
<button on:click={() => {goto('/product')}}>/product</button>

<p>Go to user profile which is available only to logged-in users.</p>
<button on:click={() => {goto('/user/profile')}}>/user/profile</button>

<p>Go to page that is available only to useradmin users.</p>
<button on:click={() => {goto('/useradmin')}}>/useradmin</button>

<p>Go to page that is available only to logged-in SUPER users.</p>
<button on:click={() => {goto('/admin')}}>/admin</button>
