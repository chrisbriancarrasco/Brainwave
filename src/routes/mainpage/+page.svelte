<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Calendar from '@event-calendar/core';
  import TimeGrid from '@event-calendar/time-grid';

  export let data = {};

  let plugins = [TimeGrid];
  let options = {
    view: 'timeGridWeek',
    events: 
      data.events
    
  };

  let showCalendar = false;

  function RecommendedHours() {
    // Add logic 
    return 40; // ex. recommended 40 hours
  }

  onMount(() => {
    showCalendar = true;
  });
</script>

<div class="main-container">
  <h1>This is the main page</h1>
  <p>Welcome Username @ email</p>

  <div class="button-group">
    <button on:click={() => goto("/createSchedule")}>Add Availability</button>
    <button on:click={() => goto("/createSchedule")}>Add Classes</button>
    <button on:click={() => goto("/createSchedule")}>Add Meditation</button>
  </div>
  <div class="button-group">
    <button on:click={() => goto("/editPage")}>Get Recommendations</button>
    <button on:click={() => goto("/createSchedule")}>Add Study Hours</button>
  </div>

  <div class="calendar-container">
    {#if showCalendar}
      <Calendar {plugins} {options} />
    {/if}
  </div>
</div>

<style>
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    max-width: 600px; 
    margin: 0 auto; 
  }

  h1, p {
    margin-bottom: 20px;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 600px;
    margin-bottom: 10px;
  }

  button {
    flex: 1;
    margin: 0 5px;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    transition: background-color 0.3s;
  }

  button:first-child {
    margin-left: 0;
  }

  button:last-child {
    margin-right: 0;
  }

  button:hover {
    background-color: #0056b3;
  }

  .calendar-container {
    width: 100%; 
    max-width: 600px; 
  }

  .recommended-hours-container {
    margin-top: 20px;
  }
</style>
