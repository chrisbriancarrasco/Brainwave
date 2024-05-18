<script>
    import {goto} from '$app/navigation';
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';

    let plugins = [TimeGrid];
    let options = {
        view: 'timeGridWeek',
        events: [
            // your list of events
        ]
    };
</script>
<h1>This is the main page</h1>

<button on:click={()=> goto("/createSchedule")}>Create Schedule</button>

<Calendar {plugins} {options} />