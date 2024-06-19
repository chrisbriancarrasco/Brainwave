import sql from '$lib/server/database';
import { PUBLIC_APISERVER } from '$env/static/public';

export async function load({ parent }) {
    const data = await parent();

    if ( !data.grant_access ) {
        return data;
    }

    const classes = await sql`
    SELECT
        class_id,
        class_name
    FROM
        classes
    ORDER BY
        class_name`;

    return {
        classes: classes, 
    };
}    

export const actions = {
	submitHours: async ({cookies, request}) => {
        const data = await request.formData();
        const body =  {
            course_name: data.get("selected_class"),
            difficulty_level: data.get('difficulty'),
            current_grade: data.get('grade'),
            actual_study_hours: data.get("study_hours")
        };

        await fetch(`${PUBLIC_APISERVER}/add_course_data`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            }
        });

        return {message:"Study Hours Submitted"};
	},
};
