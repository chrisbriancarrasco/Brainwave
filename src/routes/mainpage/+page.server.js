import sql from '$lib/server/database';
import { title } from 'process';

export async function load() {
    const user_id = 1;
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
        user_id = ${user_id}`;

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
    const courses = [{course_name: "CPSC 121", difficulty_level: 8}]

    return { events: events, legend: legend, courses: courses};
}
