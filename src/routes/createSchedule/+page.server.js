import sql from '$lib/server/database';

export async function load({ parent }) {
    const data = await parent();

    if ( !data.grant_access ) {
        return data;
    }

    const userid = data.userid;
    const classes = await sql`
    SELECT
        class_id,
        class_name
    FROM
        classes
    ORDER BY
        class_name`;

    const user_classes = await sql`
    SELECT
        uc.class_id,
        cl.class_name
    FROM
        user_classes AS uc,
        classes AS cl
    WHERE
        userid = ${userid} AND 
        uc.class_id = cl.class_id 
    ORDER BY
        class_name`;

    let times = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const ampm = hour < 12 ? 'AM' : 'PM';
            const adjustedHour = hour % 12 || 12; 
            const formattedTime = `${adjustedHour}:${minute === 0 ? '00' : minute} ${ampm}`;
            times.push({minutes_since_midnight: hour * 60 + minute, as_string: formattedTime});
        }
    }
    return {
        classes: classes,
        times: times,
        day_of_week: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], 

        user_classes: user_classes,
    };
}

export const actions = {
	add_availability: async ({cookies, request}) => {
        const data = await request.formData();
        const start_time = parseInt(data.get('start_time'));
        const end_time = parseInt(data.get('end_time'));
        const selected_days = [];
        for (let day = 0; day < 7; day++){
            const day_is_selected = parseInt(data.get(`day_${day}`));
            if (day_is_selected) {
                selected_days.push(day);
            }
        }
        if (selected_days.length == 0) {
            return {message:"Please select at least one day."};
        }
        if (end_time <= start_time ) {
            return {message:"Not Appropriate Hours"};
        }
        const userid = parseInt(data.get('userid'));

        for (const day_of_week of selected_days){
            const start_time_as_string = `${Math.floor(start_time / 60)}:${start_time % 60}`;
            const end_time_as_string = `${Math.floor(end_time / 60)}:${end_time % 60}`;
            await sql`
                INSERT INTO
                    user_schedule_entries
                    (userid, entry_type, day_of_week, start_time, end_time)
                VALUES
                    (${userid}, 'availability', ${day_of_week}, ${start_time_as_string}, ${end_time_as_string})`;
        }
        return {message:"Availability Added"};
	},

    add_meditation: async ({cookies, request}) => {
        const data = await request.formData();
        const start_time = parseInt(data.get('start_time'));
        const end_time = parseInt(data.get('end_time'));
        const selected_days = [];
        for (let day = 0; day < 7; day++){
            const day_is_selected = parseInt(data.get(`day_${day}`));
            if (day_is_selected) {
                selected_days.push(day);
            }
        }
        if (selected_days.length == 0) {
            return {message:"Please select at least one day."};
        }
        if (end_time <= start_time ) {
            return {message:"Not Appropriate Hours"};
        }
        const userid = parseInt(data.get('userid'));
        for (const day_of_week of selected_days){
            const start_time_as_string = `${Math.floor(start_time / 60)}:${start_time % 60}`;
            const end_time_as_string = `${Math.floor(end_time / 60)}:${end_time % 60}`;
            await sql`
                INSERT INTO
                    user_schedule_entries
                    (userid, entry_type, day_of_week, start_time, end_time)
                VALUES
                    (${userid}, 'meditation', ${day_of_week}, ${start_time_as_string}, ${end_time_as_string})`;
        }
        return {message:"Meditation Session Added"};
    },

    add_class: async ({cookies, request}) => {
        const data = await request.formData();
        const selected_class_id = parseInt(data.get('selected_class_id'));
        
        const difficulty = parseInt(data.get('difficulty'));
        
        const grade = parseInt(data.get('grade'));
        
        const start_time = parseInt(data.get('start_time'));
        const end_time = parseInt(data.get('end_time'));
        const selected_days = [];
        for (let day = 0; day < 7; day++){
            const day_is_selected = parseInt(data.get(`day_${day}`));
            if (day_is_selected) {
                selected_days.push(day);
            }
        }
        if (selected_days.length == 0) {
            return {message:"Please select at least one day."};
        }
        if (end_time <= start_time ) {
            return {message:"Not Appropriate Hours"};
        }
        if (selected_class_id === NaN) {
            return {message:"Please select a course."}
        }
        const userid = parseInt(data.get('userid'));

        await sql`
            INSERT INTO
                user_classes
                (userid, class_id, difficulty, grade_percentage)
            VALUES
                (${userid}, ${selected_class_id}, ${difficulty}, ${grade})`;

        for (const day_of_week of selected_days){
            const start_time_as_string = `${Math.floor(start_time / 60)}:${start_time % 60}`;
            const end_time_as_string = `${Math.floor(end_time / 60)}:${end_time % 60}`;
            await sql`
                INSERT INTO
                    user_schedule_entries
                    (userid, entry_type, day_of_week, start_time, end_time, class_id)
                VALUES
                    (${userid}, 'class', ${day_of_week}, ${start_time_as_string}, ${end_time_as_string}, ${selected_class_id})`;
        }
        return {message:"Class Added"};
    },

    add_study_hours: async ({cookies, request}) => {
        const data = await request.formData();
        const selected_class_id = parseInt(data.get('selected_class_id'));
        const start_time = parseInt(data.get('start_time'));
        const end_time = parseInt(data.get('end_time'));
        const selected_days = [];
        for (let day = 0; day < 7; day++){
            const day_is_selected = parseInt(data.get(`day_${day}`));
            if (day_is_selected) {
                selected_days.push(day);
            }
        }
        if (selected_days.length == 0) {
            return {message:"Please select at least one day."};
        }
        if (end_time <= start_time ) {
            return {message:"Not Appropriate Hours"};
        }
        if (selected_class_id === NaN) {
            return {message:"Please select a course."}
        }
        const userid = parseInt(data.get('userid'));
        
        for (const day_of_week of selected_days){
            const start_time_as_string = `${Math.floor(start_time / 60)}:${start_time % 60}`;
            const end_time_as_string = `${Math.floor(end_time / 60)}:${end_time % 60}`;
            await sql`
                INSERT INTO
                    user_schedule_entries
                    (userid, entry_type, class_id, day_of_week, start_time, end_time)
                VALUES
                    (${userid}, 'study', ${selected_class_id}, ${day_of_week}, ${start_time_as_string}, ${end_time_as_string})`;
        }
        return {message:"Study Hours Added"};
	}
};
