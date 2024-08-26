<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Calendar from '@event-calendar/core';
  import TimeGrid from '@event-calendar/time-grid';

  export let data = {};
  export let form;
  let recommendations = [];

  let plugins = [TimeGrid];
  let options = {
    view: 'timeGridWeek',
    events: data.events,
    eventClassNames: ["eventDetails"],
  };

  import Modal,{getModal} from './Modal.svelte'
	let name = 'world';
	
	let selection
	
	// Callback function provided to the `open` function, it receives the value given to the `close` function call, or `undefined` if the Modal was closed with escape or clicking the X, etc.
	function setSelection(res){
		selection=res
	}

  let showCalendar = false;

  onMount(() => {
    showCalendar = true;
    if (form?.recommendations.length) {
      getModal().open();
    }
  });
</script>

{#if form}
<Modal>
	<h1>Study Hours Recommendations</h1>
	{#each form.recommendations as r}
    <div class=recommendation>
      You are in {r.course_name} and here are your recommended hours {r.recommended_hours} based on these hours to succeed in this course, you should be studying an additional {r.additional} hours.
    </div>
  {/each}
</Modal>
{/if}

<div class="main-container">
  <div class="button-group">
    <button on:click={() => goto("/createSchedule?addType=availability")}>Add Availability</button>
    <button on:click={() => goto("/createSchedule?addType=class")}>Add Classes</button>
    <button on:click={() => goto("/createSchedule?addType=meditation")}>Add Meditation</button>
  </div>
  <div class="button-group">
    <form method="POST" action="?/get_recommendations">
      <input type=hidden name=userid value={data.userid} />
      <button class="add-btn" type="submit">Show Recommendations</button>
    </form>
    <button on:click={() => goto("/createSchedule?addType=study")}>Add Study Hours</button>
  </div>

  <div class="legend-container">
    {#each data.legend as l}
      <div class="legend-item">
        <div class="color_chip" style="background-color: {l.color}"></div>
        <span>{l.type}</span>
      </div>
    {/each}
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
    align-items: center;
    padding: 20px;
    width: 100%;
    height: 100%; 
    box-sizing: border-box; 
  }

  h1 {
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
    flex-grow: 1; 
  }

  .legend-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    margin: 0 10px;
  }

  .color_chip {
    height: 30px;
    min-height: 30px;
    max-height: 30px;
    width: 30px;
    margin-right: 5px;
  }

  .recommendation {
    display: flex;
  }
</style>
