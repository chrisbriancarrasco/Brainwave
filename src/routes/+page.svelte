<script>
    import {goto} from '$app/navigation';

    // Simulated user authentication check
    // let isAuthenticated = false; // Change this to actual authentication check

    // function checkAuthAndNavigate(path) {
    //     if (path === '/mainpage' && !isAuthenticated) {
    //         alert('Please sign in before going to the main page.');
    //     } else {
    //         goto(path);
    //     }
    // }
</script>

<h1>Welcome to Brainwave, your personal study recommendation chatbot</h1>

<button on:click={() => goto("/about")}>About page</button>
<button on:click={() => goto("/mainpage")}>Main page</button>
<button on:click={() => goto("/contact")}>Ask for Help</button>
<button on:click={() => goto("/submitHours")}>Submit Study Hours</button>

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
