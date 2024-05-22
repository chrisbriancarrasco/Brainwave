<script>
	let data;
	const get_hours = async (classSchedule) => {
		const request = classSchedule.map(schedule => ({
			course_ID: schedule.class,
			credits: schedule.credits,
			difficulty_level: schedule.difficulty,
			current_grade: schedule.grade,
			actual_study_hours: schedule.study_hours
		}));
		
		const res = await fetch('http://127.0.0.1:5000/recommended_study_hours', {
			method: 'POST',
			body: JSON.stringify(request[0]),  // Assuming you handle one request at a time
			headers: {
				'content-type': 'application/json'
			}
		});
		data = await res.json();
		return data.recommended_hours;
	};

	let classSchedule = [];
	let times = [
		"7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
		"11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
		"3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
		"7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM"
	];

	let classNames = [
		"CPSC 120", "CPSC 121", "CPSC 131", "CPSC 223", "CPSC 240", "CPSC 253", "CPSC 315",
		"CPSC 323", "CPSC 332", "CPSC 335", "CPSC 351", "CPSC 362", "CPSC 471", "CPSC 481",
		"CPSC 490", "CPSC 491"
	];

	function addClass() {
		classSchedule = [...classSchedule, { class: "", start_time: "", end_time: "", day: "", credits: 1, difficulty: 1, grade: "", study_hours: "" }];
	}

	function removeClass(index) {
		classSchedule = classSchedule.filter((_, i) => i !== index);
	}
</script>

<div class="dropdown">
	<div class="dropdown-content">
		<h2 style="text-align: center; margin-bottom: 20px;">Create Schedule</h2>
		{#each classSchedule as schedule, index}
			<div style="display: flex; align-items: center; flex-wrap: wrap;">
				<select class="class-select" bind:value={schedule.class}>
					<option value="">Select Class</option>
					{#each classNames as className}
						<option value={className}>{className}</option>
					{/each}
				</select>
				<select class="credits-select" bind:value={schedule.credits}>
					<option value="">Select Credits</option>
					{#each Array.from({length: 3}, (_, i) => i + 1) as credit}
						<option value={credit}>{credit}</option>
					{/each}
				</select>
				<select class="difficulty-select" bind:value={schedule.difficulty}>
					<option value="">Select Difficulty</option>
					{#each Array.from({length: 10}, (_, i) => i + 1) as diff}
						<option value={diff}>{diff}</option>
					{/each}
				</select>
				<input type="number" class="grade-input" bind:value={schedule.grade} placeholder="Current Grade" min="0" max="100" />
				<input type="number" class="study-hours-input" bind:value={schedule.study_hours} placeholder="Actual Study Hours" min="0" />
				<div style="display: flex; width: 100%;">
					<select class="time-select" bind:value={schedule.day}>
						<option value="">Day of the Week</option>
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
		<button on:click={async () => {
			const recommendedHours = await get_hours(classSchedule);
			console.log("Recommended hours:", recommendedHours);
		}}>Submit</button>
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
		overflow-y: auto;
		max-height: 80vh;
	}

	.dropdown-content {
		margin-bottom: 20px;
	}

	.class-select, .credits-select, .difficulty-select, .grade-input, .study-hours-input {
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
