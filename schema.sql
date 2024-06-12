CREATE TABLE users (
        user_id SERIAL, 
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
        user_id INTEGER NOT NULL,
        class_id INTEGER NOT NULL, 
        difficulty INTEGER, 
        grade_percentage INTEGER
);

CREATE TABLE user_schedule_entries (
        entry_id SERIAL,
        user_id INTEGER NOT NULL,
        entry_type VARCHAR NOT NULL, 
        class_id INTEGER, 
        day_of_week INTEGER NOT NULL, 
        start_time TIME NOT NULL, 
        end_time TIME NOT NULL
);