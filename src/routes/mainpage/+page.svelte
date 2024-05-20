<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';
  
    let plugins = [TimeGrid];
    let options = {
      view: 'timeGridWeek',
      events: [
        // 
      ]
    };
  
    let showCalendar = false;
  
    function calculateRecommendedHours() {
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
  
    <div class="recommended-hours-container">
      <p>Recommended Hours: {calculateRecommendedHours()} hours</p>
    </div>
  
    <button on:click={() => goto("/createSchedule")}>Create Schedule</button>
    <button on:click={() => goto("/editPage")}>Edit Schedule</button>
  
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
  
    button {
      margin-right: 10px;
      margin-bottom: 10px;
      padding: 10px 20px;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      background-color: #007bff;
      color: white;
      transition: background-color 0.3s;
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
  