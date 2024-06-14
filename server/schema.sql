CREATE TYPE known_course_type AS ENUM ('course', 'practice-test');

CREATE TYPE known_course_category AS ENUM ('Design', 'Development', 'Marketing', 'IT and Software', 'Personal Development', 'Business', 'Photography', 'Music');

CREATE TYPE time_available_per_week AS ENUM ('0-2 hours', '2-4 hours', '5+ hours', 'indecisive');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    password_hash VARCHAR NOT NULL,
    receive_insider_emails BOOLEAN NOT NULL
);

CREATE TABLE coursedrafts (
    id SERIAL PRIMARY KEY,
    creator_email VARCHAR(255) NOT NULL,
    course_type known_course_type NOT NULL,
    course_title VARCHAR(60) NOT NULL,
    course_category known_course_category NOT NULL,
    creator_time_available_per_week time_available_per_week NOT NULL,
    is_public BOOLEAN NOT NULL DEFAULT FALSE,
    is_submission_process_completed BOOLEAN NOT NULL DEFAULT FALSE,
    language VARCHAR(60) NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE curriculums (
    id SERIAL PRIMARY KEY,
    course_draft_id INTEGER REFERENCES coursedrafts(id) ON DELETE CASCADE
);

CREATE TABLE curriculum_sections (
    id SERIAL PRIMARY KEY,
    curriculum_id INTEGER REFERENCES curriculums(id) ON DELETE CASCADE,
    title VARCHAR(160) NOT NULL,
    learning_objective VARCHAR(160) NOT NULL,
    order_index INTEGER NOT NULL
);

CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    curriculum_section_id INTEGER REFERENCES curriculum_sections(id) ON DELETE CASCADE,
    name VARCHAR(60) NOT NULL,
    order_index INTEGER NOT NULL,
    description VARCHAR(2000) NOT NULL,
    video_url TEXT NOT NULL,
    video_length_seconds INTEGER NOT NULL
);

CREATE TABLE course_ratings (
    id SERIAL PRIMARY KEY,
    course_draft_id INTEGER REFERENCES coursedrafts(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL
);

CREATE TABLE course_enrollments (
    id SERIAL PRIMARY KEY,
    course_draft_id INTEGER REFERENCES coursedrafts(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    enrollment_date TIMESTAMP NOT NULL
);


CREATE TABLE learning_objectives (
    id SERIAL PRIMARY KEY,
    course_draft_id INTEGER REFERENCES coursedrafts(id) ON DELETE CASCADE,
    learning_objective TEXT NOT NULL,
    order_index INTEGER NOT NULL
);

CREATE TABLE prerequisites (
    id SERIAL PRIMARY KEY,
    course_draft_id INTEGER REFERENCES coursedrafts(id) ON DELETE CASCADE,
    prerequisite TEXT NOT NULL,
    order_index INTEGER NOT NULL
);

CREATE TABLE intended_learners (
    id SERIAL PRIMARY KEY,
    course_draft_id INTEGER REFERENCES coursedrafts(id) ON DELETE CASCADE,
    intended_learner TEXT NOT NULL,
    order_index INTEGER NOT NULL
);

CREATE TABLE course_contents (
    id SERIAL PRIMARY KEY,
    course_draft_id INTEGER REFERENCES coursedrafts(id) ON DELETE CASCADE,
    learning_objectives INTEGER REFERENCES learning_objectives(id) ON DELETE CASCADE,
    prerequisites INTEGER REFERENCES prerequisites(id) ON DELETE CASCADE,
    intended_learners INTEGER REFERENCES intended_learners(id) ON DELETE CASCADE,
    curriculum INTEGER REFERENCES curriculums(id) ON DELETE CASCADE,
    video_content_length_seconds INTEGER NOT NULL
);
