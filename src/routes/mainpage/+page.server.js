import sql from '$lib/server/database';
import { PUBLIC_APISERVER } from '$env/static/public';

export async function load({ parent }) {
    const data = await parent();

    if ( !data.grant_access ) {
        return data;
    }

    console.log(JSON.stringify(data));
    const userid = data.userid;
    const events = await sql`
    SELECT
        entry_id AS id,
        start_time,
        end_time,
        entry_type,
        class_id,
        day_of_week
    FROM
        user_schedule_entries
    WHERE
        userid = ${userid}`;

    const classes = await sql`
    SELECT
        class_id,
        class_name
    FROM
        classes
    ORDER BY
        class_name`;

    

    const classes_by_id = {};
    classes.map( (a_class) => {classes_by_id[a_class.class_id] = a_class.class_name});

    const todays_date = new Date();
    const sunday_of_this_week = todays_date.getDate() - todays_date.getDay();
    const legend = [{type: "Availability", color: "#888"},
                    {type: "Meditation", color: "#6a0dad"},
                    {type: "Class", color: "#ff5733"},
                    {type: "Study", color: "#a05555"},
    ];

    for (const event of events){
        const event_date = sunday_of_this_week + event.day_of_week;

        event.start = new Date(todays_date.setDate(event_date));
        event.start.setDate(event_date);
        const [h1, m1, s1] = event.start_time.split(":");
        event.start.setHours(h1, m1, s1);

        event.end = new Date(todays_date.setDate(event_date));
        event.end.setDate(event_date);
        const [h2, m2, s2] = event.end_time.split(":");
        event.end.setHours(h2, m2, s2);


        if (event.entry_type == 'availability'){
            event.backgroundColor = "#888";
            
        } else if (event.entry_type == 'meditation') {
            event.backgroundColor = "#6a0dad"; 

        } else if (event.entry_type == 'class') {
            event.title = classes_by_id[event.class_id];
            event.backgroundColor = "#ff5733"; 

        } else if (event.entry_type == 'study') {
            event.title = "Study" + ' ' + classes_by_id[event.class_id];
            event.backgroundColor = "#a05555"; 
        }
    }

    // console.log({events}); 

    const user_courses = await sql`
    SELECT
        uc.difficulty AS difficulty_level,
        cl.class_name AS course_name
    FROM
        user_classes AS uc,
        classes AS cl
    WHERE
        userid = ${userid} AND 
        uc.class_id = cl.class_id`;

    return { events: events, legend: legend, courses: user_courses};
}

export const actions = {
	get_recommendations: async ({cookies, request}) => {
        const data = await request.formData();
        const userid = parseInt(data.get('userid'));
        try {
            const user_courses = await sql`
                SELECT
                    uc.difficulty AS difficulty_level,
                    cl.class_name AS course_name,
                    sum(end_time - start_time) AS actual_study_hours
                FROM
                    user_classes AS uc,
                    classes AS cl 
                FULL OUTER JOIN user_schedule_entries AS se
                    ON se.userid = uc.userid AND se.class_id = uc.class_id 
                WHERE
                    uc.userid = ${userid} AND 
                    sc.entry_type = 'study' AND 
                    uc.class_id = cl.class_id 
                GROUP BY
                    uc.difficulty, cl.class_name`;
            const response = await fetch(`${PUBLIC_APISERVER}/recommended_study_hours`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user_courses),
            });
            
            const result = await response.json();
            if (!response.ok) {
                throw new Error(`Error: ${result.error}`);
            }
    
            recommendations = result.recommended_hours;
    
        //   getModal().open();
        } catch (error) {
            console.error("Failed to fetch recommendations:", error);
            recommendations = `Failed to fetch recommendations: ${error.message}`;
        //   getModal().open();
        }
    }
};
