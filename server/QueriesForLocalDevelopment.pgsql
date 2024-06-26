--- This query returns course drafts for a given user id ---
--- Note that you can also run parts of the query by selecting only a portion of it ---
--- This query is in use on the server ---
--- Note that the separators for the array items are different on the function in use and need to be updated ---

SELECT 
  CD.id as course_draft_id,
  COALESCE(LO.learning_objectives, '{}') AS learning_objectives,
  COALESCE(IL.intended_learners, '{}') AS intended_learners,
  COALESCE(PR.prerequisites, '{}') AS prerequisites,
  COALESCE(sections, '{}') AS curriculum_sections,
  CD.creator_id, 
  CD.creator_email, 
  CD.course_type,
  CD.course_title, 
  CD.course_category, 
  CD.creator_time_available_per_week, 
  CD.is_public, 
  CD.is_submission_process_completed, 
  CD.language,
  CD.created_at
FROM coursedrafts CD
LEFT JOIN (
  SELECT course_draft_id, 
    array_agg(DISTINCT id || ' ' || learning_objective || ' ' || order_index) AS learning_objectives
  FROM learning_objectives
  GROUP BY course_draft_id
) LO ON CD.id = LO.course_draft_id
LEFT JOIN (
  SELECT 
    course_draft_id, 
    array_agg(DISTINCT id || ' ' || intended_learner || ' ' || order_index) AS intended_learners
  FROM intended_learners
  GROUP BY course_draft_id
) IL ON CD.id = IL.course_draft_id
LEFT JOIN (
  SELECT 
    course_draft_id, 
    array_agg(DISTINCT id || ' ' || prerequisite || ' ' || order_index) AS prerequisites
  FROM prerequisites
  GROUP BY course_draft_id
) PR ON CD.id = PR.course_draft_id
LEFT JOIN (
  SELECT
    course_draft_id,
    array_agg(
      json_build_object(
        'section_id', section_id,
        'title', title,
        'learning_objective', learning_objective,
        'order_index', order_index,
        'lessons', lessons
      )
    ) AS sections
  FROM
    (SELECT 
      curriculum_sections.id as section_id,
      curriculum_sections.course_draft_id,
      curriculum_sections.title,
      curriculum_sections.learning_objective,
      curriculum_sections.order_index,
      array_agg(lessons.id || ' ' || lessons.curriculum_section_id || ' ' || lessons.name || ' ' || lessons.description) AS lessons
    FROM curriculum_sections
    LEFT JOIN lessons ON curriculum_sections.id = lessons.curriculum_section_id
    GROUP BY curriculum_sections.id
    ORDER BY curriculum_sections.id) AS section_details
  GROUP BY course_draft_id
) SEC ON CD.id = SEC.course_draft_id
WHERE CD.creator_id = 1;

--- The rest of the file are inserts which can be used to initialize the database with some users, coursedrafts, curriculum_sections and lessons. All of the inserts are meant to be executed in one go. ---

INSERT INTO users (email, full_name, password_hash, receive_insider_emails)
VALUES ('elias.testi@gmail.com', 'Elias Testington', '$2b$10$L/z4TTiOcr0nzaWT5TuYb.tb4CwVmMLteMdiNLB.pThjW35uLrp6S', true);

INSERT INTO coursedrafts (
  creator_id,
  creator_email,
  course_type,
  course_title,
  course_category,
  creator_time_available_per_week,
  is_public,
  is_submission_process_completed,
  language,
  created_at
) VALUES (
  1,
  'elias.testi@gmail.com',
  'course',
  'Introduction to Programming',
  'Development',
  '5+ hours',
  false,
  false,
  'english',
  current_timestamp  
);

INSERT INTO curriculum_sections (
  course_draft_id,
  title,
  learning_objective,
  order_index
) VALUES (
  1,
  'Introduction',
  'Understand the basics of programming',
  0
);

INSERT INTO lessons (
  curriculum_section_id,
  name,
  description,
  order_index,
  video_url,
  video_length_seconds
) VALUES (
  1,
  'What is programming?',
  '[{"type": "paragraph", "children": [{"text": "Hello World!"}]}]',
  0,
  ' ',
  0
);

INSERT INTO lessons (
  curriculum_section_id,
  name,
  description,
  order_index,
  video_url,
  video_length_seconds
) VALUES (
  1,
  'Why programming?',
  '[{"type": "paragraph", "children": [{"text": "Hello World!"}]}]',
  1,
  ' ',
  0
);

