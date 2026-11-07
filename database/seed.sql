-- =============================================================================
-- PRANJAL RAJ PORTFOLIO — POSTGRESQL SEED DATA
-- Sourced directly from Pranjal Raj's Resume PDF
-- =============================================================================

TRUNCATE TABLE profile, experiences, projects, skills, education, achievements RESTART IDENTITY CASCADE;

-- 1. Profile
INSERT INTO profile (
    full_name, headline, tagline, bio, email, secondary_email, phone, location,
    github_url, linkedin_url, instagram_url, portfolio_url, avatar_url, resume_url, default_fur_preset
) VALUES (
    'Pranjal Raj',
    'Software Engineer & MERN Stack Developer',
    'Architecting scalable full-stack platforms, real-time systems & interactive 3D web experiences.',
    'Passionate Software Engineer and MERN Stack Developer pursuing B.Tech in Electronics and Communication at Vellore Institute of Technology (CGPA: 8.30). Experienced in architecting responsive full-stack web applications with React, Next.js, TypeScript, Tailwind CSS, Framer Motion, shadcn/ui, NestJS, Node.js, and PostgreSQL, alongside high-performance Flutter mobile systems and ESP32 IoT cloud pipelines.',
    'prnjlrj.work@gmail.com',
    'raj.pranjal.999@gmail.com',
    '+91 7830550771',
    'Vellore, Tamil Nadu, India',
    'https://github.com/prnjl-rj',
    'https://www.linkedin.com/in/pranjal-raj-71b9b624a/',
    'https://www.instagram.com/prnj.lrj_ofcl/',
    'https://heroic-stardust-148f66.netlify.app/',
    '/mypicc.jpg',
    '/resume.pdf',
    'Sakura Mochi'
);

-- 2. Experiences (Updated from Resume PDF)
INSERT INTO experiences (
    role, company, work_mode, location, start_date, end_date, is_current, highlights, tech_stack, metrics, display_order
) VALUES
(
    'Web Developer Intern',
    'Emerald Windows',
    'Hybrid',
    'Hybrid',
    'October 2026',
    'April 2027',
    TRUE,
    '[
      "Developing responsive, client-facing web applications using React.js, Next.js, TypeScript, JavaScript, and Tailwind CSS, focusing on usability, reusable components, and maintainable code.",
      "Building interactive user interfaces using Vite, Framer Motion, Lucide React, and shadcn/ui to deliver consistent and engaging user experiences.",
      "Contributing to full-stack development by implementing backend functionality, RESTful APIs, data validation with Zod, and server-side logic using NestJS and JavaScript."
    ]'::jsonb,
    ARRAY['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Lucide React', 'shadcn/ui', 'NestJS', 'RESTful APIs', 'Zod'],
    '[{"label": "Architecture", "value": "Full-Stack Next.js & NestJS"}, {"label": "UI System", "value": "shadcn/ui + Framer Motion"}]'::jsonb,
    1
),
(
    'Mobile Systems Engineering Intern',
    'Ardent Software Services',
    'Remote',
    'Remote',
    'June 2026',
    'August 2026',
    FALSE,
    '[
      "Built high-performance Flutter mobile app with real-time data synchronization, achieving 60 FPS and <500ms sync latency through asynchronous APIs, SQLite caching, and race condition prevention.",
      "Optimized concurrent state management using Dart isolates for background processing, reducing memory footprint by 40% and maintaining 99.8% app stability across test deployments.",
      "Implemented graceful degradation patterns for offline-first architecture, ensuring zero data loss during network transitions and reliable synchronization with cloud backend."
    ]'::jsonb,
    ARRAY['Flutter', 'Dart', 'Dart Isolates', 'SQLite', 'Asynchronous APIs', 'Offline-First Architecture', 'Cloud Sync'],
    '[{"label": "Frame Rate", "value": "60 FPS"}, {"label": "Sync Latency", "value": "<500ms"}, {"label": "Memory Footprint", "value": "-40%"}, {"label": "App Stability", "value": "99.8%"}]'::jsonb,
    2
);

