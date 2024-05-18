<script>
    let schedule = {
        Monday: '',
        Tuesday: '',
        Wednesday: '',
        Thursday: '',
        Friday: '',
        Saturday: '',
        Sunday: ''
    };

    async function submitSchedule() {
        const response = await fetch('http://localhost:5173/collect_schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ schedule })
        });

        const data = await response.json();
        console.log(data);
    }
</script>

<main>
    <h1>Enter Your Busy Schedule</h1>
    {#each Object.keys(schedule) as day, index}
        <div>
            <label for={day}>{day}</label>
            <input type="text" id={day} bind:value={schedule[day]} placeholder="e.g., 9:00AM-10:15AM, 1:30PM-3:00PM" />
        </div>
    {/each}
    <button on:click={submitSchedule}>Submit</button>
</main>