INSERT INTO lessons (
  curriculum_section_id,
  name,
  description,
  order_index,
  video_url,
  video_length_seconds
) VALUES (
  1,
  'How to get started?',
  '[{"type": "paragraph", "children": [{"text": "Hello World!"}]}]',
  2,
  ' ',
  0
);

INSERT INTO curriculum_sections (
  course_draft_id,
  title,
  learning_objective,
  order_index
) VALUES (
  1,
  'Variables',
  'Understand the concept of variables',
  1
);

INSERT INTO lessons (
  curriculum_section_id,
  name,
  description,
  order_index,
  video_url,
  video_length_seconds
) VALUES (
  2,
  'What are variables?',
  '[{"type": "paragraph", "children": [{"text": "Hello World!"}]}]',
  0,
  ' ',
  0
);

INSERT INTO lessons (
  curriculum_section_id,
  name,
  description,
  order_index,
  video_url,
  video_length_seconds
) VALUES (
  2,
  'How to use variables?',
  '[{"type": "paragraph", "children": [{"text": "Hello World!"}]}]',
  1,
  ' ',
  0
);

INSERT INTO curriculum_sections (
  course_draft_id,
  title,
  learning_objective,
  order_index
) VALUES (
  1,
  'Loops',
  'Understand the concept of loops',
  2
);

INSERT INTO lessons (
  curriculum_section_id,
  name,
  description,
  order_index,
  video_url,
  video_length_seconds
) VALUES (
  3,
  'What are loops?',
  '[{"type": "paragraph", "children": [{"text": "Hello World!"}]}]',
  0,
  ' ',
  0
);

INSERT INTO lessons (
  curriculum_section_id,
  name,
  description,
  order_index,
  video_url,
  video_length_seconds
) VALUES (
  3,
  'How to use loops?',
  '[{"type": "paragraph", "children": [{"text": "Hello World!"}]}]',
  1,
  ' ',
  0
);

INSERT INTO curriculum_sections (
  course_draft_id,
  title,
  learning_objective,
  order_index
) VALUES (
  1,
  'Functions',
  'Understand the concept of functions',
  3
);

INSERT INTO lessons (
  curriculum_section_id,
  name,
  description,
  order_index,
  video_url,
  video_length_seconds
) VALUES (
  4,
  'What are functions?',
  '[{"type": "paragraph", "children": [{"text": "Hello World!"}]}]',
  0,
  ' ',
  0
);


INSERT INTO coursedrafts (
  creator_id,
  creator_email,
  course_type,
  course_title,
  course_category,
  creator_time_available_per_week,
  is_public,
  is_submission_process_completed,
  language,
  created_at
) VALUES (
  1,
  'elias.testi@gmail.com',
  'course',
  'Introduction to Machine Learning',
  'Development',
  '5+ hours',
  false,
  false,
  'english',
  current_timestamp
);

INSERT INTO curriculum_sections (
  course_draft_id,
  title,
  learning_objective,
  order_index
) VALUES (
  2,
  'Introduction',
  'Understand the basics of machine learning',
  0
);

INSERT INTO lessons (
  curriculum_section_id,
  name,
  description,
  order_index,
  video_url,
  video_length_seconds
) VALUES (
  5,
  'What is machine learning?',
  '[{"type": "paragraph", "children": [{"text": "Hello World!"}]}]',
  0,
  ' ',
  0
);

INSERT INTO lessons (
  curriculum_section_id,
  name,
  description,
  order_index,
  video_url,
  video_length_seconds
) VALUES (
  5,
  'Why machine learning?',
  '[{"type": "paragraph", "children": [{"text": "Hello World!"}]}]',
  1,
  ' ',
  0
);

INSERT INTO lessons (
  curriculum_section_id,
  name,
  description,
  order_index,
  video_url,
  video_length_seconds
) VALUES (
  5,
  'How to get started?',
  '[{"type": "paragraph", "children": [{"text": "Hello World!"}]}]',
  2,
  ' ',
  0
);

INSERT INTO curriculum_sections (
  course_draft_id,
  title,
  learning_objective,
  order_index
) VALUES (
  2,
  'Data',
  'Understand the concept of data',
  1
);

INSERT INTO lessons (
  curriculum_section_id,
  name,
  description,
  order_index,
  video_url,
  video_length_seconds
) VALUES (
  6,
  'What is data?',
  '[{"type": "paragraph", "children": [{"text": "Hello World!"}]}]',
  0,
  ' ',
  0
);

