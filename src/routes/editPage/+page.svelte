<script>
	let classSchedule = []; // Array to store class schedule data
	let times = [
	  "7:00 AM", "7:30 AM",
	  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
	  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
	  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
	  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
	  "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM"
	];
  
	let classNames = [
	  "CPSC 120",
	  "CPSC 121",
	  "CPSC 131",
	  "CPSC 223",
	  "CPSC 240",
	  "CPSC 253",
	  "CPSC 315",
	  "CPSC 323",
	  "CPSC 332",
	  "CPSC 335",
	  "CPSC 351",
	  "CPSC 362",
	  "CPSC 471",
	  "CPSC 481",
	  "CPSC 490",
	  "CPSC 491"
	  // Add more class names as needed
	];
  
	function addClass() {
	  classSchedule = [...classSchedule, { class: "", start_time: "", end_time: "", day: "" }];
	}
  
	function removeClass(index) {
	  classSchedule = classSchedule.filter((_, i) => i !== index);
	}
  </script>

<div class="dropdown">
	<div class="dropdown-content">
	  <h2 style="text-align: center; margin-bottom: 20px;">Recommendations</h2>
	  {#each classSchedule as schedule, index}
		<div style="display: flex; align-items: center;">
		  <select class="class-select" bind:value={schedule.class}>
			<option value="">Select Class</option>
			{#each classNames as className}
			  <option value={className}>{className}</option>
			{/each}
		  </select>
		  <div style="display: flex; width: 100%;">
			<select class="time-select" bind:value={schedule.day}>
			  <option value="">Day of the Week</option>
			  <option value="Monday/Wednesday">Monday/Wednesday</option>
			  <option value="TuesdayThursday">TuesdayThursday</option>
			  <option value="Monday">Monday</option>
			  <option value="Tuesday">Tuesday</option>
			  <option value="Wednesday">Wednesday</option>
			  <option value="Thursday">Thursday</option>
			  <option value="Friday">Friday</option>
			  <option value="Saturday">Saturday</option>
			  <option value="Sunday">Sunday</option>
			</select>
			<select class="time-select" bind:value={schedule.start_time}>
			  <option value="">Start Time</option>
			  {#each times as time}
				<option value={time}>{time}</option>
			  {/each}
			</select>
			<select class="time-select" bind:value={schedule.end_time}>
			  <option value="">End Time</option>
			  {#each times as time}
				<option value={time}>{time}</option>
			  {/each}
			</select>
		  </div>
		  <button class="remove-btn" on:click={() => removeClass(index)}>Remove</button>
		</div>
	  {/each}
	</div>
	<div class="button-container">
	  <button class="add-btn" on:click={addClass}>Add Class</button>
	  <button on:click={() => console.log(classSchedule)}>Submit</button>
	</div>
  </div>
  
  <style>
	.dropdown {
	  position: fixed;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%, -50%);
	  background-color: #f9f9f9;
	  padding: 20px;
	  border-radius: 10px;
	  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	  width: 80%;
	  max-width: 600px;
	}
  
	.dropdown-content {
	  margin-bottom: 20px;
	}
  
	.class-select {
	  margin-bottom: 10px;
	  width: calc(100% - 20px);
	  padding: 10px;
	  border: 1px solid #ccc;
	  border-radius: 5px;
	  font-size: 16px;
	  box-sizing: border-box;
	}
  
	.time-select {
	  margin-bottom: 10px;
	  width: calc(33% - 10px);
	  padding: 10px;
	  border: 1px solid #ccc;
	  border-radius: 5px;
	  font-size: 16px;
	  box-sizing: border-box;
	}
  
	.remove-btn {
	  margin-top: 10px;
	  cursor: pointer;
	  color: #fff;
	  background-color: #e74c3c;
	  border: none;
	  border-radius: 5px;
	  padding: 10px 20px;
	  font-size: 16px;
	  transition: background-color 0.3s;
	}
  
	.remove-btn:hover {
	  background-color: #c0392b;
	}
  
	.button-container {
	  display: flex;
	  justify-content: space-between;
	}
  
	.add-btn {
	  cursor: pointer;
	  color: #fff;
	  background-color: #2ecc71;
	  border: none;
	  border-radius: 5px;
	  padding: 10px 20px;
	  font-size: 16px;
	  transition: background-color 0.3s;
	}
  
	.add-btn:hover {
	  background-color: #27ae60;
	}
  </style>