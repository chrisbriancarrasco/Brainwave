CREATE TABLE users (
        userid SERIAL, 
        email_address VARCHAR(256), 
        name VARCHAR(256), 
        firebase_uid varchar(256)
);


CREATE TABLE classes (
        class_id SERIAL, 
        class_name VARCHAR NOT NULL
);

CREATE TABLE user_classes (
        user_class_id SERIAL NOT NULL, 
        userid INTEGER NOT NULL,
        class_id INTEGER NOT NULL, 
        difficulty INTEGER, 
        grade_percentage INTEGER
);

CREATE TABLE user_schedule_entries (
        entry_id SERIAL,
        userid INTEGER NOT NULL,
        entry_type VARCHAR NOT NULL, 
        class_id INTEGER, 
        day_of_week INTEGER NOT NULL, 
        start_time TIME NOT NULL, 
        end_time TIME NOT NULL
);

CREATE TABLE contact (
    id SERIAL PRIMARY KEY,
    email_address VARCHAR(256) NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    submitted TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
