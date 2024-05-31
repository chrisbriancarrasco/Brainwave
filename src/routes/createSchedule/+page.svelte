<script>
    import { goto } from '$app/navigation';
    let data;
    let recommendedHours = [];
    let addType = "";
    let selectedDays = [];
    let availabilityDays = [];
    let availabilitySessions = [];
    let studyHours = 0;
    let meditationType = "";
    let meditationSessions = [];
    let classSchedule = [];
    let studySessions = [];
    let times = [
        "12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", "3:00 AM", "3:30 AM",
        "4:00 AM", "4:30 AM", "5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM",
        "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
        "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
        "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"
    ];

    let classNames = [
        "CPSC120", "CPSC121", "CPSC131", "CPSC223", "CPSC240", "CPSC253", "CPSC315",
        "CPSC323", "CPSC332", "CPSC335", "CPSC351", "CPSC362", "CPSC471", "CPSC481",
        "CPSC490", "CPSC491"
    ];

    const get_hours = async (classSchedule) => {
        const request = classSchedule.map(schedule => ({
            course_name: schedule.class,
            credits: schedule.credits,
            difficulty_level: schedule.difficulty,
            current_grade: schedule.grade,
            actual_study_hours: schedule.study_hours
        }));

        const res = await fetch('http://127.0.0.1:5000/recommended_study_hours', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'content-type': 'application/json'
            }
        });
        data = await res.json();
        return data.recommended_hours;
    };

    function addClass() {
        classSchedule = [...classSchedule, { class: "", start_time: "", end_time: "", day: "", credits: 1, difficulty: "", grade: "", study_hours: "" }];
    }

    function removeClass(index) {
        classSchedule = classSchedule.filter((_, i) => i !== index);
    }

    function addStudySession() {
        studySessions = [...studySessions, { course: "", start_time: "", end_time: "" }];
    }

    function removeStudySession(index) {
        studySessions = studySessions.filter((_, i) => i !== index);
    }

    function addAvailabilitySession() {
        availabilitySessions = [...availabilitySessions, { start_time: "", end_time: "" }];
    }

    function removeAvailabilitySession(index) {
        availabilitySessions = availabilitySessions.filter((_, i) => i !== index);
    }

    function addMeditationSession() {
        meditationSessions = [...meditationSessions, { type: "", start_time: "", end_time: "" }];
    }

    function removeMeditationSession(index) {
        meditationSessions = meditationSessions.filter((_, i) => i !== index);
    }
</script>