-- 3. Projects (Updated with README links & Resume bullets)
INSERT INTO projects (
    slug, title, subtitle, category, summary, highlights, tech_stack, image_url, readme_url, github_url, metrics, featured, display_order
) VALUES
(
    'panchayat-app',
    'Panchayat App',
    'Society Mobile Application & Cooperative Housing SaaS',
    'Full-Stack & Mobile',
    'A full-stack cooperative housing management platform centralizing administrative and resident communication, role-based authentication, subscription/payment flows, and a secure Express.js API layer into a unified digital ecosystem.',
    '[
      "Developed a full-stack cooperative housing management platform using React 18+, TypeScript, and Node.js, centralizing administrative and resident communication into a unified digital ecosystem.",
      "Devised role-based authentication, secure profile management, and integrated subscription/payment flows, directly addressing chronic inefficiencies in record-keeping, transparency, and fee collection for housing societies.",
      "Designed a mobile-first, responsive UI with Tailwind CSS and Framer Motion micro-animations, delivering a polished, high-contrast user experience across all device types.",
      "Engineered a secure server-side API layer with Express.js to handle authentication, data management, and critical operations, ensuring sensitive data remains protected and never exposed client-side."
    ]'::jsonb,
    ARRAY['React 18+', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lucide React', 'Vite', 'Node.js', 'Express.js', 'Secure API Layer'],
    '/panchayat-1.jpeg',
    'https://github.com/prnjl-rj/Panchayat-Portal/blob/main/README.md',
    'https://github.com/prnjl-rj/Panchayat-Portal/blob/main/README.md',
    '[{"label": "Platform", "value": "Full-Stack SaaS & PWA"}, {"label": "Security", "value": "RBAC + Protected API"}]'::jsonb,
    TRUE,
    1
),
(
    'intellibin',
    'IntelliBin',
    'Software + Hardware Intelligent IoT Waste Management',
    'IoT & Cloud Pipeline',
    'Complete IoT system architecture for intelligent waste management integrating ESP32 multi-sensor hardware (ultrasonic, gas, temperature, moisture, GPS) with a Firebase cloud data aggregation pipeline and real-time web dashboard.',
    '[
      "Designed complete IoT system architecture for intelligent waste management, integrating hardware sensors (ultrasonic, gas, temperature, moisture, GPS) with cloud infrastructure for real-time monitoring and optimization.",
      "Built embedded system firmware on ESP32 using Arduino IDE with asynchronous sensor data collection, handling concurrent I/O operations and synchronization of multi-sensor inputs at real-time intervals.",
      "Engineered data aggregation pipeline using HTTP APIs to transmit sensor data to Firebase with custom JSON payload optimization, reducing bandwidth usage by 45% through compression and selective field transmission.",
      "Engineered intelligent alert system with threshold-based triggers for hazardous gas detection and bin overflow prediction, optimizing collection routes based on spatial data for 25% reduction in collection time."
    ]'::jsonb,
    ARRAY['Google Firebase', 'ESP32', 'Arduino IDE', 'HTML5', 'CSS', 'JavaScript', 'Node.js', 'HTTP APIs', 'Real-time Web Dashboard'],
    '/smart-waste-system.png',
    'https://github.com/prnjl-rj/IntelliBin/blob/main/README.md',
    'https://github.com/prnjl-rj/IntelliBin/blob/main/README.md',
    '[{"label": "Bandwidth Saved", "value": "45% Reduction"}, {"label": "Route Efficiency", "value": "25% Faster Collection"}]'::jsonb,
    TRUE,
    2
);

-- 4. Skills (Sourced from Resume PDF + Stack update)
INSERT INTO skills (category, name, proficiency, is_highlighted, display_order) VALUES
('Programming Languages', 'JavaScript', 95, TRUE, 1),
('Programming Languages', 'TypeScript', 92, TRUE, 2),
('Programming Languages', 'Java', 90, TRUE, 3),
('Programming Languages', 'C / C++', 88, FALSE, 4),
('Programming Languages', 'Dart', 86, FALSE, 5),
('Programming Languages', 'R', 80, FALSE, 6),
('Frontend & Development', 'React.js', 95, TRUE, 1),
('Frontend & Development', 'Next.js', 90, TRUE, 2),
('Frontend & Development', 'Tailwind CSS', 95, TRUE, 3),
('Frontend & Development', 'Framer Motion', 92, TRUE, 4),
('Frontend & Development', 'shadcn/ui', 92, TRUE, 5),
('Frontend & Development', 'PostCSS & Vite', 90, FALSE, 6),
('Frontend & Development', 'Three.js / WebGL2', 88, TRUE, 7),
('Frontend & Development', 'HTML5 & CSS3', 96, FALSE, 8),
('Frontend & Development', 'Flutter', 88, FALSE, 9),
('Backend & Databases', 'Node.js', 94, TRUE, 1),
('Backend & Databases', 'Express.js', 94, TRUE, 2),
('Backend & Databases', 'Nest.js', 88, TRUE, 3),
('Backend & Databases', 'PostgreSQL', 90, TRUE, 4),
('Backend & Databases', 'RESTful APIs', 95, TRUE, 5),
('Backend & Databases', 'WebSockets', 88, FALSE, 6),
('Backend & Databases', 'Google Firebase', 92, FALSE, 7),
('Backend & Databases', 'Redis & DynamoDB', 85, FALSE, 8),
('Backend & Databases', 'SQLite & Zod', 88, FALSE, 9),
('DevOps & Cloud', 'Docker & Docker Compose', 88, TRUE, 1),
('DevOps & Cloud', 'Amazon Web Services (AWS)', 86, TRUE, 2),
('DevOps & Cloud', 'GitHub Actions (CI/CD)', 88, FALSE, 3),
('DevOps & Cloud', 'Apache Kafka', 82, FALSE, 4),
('Monitoring & Workflow', 'Prometheus', 85, TRUE, 1),
('Monitoring & Workflow', 'Grafana', 85, TRUE, 2),
('Monitoring & Workflow', 'Git & GitHub', 95, TRUE, 3),
('Monitoring & Workflow', 'VS Code', 96, FALSE, 4);