INSERT INTO lessons (
  curriculum_section_id,
  name,
  description,
  order_index,
  video_url,
  video_length_seconds
) VALUES (
  6,
  'How to use data?',
  '[{"type": "paragraph", "children": [{"text": "Hello World!"}]}]',
  1,
  ' ',
  0
);

INSERT INTO curriculum_sections (
  course_draft_id,
  title,
  learning_objective,
  order_index
) VALUES (
  2,
  'Algorithms',
  'Understand the concept of algorithms',
  2
);

INSERT INTO lessons (
  curriculum_section_id,
  name,
  description,
  order_index,
  video_url,
  video_length_seconds
) VALUES (
  7,
  'What are algorithms?',
  '[{"type": "paragraph", "children": [{"text": "Hello World!"}]}]',
  0,
  ' ',
  0
);

INSERT INTO lessons (
  curriculum_section_id,
  name,
  description,
  order_index,
  video_url,
  video_length_seconds
) VALUES (
  7,
  'How to use algorithms?',
  '[{"type": "paragraph", "children": [{"text": "Hello World!"}]}]',
  1,
  ' ',
  0
);

INSERT INTO curriculum_sections (
  course_draft_id,
  title,
  learning_objective,
  order_index
) VALUES (
  2,
  'Models',
  'Understand the concept of models',
  3
);

INSERT INTO users (email, full_name, password_hash, receive_insider_emails)
VALUES ('anna.testi@gmail.com', 'Anna Koivunen', '$2b$10$L/z4TTiOcr0nzaWT5TuYb.tb4CwVmMLteMdiNLB.pThjW35uLrp6S', false);

INSERT INTO coursedrafts (
  creator_id,
  creator_email,
  course_type,
  course_title,
  course_category,
  creator_time_available_per_week,
  is_public,
  is_submission_process_completed,
  language,
  created_at
) VALUES (
  2,
  'anna.testi@gmail.com',
  'course',
  'Design Fundamentals',
  'Design',
  '5+ hours',
  false,
  false,
  'english',
  current_timestamp
);

INSERT INTO curriculum_sections (
  course_draft_id,
  title,
  learning_objective,
  order_index
) VALUES (
  3,
  'Introduction',
  'Understand the basics of design',
  0
);

INSERT INTO lessons (
  curriculum_section_id,
  name,
  description,
  order_index,
  video_url,
  video_length_seconds
) VALUES (
  8,
  'What is design?',
  '[{"type": "paragraph", "children": [{"text": "Hello World!"}]}]',
  0,
  ' ',
  0
);

INSERT INTO lessons (
  curriculum_section_id,
  name,
  description,
  order_index,
  video_url,
  video_length_seconds
) VALUES (
  8,
  'Why design?',
  '[{"type": "paragraph", "children": [{"text": "Hello World!"}]}]',
  1,
  ' ',
  0
);

INSERT INTO lessons (
  curriculum_section_id,
  name,
  description,
  order_index,
  video_url,
  video_length_seconds
) VALUES (
  8,
  'How to get started?',
  '[{"type": "paragraph", "children": [{"text": "Hello World!"}]}]',
  2,
  ' ',
  0
);

INSERT INTO curriculum_sections (
  course_draft_id,
  title,
  learning_objective,
  order_index
) VALUES (
  3,
  'Color Theory',
  'Understand the concept of color theory',
  1
);


INSERT INTO users (email, full_name, password_hash, receive_insider_emails)
VALUES ('jaakko.testi@gmail.com', 'Jaakko Mäntylä', '$2b$10$L/z4TTiOcr0nzaWT5TuYb.tb4CwVmMLteMdiNLB.pThjW35uLrp6S', true);

INSERT INTO coursedrafts (
  creator_id,
  creator_email,
  course_type,
  course_title,
  course_category,
  creator_time_available_per_week,
  is_public,
  is_submission_process_completed,
  language,
  created_at
) VALUES (
  3,
  'jaakko.testi@gmail.com',
  'course',
  'Marketing Fundamentals',
  'Marketing',
  '5+ hours',
  false,
  false,
  'english',
  current_timestamp
);

INSERT INTO users (email, full_name, password_hash, receive_insider_emails)
VALUES ('kalle.testi@gmail.com', 'Kalle Hakala', '$2b$10$L/z4TTiOcr0nzaWT5TuYb.tb4CwVmMLteMdiNLB.pThjW35uLrp6S', true);