<div class="dropdown">
    <div class="dropdown-content">
        <h2 style="text-align: center; margin-bottom: 20px;">Create Schedule</h2>

        <!-- Days of the week checkboxes -->
        <div class="days-selection">
            <h3>Select Days of the Week:</h3>
            <div class="days-checkboxes">
                {#each ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as day}
                    <label>
                        <input type="checkbox" bind:group={selectedDays} value={day} /> {day}
                    </label>
                {/each}
            </div>
        </div>

        <!-- Dropdown to select add type -->
        <div class="add-type-selection">
            <h3>Select Type:</h3>
            <select bind:value={addType}>
                <option value="">Select Option</option>
                <option value="class">Add Class</option>
                <option value="study">Add Study Hours</option>
                <option value="availability">Add Availability</option>
                <option value="meditation">Add Meditation</option>
            </select>
        </div>

        <!-- Conditional rendering based on add type selection -->
        {#if addType === "class"}
            <div class="class-selection">
                {#each classSchedule as schedule, index}
                    <div style="display: flex; align-items: center; flex-wrap: wrap;">
                        <select class="class-select" bind:value={schedule.class}>
                            <option value="">Select Class</option>
                            {#each classNames as className}
                                <option value={className}>{className}</option>
                            {/each}
                        </select>
                        <select class="difficulty-select" bind:value={schedule.difficulty}>
                            <option value="">Select Difficulty</option>
                            {#each Array.from({ length: 10 }, (_, i) => i + 1) as diff}
                                <option value={diff}>{diff}</option>
                            {/each}
                        </select>
                        <input type="number" class="grade-input" bind:value={schedule.grade} placeholder="Enter Current Grade Percentage (e.g. 0-100)" min="0" max="100" />
                        <div style="display: flex; width: 100%;">
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
                <button class="add-btn" on:click={addClass}>Add Class</button>
            </div>
        {/if}

        {#if addType === "study"}
            <div class="study-hours-selection">
                <h3>Select Study Hours:</h3>
                {#each studySessions as session, index}
                    <div style="display: flex; align-items: center; flex-wrap: wrap;">
                        <select class="course-select" bind:value={session.course}>
                            <option value="">Select Course</option>
                            {#each classNames as className}
                                <option value={className}>{className}</option>
                            {/each}
                        </select>
                        <select class="time-select" bind:value={session.start_time}>
                            <option value="">Start Time</option>
                            {#each times as time}
                                <option value={time}>{time}</option>
                            {/each}
                        </select>
                        <select class="time-select" bind:value={session.end_time}>
                            <option value="">End Time</option>
                            {#each times as time}
                                <option value={time}>{time}</option>
                            {/each}
                        </select>
                        <button class="remove-btn" on:click={() => removeStudySession(index)}>Remove</button>
                    </div>
                {/each}
                <button class="add-btn" on:click={addStudySession}>Add Study Session</button>
            </div>
        {/if}

        {#if addType === "availability"}
            <div class="availability-selection">
                <h3>Select Availability Time:</h3>
                {#each availabilitySessions as session, index}
                    <div style="display: flex; align-items: center; flex-wrap: wrap;">
                        <select class="time-select" bind:value={session.start_time}>
                            <option value="">Start Time</option>
                            {#each times as time}
                                <option value={time}>{time}</option>
                            {/each}
                        </select>
                        <select class="time-select" bind:value={session.end_time}>
                            <option value="">End Time</option>
                            {#each times as time}
                                <option value={time}>{time}</option>
                            {/each}
                        </select>
                        <button class="remove-btn" on:click={() => removeAvailabilitySession(index)}>Remove</button>
                    </div>
                {/each}
                <button class="add-btn" on:click={addAvailabilitySession}>Add Availability Session</button>
            </div>
        {/if}

        {#if addType === "meditation"}
            <div class="meditation-selection">
                <h3>Select Meditation Type and Time:</h3>
                {#each meditationSessions as session, index}
                    <div style="display: flex; align-items: center; flex-wrap: wrap;">
                        <select class="meditation-type-select" bind:value={session.type}>
                            <option value="">Select Type</option>
                            <option value="guided">Guided Meditation</option>
                            <option value="unguided">Unguided Meditation</option>
                        </select>
                        <select class="time-select" bind:value={session.start_time}>
                            <option value="">Start Time</option>
                            {#each times as time}
                                <option value={time}>{time}</option>
                            {/each}
                        </select>
                        <select class="time-select" bind:value={session.end_time}>
                            <option value="">End Time</option>
                            {#each times as time}
                                <option value={time}>{time}</option>
                            {/each}
                        </select>
                        <button class="remove-btn" on:click={() => removeMeditationSession(index)}>Remove</button>
                    </div>
                {/each}
                <button class="add-btn" on:click={addMeditationSession}>Add Meditation Session</button>
            </div>
        {/if}
    </div>

    <div class="button-container">
        <button on:click={async () => {
            recommendedHours = await get_hours(classSchedule);
            console.log("Recommended hours:", recommendedHours);
        }}>Get Recommendations</button>
    </div>
</div>

<!-- New button to redirect to another page -->
<button class="redirect-btn" on:click={() => goto('/studyhours')}>Study Hours Page</button>

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

    .days-selection, .add-type-selection, .class-selection, .study-hours-selection, .availability-selection, .meditation-selection {
        margin-bottom: 20px;
    }

    .days-checkboxes {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .days-checkboxes label {
        width: 30%;
        margin-bottom: 10px;
    }

    .class-select, .difficulty-select, .grade-input, .study-hours-input, .meditation-selection select, .course-select, .meditation-type-select {
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

    .remove-btn, .add-btn {
        cursor: pointer;
        color: #fff;
        background-color: #e74c3c;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 16px;
        transition: background-color 0.3s;
    }

    .remove-btn:hover, .add-btn:hover {
        background-color: #c0392b;
    }

    .button-container {
        display: flex;
        justify-content: space-between;
    }

    .redirect-btn {
        position: fixed;
        top: 10px;
        right: 10px;
        cursor: pointer;
        color: #fff;
        background-color: #3498db;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 16px;
        transition: background-color 0.3s;
    }

    .redirect-btn:hover {
        background-color: #2980b9;
    }
</style>
