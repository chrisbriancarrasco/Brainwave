<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    export let data = {};
    export let form;
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

    $: {
        const query = new URLSearchParams($page.url.search);
        const type = query.get('addType');
        if (type) {
            addType = type;
        }
    }

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
        <h2 style="text-align: center; margin-bottom: 20px;">Add Your Personal Schedule Here</h2>
        {#if form?.message}
            <p>{form.message}</p>
        {/if}

        <!-- Conditional rendering based on add type selection -->
        {#if addType === "class"}
            <form method="POST" action="?/add_class">
                <div class="class-selection">
                    <div class="days-selection">
                        <h3>Select Days of the Week:</h3>
                        <div class="days-checkboxes">
                            {#each data.day_of_week as day, ix}
                                <label>
                                    <input type="checkbox" name={`day_${ix}`} value=1 /> {day}
                                </label>
                            {/each}
                        </div>
                    </div>
                    <h3>Select Class and Time:</h3>
                    <div style="display: flex; align-items: center; flex-wrap: wrap;">
                        <select class="course-select" name="selected_class_id">
                            <option value="">Select Course</option>
                            {#each data.classes as cl}
                                <option value={cl.class_id}>{cl.class_name}</option>
                            {/each}
                        </select>
                        <select class="difficulty-select" name="difficulty">
                            <option value="">Select Difficulty</option>
                            {#each Array.from({ length: 10 }, (_, i) => i + 1) as diff}
                                <option value={diff}>{diff}</option>
                            {/each}
                        </select>
                        <input type="number" class="grade-input" name="grade" placeholder="Enter Current Grade Percentage (e.g. 0-100)" min="0" max="100" />
                        <div style="display: flex; width: 100%;">
                            <select class="time-select" name="start_time">
                                <option value="">Start Time</option>
                                {#each data.times as time}
                                    <option value={time.minutes_since_midnight}>{time.as_string}</option>
                                {/each}
                            </select>
                            <select class="time-select" name="end_time">
                                <option value="">End Time</option>
                                {#each data.times as time}
                                    <option value={time.minutes_since_midnight}>{time.as_string}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                    <button class="add-btn" type="submit">Add Class</button>
                </div>
            </form>
        {/if}

        {#if addType === "study"}
            <form method="POST" action="?/add_study_hours">
                <div class="study-hours-selection">
                    <div class="days-selection">
                        <h3>Select Days of the Week:</h3>
                        <div class="days-checkboxes">
                            {#each data.day_of_week as day, ix}
                                <label>
                                    <input type="checkbox" name={`day_${ix}`} value=1 /> {day}
                                </label>
                            {/each}
                        </div>
                    </div>
                    <h3>Select Study Hours:</h3>
                    <div style="display: flex; align-items: center; flex-wrap: wrap;">
                        <select class="course-select" name="selected_class_id">
                            <option value="">Select Course</option>
                            {#each data.user_classes as cl}
                                <option value={cl.class_id}>{cl.class_name}</option>
                            {/each}
                        </select>
                        <select class="time-select" name="start_time">
                            <option value="">Start Time</option>
                            {#each data.times as time}
                                <option value={time.minutes_since_midnight}>{time.as_string}</option>
                            {/each}
                        </select>
                        <select class="time-select" name="end_time">
                            <option value="">End Time</option>
                            {#each data.times as time}
                                <option value={time.minutes_since_midnight}>{time.as_string}</option>
                            {/each}
                        </select>
                    </div>
                    <button class="add-btn" type="submit">Add Study Hours</button>
                </div>
            </form>
        {/if}

        {#if addType === "availability"}
            <form method="POST" action="?/add_availability">
                <div class="availability-selection">
                    <div class="days-selection">
                        <h3>Select Days of the Week:</h3>
                        <div class="days-checkboxes">
                            {#each data.day_of_week as day, ix}
                                <label>
                                    <input type="checkbox" name={`day_${ix}`} value=1 /> {day}
                                </label>
                            {/each}
                        </div>
                    </div>
                    <h3>Select Availability Time:</h3>
                    <div style="display: flex; align-items: center; flex-wrap: wrap;">
                        <select class="time-select" name="start_time">
                            <option value="">Start Time</option>
                            {#each data.times as time}
                                <option value={time.minutes_since_midnight}>{time.as_string}</option>
                            {/each}
                        </select>
                        <select class="time-select" name="end_time">
                            <option value="">End Time</option>
                            {#each data.times as time}
                                <option value={time.minutes_since_midnight}>{time.as_string}</option>
                            {/each}
                        </select>
                    </div>
                    <button class="add-btn" type="submit">Add Availability Session</button>
                </div>
            </form>
        {/if}

        {#if addType === "meditation"}
            <form method="POST" action="?/add_meditation">
                <div class="meditation-selection">
                    <div class="days-selection">
                        <h3>Select Days of the Week:</h3>
                        <div class="days-checkboxes">
                            {#each data.day_of_week as day, ix}
                                <label>
                                    <input type="checkbox" name={`day_${ix}`} value=1 /> {day}
                                </label>
                            {/each}
                        </div>
                    </div>
                    <h3>Select Meditation Time:</h3>
                    <div style="display: flex; align-items: center; flex-wrap: wrap;">
                        <select class="time-select" name="start_time">
                            <option value="">Start Time</option>
                            {#each data.times as time}
                                <option value={time.minutes_since_midnight}>{time.as_string}</option>
                            {/each}
                        </select>
                        <select class="time-select" name="end_time">
                            <option value="">End Time</option>
                            {#each data.times as time}
                                <option value={time.minutes_since_midnight}>{time.as_string}</option>
                            {/each}
                        </select>
                    </div>
                    <button class="add-btn" type="submit">Add Meditation Session</button>
                </div>
            </form>
        {/if}
    </div>

    <div class="button-container">
        <button on:click={async () => {
            recommendedHours = await get_hours(classSchedule);
            console.log("Recommended hours:", recommendedHours);
        }}>Get Recommendations</button>
    </div>
</div>

<!-- Button to redirect to the study hours page -->
<button class="redirect-btn" on:click={() => goto('/studyhours')}>Study Hours Page</button>

<!-- New button to go back to the main page -->
<button class="mainpage-btn" on:click={() => goto('/mainpage')}>Main Page</button>

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

    .days-selection, .class-selection, .study-hours-selection, .availability-selection, .meditation-selection {
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

    .redirect-btn, .mainpage-btn {
        position: fixed;
        top: 10px;
        cursor: pointer;
        color: #fff;
        background-color: #3498db;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 16px;
        transition: background-color 0.3s;
    }

    .redirect-btn {
        right: 10px;
    }

    .mainpage-btn {
        left: 10px;
    }

    .redirect-btn:hover, .mainpage-btn:hover {
        background-color: #2980b9;
    }
</style>
