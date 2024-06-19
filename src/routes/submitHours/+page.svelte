<script>
        export let data = {};
</script>

<main>
<form method="POST" action="?/submitHours">
        <h3>Select Class and Time:</h3>
        <div style="display: flex; align-items: center; flex-wrap: wrap;">
            <select class="course-select" name="selected_class">
                <option value="">Select Course</option>
                {#each data.classes as cl}
                    <option value={cl.class_name}>{cl.class_name}</option>
                {/each}
            </select>
            <select class="difficulty-select" name="difficulty">
                <option value="">Select Difficulty</option>
                {#each Array.from({ length: 10 }, (_, i) => i + 1) as diff}
                    <option value={diff}>{diff}</option>
                {/each}
            </select>
            <input type="number" class="grade-input" name="grade" placeholder="Enter Current Grade Percentage (e.g. 0-100)" min="0" max="100" />
            <input type="number" class="grade-input" name="study_hours" placeholder="Enter Study Hours per Week" min="0" max="100" />
        </div>
        <button class="add-btn" type="submit">Submit Study Hours</button>
</form>
</main>
