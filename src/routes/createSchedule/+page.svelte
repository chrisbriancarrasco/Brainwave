<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    export let data = {};
    export let form;
    let addType = "";

    $: {
        const query = new URLSearchParams($page.url.search);
        const type = query.get('addType');
        if (type) {
            addType = type;
        }
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
                <input type=hidden name=userid value={data.userid} />
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
                <input type=hidden name=userid value={data.userid} />
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
                <input type=hidden name=userid value={data.userid} />
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
                <input type=hidden name=userid value={data.userid} />
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
</div>

<!-- New button to go back to the main page -->
<button class="mainpage-btn" on:click={() => goto('/mainpage')}>Main Page</button>

<style>
    .dropdown {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #f9f9f9;
        padding: 20px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        overflow-y: auto;
    }

    .dropdown-content {
        margin: 0 auto;
        max-width: 800px; /* Adjust max-width as necessary */
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

    .difficulty-select, .grade-input, .meditation-selection select, .course-select {
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

    .add-btn {
        cursor: pointer;
        color: #fff;
        background-color: #e74c3c;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 16px;
        transition: background-color 0.3s;
    }

    .add-btn:hover {
        background-color: #c0392b;
    }

    .mainpage-btn {
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

    .mainpage-btn {
        left: 10px;
    }

    .mainpage-btn:hover {
        background-color: #2980b9;
    }
</style>