-- 5. Education
INSERT INTO education (institution, degree, field_of_study, score_label, score_value, location, period, coursework, display_order) VALUES
(
    'Vellore Institute of Technology',
    'B.Tech in Electronics and Communication',
    'Electronics and Communication Engineering',
    'CGPA',
    '8.30',
    'Vellore, Tamil Nadu',
    'Aug 2024 – 2028',
    ARRAY['Operating Systems', 'Database Management Systems', 'Computer Networks', 'Data Structures & Algorithms', 'Software Engineering', 'Microprocessors & Interfacing'],
    1
),
(
    'Mount Litera Zee School, Roorkee',
    'Grade XII (CBSE)',
    'PCM with Computer Science',
    'Percentage',
    '85%',
    'Roorkee, Uttarakhand',
    'July 2022 – May 2023',
    ARRAY['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
    2
),
(
    'Mount Litera Zee School, Roorkee',
    'Grade X (CBSE)',
    'General Sciences & Mathematics',
    'Percentage',
    '96%',
    'Roorkee, Uttarakhand',
    'July 2021',
    ARRAY['Mathematics', 'Science', 'Information Technology'],
    3
);

-- 6. Achievements (Co-Curriculars, Certifications, Hackathons)
INSERT INTO achievements (kind, title, organization, period, description, highlights, display_order) VALUES
(
    'cocurricular',
    'Clubs and Chapter Participation',
    'VIT, Vellore, Tamil Nadu',
    'Jul 2024 – Present',
    'Technical web engineering, sponsorship communications, and strategic media outreach for flagship university hackathons and community initiatives.',
    '[
      "Engineered the landing page for HackOIT V4.0 and managed sponsorship communications, contributing to a 20% increase in total event registrations.",
      "Led PR and media outreach for community initiatives, increasing event participation by 30% through targeted social media campaigns and strategic content creation."
    ]'::jsonb,
    1
),
(
    'certification',
    'DSA with Java (Delta Batch)',
    'Apna College',
    '2025',
    'Comprehensive mastery of Data Structures, Algorithms, problem-solving patterns, and object-oriented programming in Java.',
    '[]'::jsonb,
    1
),
(
    'certification',
    'MERN Fullstack Program',
    'Apna College',
    '2025',
    'End-to-end full-stack web architecture covering React, Node.js, Express.js, relational & NoSQL databases, and REST APIs.',
    '[]'::jsonb,
    2
),
(
    'certification',
    'Amazon Web Services Program',
    'Udemy',
    '2025',
    'Cloud infrastructure architecture, compute, storage, IAM security, and scalable deployment workflows on AWS.',
    '[]'::jsonb,
    3
),
(
    'certification',
    'Software Engineering Job Simulation',
    'Commonwealth Bank',
    '2026',
    'Completed practical software engineering and cybersecurity frontend engineering simulations.',
    '[]'::jsonb,
    4
),
(
    'hackathon',
    'OpenCode 2026',
    'Indian Institute of Information Technology (IIIT), Allahabad',
    '2026',
    'Open-source software engineering and competitive development hackathon.',
    '[]'::jsonb,
    1
),
(
    'hackathon',
    'SENSE HACK 2025',
    'Vellore Institute of Technology, Vellore',
    '2025',
    'Hardware-software IoT and embedded systems innovation hackathon.',
    '[]'::jsonb,
    2
),
(
    'hackathon',
    'Designathon 2024',
    'Vellore Institute of Technology, Vellore',
    '2024',
    'Product design, UI/UX prototyping, and interactive frontend engineering competition.',
    '[]'::jsonb,
    3
);

