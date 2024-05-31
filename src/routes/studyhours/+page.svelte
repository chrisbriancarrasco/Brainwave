<script>
	let studyHours = [ //inserting into database
		{ day: 'Monday', slots: [] },
		{ day: 'Tuesday', slots: [] },
		{ day: 'Wednesday', slots: [] },
		{ day: 'Thursday', slots: [] },
		{ day: 'Friday', slots: [] },
		{ day: 'Saturday', slots: [] },
		{ day: 'Sunday', slots: [] }
	];

	function addHours(dayIndex) {
		studyHours[dayIndex].slots = [...studyHours[dayIndex].slots, { start: '', end: '' }];
	}

	function removeHours(dayIndex, slotIndex) {
		studyHours[dayIndex].slots = studyHours[dayIndex].slots.filter((_, i) => i !== slotIndex);
	}

	function generateTimes() {
		const times = [];
		for (let h = 0; h < 24; h++) {
			const hour = h % 12 === 0 ? 12 : h % 12;
			const ampm = h < 12 ? 'AM' : 'PM';
			times.push(`${hour}:00 ${ampm}`, `${hour}:30 ${ampm}`);
		}
		return times;
	}

	const timeOptions = generateTimes();
</script>

<div class="container">
	<h2 class="page_title">Manage Study Hours</h2>
	<div class="study-hours">
		{#each studyHours as day, dayIndex}
			<div class="day-schedule">
				<div class="day-info">
					<h3>{day.day}</h3>
					{#each day.slots as slot, slotIndex}
						<div class="time-slot">
							<select bind:value={slot.start}>
								<option value="">None</option>
								{#each timeOptions as time}
									<option value={time}>{time}</option>
								{/each}
							</select>
							<select bind:value={slot.end}>
								<option value="">None</option>
								{#each timeOptions as time}
									<option value={time}>{time}</option>
								{/each}
							</select>
							<button class="remove-slot-btn" on:click={() => removeHours(dayIndex, slotIndex)}>Remove</button>
						</div>
					{/each}
				</div>
				<div class="buttons">
					<button class="add-slot-btn" on:click={() => addHours(dayIndex)}>Add Study Hours</button>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.page_title {
		text-align: center;
		margin-bottom: 20px;
	}

	.container {
		padding: 20px;
		max-width: 1000px;
		margin: 0 auto;
	}

	.study-hours {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.day-schedule {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	.day-info {
		flex: 1;
	}

	.time-slot {
		display: flex;
		gap: 10px;
		margin-bottom: 10px;
	}

	.buttons {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.add-slot-btn, .remove-slot-btn {
		cursor: pointer;
		color: #fff;
		background-color: #3498db;
		border: none;
		border-radius: 5px;
		padding: 5px 10px;
		font-size: 14px;
		transition: background-color 0.3s;
	}

	.add-slot-btn:hover, .remove-slot-btn:hover {
		background-color: #2980b9;
	}
</style>
