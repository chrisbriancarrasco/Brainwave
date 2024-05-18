<script>

	import {goto} from '$app/navigation';

</script>
<h1>Welcome to Brainwave, your personal study recommendation chatbot</h1>

<button on:click={()=> goto("/about")}>About page</button>
<button on:click={()=> goto("/mainpage")}>Main page</button>