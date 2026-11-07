export const INITIAL_PORTFOLIO_DATA = {
  profile: {
    id: 1,
    full_name: 'Pranjal Raj',
    headline: 'Software Engineer & MERN Stack Developer',
    tagline: 'Architecting scalable full-stack platforms, real-time systems & interactive 3D web experiences.',
    bio: 'Passionate Software Engineer and MERN Stack Developer pursuing B.Tech in Electronics and Communication at Vellore Institute of Technology (CGPA: 8.30). Experienced in architecting responsive full-stack web applications with React, Next.js, TypeScript, Tailwind CSS, Framer Motion, shadcn/ui, NestJS, Node.js, and PostgreSQL, alongside high-performance Flutter mobile systems and ESP32 IoT cloud pipelines.',
    email: 'prnjlrj.work@gmail.com',
    secondary_email: 'raj.pranjal.999@gmail.com',
    phone: '+91 7830550771',
    location: 'Vellore, Tamil Nadu, India',
    github_url: 'https://github.com/prnjl-rj',
    linkedin_url: 'https://www.linkedin.com/in/pranjal-raj-71b9b624a/',
    instagram_url: 'https://www.instagram.com/prnj.lrj_ofcl/',
    portfolio_url: 'https://heroic-stardust-148f66.netlify.app/',
    avatar_url: '/mypicc.jpg',
    resume_url: '/resume.pdf',
    default_fur_preset: 'Sakura Mochi'
  },
  experiences: [
    {
      id: 1,
      role: 'Web Developer Intern',
      company: 'Emerald Windows',
      work_mode: 'Hybrid',
      location: 'Hybrid',
      start_date: 'October 2026',
      end_date: 'April 2027',
      is_current: true,
      highlights: [
        'Developing responsive, client-facing web applications using React.js, Next.js, TypeScript, JavaScript, and Tailwind CSS, focusing on usability, reusable components, and maintainable code.',
        'Building interactive user interfaces using Vite, Framer Motion, Lucide React, and shadcn/ui to deliver consistent and engaging user experiences.',
        'Contributing to full-stack development by implementing backend functionality, RESTful APIs, data validation with Zod, and server-side logic using NestJS and JavaScript.'
      ],
      tech_stack: [
        'React.js',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'Tailwind CSS',
        'Vite',
        'Framer Motion',
        'Lucide React',
        'shadcn/ui',
        'NestJS',
        'RESTful APIs',
        'Zod'
      ],
      metrics: [
        { label: 'Architecture', value: 'Full-Stack Next.js & NestJS' },
        { label: 'UI System', value: 'shadcn/ui + Framer Motion' },
        { label: 'Validation', value: 'Zod + Type-Safe REST APIs' }
      ],
      display_order: 1
    },
    {
      id: 2,
      role: 'Mobile Systems Engineering Intern',
      company: 'Ardent Software Services',
      work_mode: 'Remote',
      location: 'Remote',
      start_date: 'June 2026',
      end_date: 'August 2026',
      is_current: false,
      highlights: [
        'Built high-performance Flutter mobile app with real-time data synchronization, achieving 60 FPS and <500ms sync latency through asynchronous APIs, SQLite caching, and race condition prevention.',
        'Optimized concurrent state management using Dart isolates for background processing, reducing memory footprint by 40% and maintaining 99.8% app stability across test deployments.',
        'Implemented graceful degradation patterns for offline-first architecture, ensuring zero data loss during network transitions and reliable synchronization with cloud backend.'
      ],
      tech_stack: [
        'Flutter',
        'Dart',
        'Dart Isolates',
        'SQLite Caching',
        'Asynchronous APIs',
        'Offline-First Architecture',
        'Cloud Sync'
      ],
      metrics: [
        { label: 'Performance', value: '60 FPS Rendering' },
        { label: 'Sync Latency', value: '<500ms Real-Time' },
        { label: 'Memory Reduction', value: '40% via Dart Isolates' },
        { label: 'App Stability', value: '99.8% Crash-Free' }
      ],
      display_order: 2
    }
  ],
  projects: [
    {
      id: 1,
      slug: 'panchayat-app',
      title: 'Panchayat App',
      subtitle: 'Society Mobile Application & Cooperative Housing Platform',
      category: 'Full-Stack & Mobile Ecosystem',
      summary:
        'A full-stack cooperative housing management platform using React 18+, TypeScript, and Node.js, centralizing administrative and resident communication, role-based authentication, subscription/payment flows, and a protected Express.js server-side API layer.',
      highlights: [
        'Developed a full-stack cooperative housing management platform using React 18+, TypeScript, and Node.js, centralizing administrative and resident communication into a unified digital ecosystem.',
        'Devised role-based authentication, secure profile management, and integrated subscription/payment flows, directly addressing chronic inefficiencies in record-keeping, transparency, and fee collection for housing societies.',
        'Designed a mobile-first, responsive UI with Tailwind CSS and Framer Motion micro-animations, delivering a polished, high-contrast user experience across all device types.',
        'Engineered a secure server-side API layer with Express.js to handle authentication, data management, and critical operations, ensuring sensitive data remains protected and never exposed client-side.'
      ],
      tech_stack: [
        'React 18+',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion',
        'Lucide React',
        'Vite',
        'Node.js',
        'Express.js',
        'Secure API Layer'
      ],
      image_url: '/panchayat-1.jpeg',
      readme_url: 'https://github.com/prnjl-rj/Panchayat-Portal/blob/main/README.md',
      github_url: 'https://github.com/prnjl-rj/Panchayat-Portal/blob/main/README.md',
      metrics: [
        { label: 'Architecture', value: 'React 18+ & Express API' },
        { label: 'Security', value: 'Role-Based Auth (RBAC)' },
        { label: 'Experience', value: 'Mobile-First + Framer Motion' }
      ],
      featured: true,
      display_order: 1
    },
    {
      id: 2,
      slug: 'intellibin',
      title: 'IntelliBin',
      subtitle: 'Software + Hardware Intelligent IoT Waste Management',
      category: 'IoT Firmware & Cloud Telemetry',
      summary:
        'Complete IoT system architecture for intelligent waste management integrating ESP32 embedded sensor firmware (ultrasonic, gas, temperature, moisture, GPS) with HTTP/Firebase cloud telemetry and a real-time web dashboard.',
      highlights: [
        'Designed complete IoT system architecture for intelligent waste management, integrating hardware sensors (ultrasonic, gas, temperature, moisture, GPS) with cloud infrastructure for real-time monitoring and optimization.',
        'Built embedded system firmware on ESP32 using Arduino IDE with asynchronous sensor data collection, handling concurrent I/O operations and synchronization of multi-sensor inputs at real-time intervals.',
        'Engineered data aggregation pipeline using HTTP APIs to transmit sensor data to Firebase with custom JSON payload optimization, reducing bandwidth usage by 45% through compression and selective field transmission.',
        'Engineered intelligent alert system with threshold-based triggers for hazardous gas detection and bin overflow prediction, optimizing collection routes based on spatial data for 25% reduction in collection time.'
      ],
      tech_stack: [
        'Google Firebase',
        'ESP32',
        'Arduino IDE',
        'HTML5',
        'CSS',
        'JavaScript',
        'Node.js',
        'HTTP APIs',
        'Real-time Web Dashboard'
      ],
      image_url: '/smart-waste-system.png',
      readme_url: 'https://github.com/prnjl-rj/IntelliBin/blob/main/README.md',
      github_url: 'https://github.com/prnjl-rj/IntelliBin/blob/main/README.md',
      metrics: [
        { label: 'Bandwidth Optimization', value: '45% Payload Reduction' },
        { label: 'Route Optimization', value: '25% Faster Collection' },
        { label: 'Telemetry', value: 'Real-Time Multi-Sensor ESP32' }
      ],
      featured: true,
      display_order: 2
    }
  ],
  skills: [
    { id: 1, category: 'Programming Languages', name: 'JavaScript (ES6+)', proficiency: 95, is_highlighted: true },
    { id: 2, category: 'Programming Languages', name: 'TypeScript', proficiency: 92, is_highlighted: true },
    { id: 3, category: 'Programming Languages', name: 'Java', proficiency: 92, is_highlighted: true },
    { id: 4, category: 'Programming Languages', name: 'C / C++', proficiency: 88, is_highlighted: false },
    { id: 5, category: 'Programming Languages', name: 'Dart', proficiency: 86, is_highlighted: false },
    { id: 6, category: 'Programming Languages', name: 'R', proficiency: 80, is_highlighted: false },

    { id: 7, category: 'Frontend & UI', name: 'React.js', proficiency: 96, is_highlighted: true },
    { id: 8, category: 'Frontend & UI', name: 'Next.js', proficiency: 90, is_highlighted: true },
    { id: 9, category: 'Frontend & UI', name: 'Tailwind CSS & PostCSS', proficiency: 96, is_highlighted: true },
    { id: 10, category: 'Frontend & UI', name: 'Framer Motion', proficiency: 93, is_highlighted: true },
    { id: 11, category: 'Frontend & UI', name: 'shadcn/ui', proficiency: 94, is_highlighted: true },
    { id: 12, category: 'Frontend & UI', name: 'Three.js / WebGL2 / GPGPU', proficiency: 89, is_highlighted: true },
    { id: 13, category: 'Frontend & UI', name: 'Flutter', proficiency: 88, is_highlighted: false },
    { id: 14, category: 'Frontend & UI', name: 'HTML5 & CSS3', proficiency: 96, is_highlighted: false },
    { id: 15, category: 'Frontend & UI', name: 'Vite & Lucide React', proficiency: 94, is_highlighted: false },

    { id: 16, category: 'Backend & Databases', name: 'Node.js', proficiency: 94, is_highlighted: true },
    { id: 17, category: 'Backend & Databases', name: 'Express.js', proficiency: 94, is_highlighted: true },
    { id: 18, category: 'Backend & Databases', name: 'Nest.js', proficiency: 88, is_highlighted: true },
    { id: 19, category: 'Backend & Databases', name: 'PostgreSQL', proficiency: 91, is_highlighted: true },
    { id: 20, category: 'Backend & Databases', name: 'RESTful APIs & Zod', proficiency: 95, is_highlighted: true },
    { id: 21, category: 'Backend & Databases', name: 'WebSockets', proficiency: 88, is_highlighted: false },
    { id: 22, category: 'Backend & Databases', name: 'Google Firebase', proficiency: 92, is_highlighted: false },
    { id: 23, category: 'Backend & Databases', name: 'Redis & DynamoDB', proficiency: 85, is_highlighted: false },
    { id: 24, category: 'Backend & Databases', name: 'SQLite', proficiency: 88, is_highlighted: false },

    { id: 25, category: 'DevOps & Cloud', name: 'Docker & Docker Compose', proficiency: 88, is_highlighted: true },
    { id: 26, category: 'DevOps & Cloud', name: 'Amazon Web Services (AWS)', proficiency: 87, is_highlighted: true },
    { id: 27, category: 'DevOps & Cloud', name: 'GitHub Actions (CI/CD)', proficiency: 89, is_highlighted: false },
    { id: 28, category: 'DevOps & Cloud', name: 'Apache Kafka', proficiency: 82, is_highlighted: false },

    { id: 29, category: 'Monitoring & Workflow', name: 'Prometheus', proficiency: 85, is_highlighted: true },
    { id: 30, category: 'Monitoring & Workflow', name: 'Grafana', proficiency: 85, is_highlighted: true },
    { id: 31, category: 'Monitoring & Workflow', name: 'Git & GitHub', proficiency: 95, is_highlighted: true },
    { id: 32, category: 'Monitoring & Workflow', name: 'VS Code', proficiency: 96, is_highlighted: false }
  ],
  education: [
    {
      id: 1,
      institution: 'Vellore Institute of Technology',
      degree: 'B.Tech in Electronics and Communication',
      field_of_study: 'Electronics and Communication Engineering',
      score_label: 'CGPA',
      score_value: '8.30',
      location: 'Vellore, Tamil Nadu',
      period: 'Aug 2024 – 2028',
      coursework: [
        'Operating Systems',
        'Database Management Systems',
        'Computer Networks',
        'Data Structures & Algorithms',
        'Software Engineering',
        'Microprocessors & Interfacing'
      ]
    },
    {
      id: 2,
      institution: 'Mount Litera Zee School, Roorkee',
      degree: 'Grade XII — PCM with Computer Science',
      field_of_study: 'Science & Computer Science',
      score_label: 'Percentage',
      score_value: '85%',
      location: 'Roorkee, Uttarakhand',
      period: 'July 2022 – May 2023',
      coursework: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry']
    },
    {
      id: 3,
      institution: 'Mount Litera Zee School, Roorkee',
      degree: 'Grade X — High School',
      field_of_study: 'Mathematics & Science',
      score_label: 'Percentage',
      score_value: '96%',
      location: 'Roorkee, Uttarakhand',
      period: 'July 2021',
      coursework: ['Mathematics', 'Science', 'Information Technology']
    }
  ],
  achievements: [
    {
      id: 1,
      kind: 'cocurricular',
      title: 'Clubs and Chapter Participation',
      organization: 'VIT, Vellore, Tamil Nadu',
      period: 'Jul 2024 – Present',
      description: 'Technical web engineering, sponsorship communications, and strategic media outreach for flagship university hackathons and community initiatives.',
      highlights: [
        'Engineered the landing page for HackOIT V4.0 and managed sponsorship communications, contributing to a 20% increase in total event registrations.',
        'Led PR and media outreach for community initiatives, increasing event participation by 30% through targeted social media campaigns and strategic content creation.'
      ]
    },
    {
      id: 2,
      kind: 'certification',
      title: 'DSA with Java (Delta Batch)',
      organization: 'Apna College',
      period: '2025',
      description: 'Advanced Data Structures, Algorithms, graph/DP problem solving, and Java OOP architecture.'
    },
    {
      id: 3,
      kind: 'certification',
      title: 'MERN Fullstack Program',
      organization: 'Apna College',
      period: '2025',
      description: 'Production full-stack web engineering with React, Node.js, Express.js, REST APIs, and databases.'
    },
    {
      id: 4,
      kind: 'certification',
      title: 'Amazon Web Services Program',
      organization: 'Udemy',
      period: '2025',
      description: 'Cloud infrastructure architecture, deployment automation, IAM, EC2, S3, and serverless patterns.'
    },
    {
      id: 5,
      kind: 'certification',
      title: 'Software Engineering Job Simulation',
      organization: 'Commonwealth Bank',
      period: '2026',
      description: 'Completed software engineering and financial cybersecurity web engineering job simulation.'
    },
    {
      id: 6,
      kind: 'hackathon',
      title: 'OpenCode 2026',
      organization: 'Indian Institute of Information Technology (IIIT), Allahabad',
      period: '2026',
      description: 'Competitive open-source software development and full-stack engineering event.'
    },
    {
      id: 7,
      kind: 'hackathon',
      title: 'SENSE HACK 2025',
      organization: 'Vellore Institute of Technology, Vellore',
      period: '2025',
      description: 'Hardware-software embedded IoT systems and cloud telemetry hackathon.'
    },
    {
      id: 8,
      kind: 'hackathon',
      title: 'Designathon 2024',
      organization: 'Vellore Institute of Technology, Vellore',
      period: '2024',
      description: 'UI/UX product design and interactive web prototyping challenge.'
    }
  ]
};

