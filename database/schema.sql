-- =============================================================================
-- PRANJAL RAJ PORTFOLIO — POSTGRESQL DATABASE SCHEMA
-- Engine: PostgreSQL 15+
-- Features: Relational tables, JSONB metadata, array columns, indexes & triggers
-- =============================================================================

-- Enable UUID generation extension if needed
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Automatic updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -----------------------------------------------------------------------------
-- 1. PROFILE TABLE
-- Stores primary developer profile metadata, social links, and active 3D preset
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS profile (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    headline VARCHAR(200) NOT NULL,
    tagline VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    email VARCHAR(160) NOT NULL,
    secondary_email VARCHAR(160),
    phone VARCHAR(40) NOT NULL,
    location VARCHAR(120) DEFAULT 'Vellore, Tamil Nadu, India',
    github_url VARCHAR(255) NOT NULL,
    linkedin_url VARCHAR(255) NOT NULL,
    instagram_url VARCHAR(255),
    portfolio_url VARCHAR(255),
    avatar_url VARCHAR(255) NOT NULL DEFAULT '/mypicc.jpg',
    resume_url VARCHAR(255) NOT NULL DEFAULT '/resume.pdf',
    default_fur_preset VARCHAR(60) DEFAULT 'Sakura Mochi',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 2. EXPERIENCES TABLE
-- Stores professional work experience & internships (referenced from Resume PDF)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS experiences (
    id SERIAL PRIMARY KEY,
    role VARCHAR(160) NOT NULL,
    company VARCHAR(160) NOT NULL,
    work_mode VARCHAR(60) NOT NULL DEFAULT 'Remote', -- 'Hybrid', 'Remote', 'On-site'
    location VARCHAR(120),
    start_date VARCHAR(60) NOT NULL,
    end_date VARCHAR(60) NOT NULL,
    is_current BOOLEAN NOT NULL DEFAULT FALSE,
    highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
    tech_stack TEXT[] NOT NULL DEFAULT '{}',
    metrics JSONB DEFAULT '[]'::jsonb,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_experiences_order ON experiences(display_order ASC);

-- -----------------------------------------------------------------------------
-- 3. PROJECTS TABLE
-- Stores full-stack & IoT engineering projects (Panchayat App, IntelliBin, etc.)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(180) NOT NULL,
    subtitle VARCHAR(200),
    category VARCHAR(80) NOT NULL DEFAULT 'Full-Stack',
    summary TEXT NOT NULL,
    highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
    tech_stack TEXT[] NOT NULL DEFAULT '{}',
    image_url VARCHAR(255) NOT NULL,
    readme_url VARCHAR(500) NOT NULL,
    github_url VARCHAR(500) NOT NULL,
    live_url VARCHAR(500),
    metrics JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured, display_order ASC);

-- -----------------------------------------------------------------------------
-- 4. SKILLS TABLE
-- Stores categorized technical skills & proficiency levels
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    category VARCHAR(80) NOT NULL, -- 'Programming Languages', 'Frontend & UI', 'Backend & APIs', 'DevOps & Cloud', 'Monitoring & Workflow'
    name VARCHAR(100) NOT NULL,
    proficiency INTEGER NOT NULL DEFAULT 90 CHECK (proficiency BETWEEN 1 AND 100),
    is_highlighted BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(category, name)
);

CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category, display_order ASC);

-- -----------------------------------------------------------------------------
-- 5. EDUCATION TABLE
-- Stores academic degrees, CGPA/percentage, and relevant coursework
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS education (
    id SERIAL PRIMARY KEY,
    institution VARCHAR(200) NOT NULL,
    degree VARCHAR(200) NOT NULL,
    field_of_study VARCHAR(180),
    score_label VARCHAR(40) NOT NULL, -- 'CGPA' or 'Percentage'
    score_value VARCHAR(40) NOT NULL, -- '8.30' or '85%' or '96%'
    location VARCHAR(140),
    period VARCHAR(80) NOT NULL,
    coursework TEXT[] DEFAULT '{}',
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 6. CERTIFICATIONS & ACHIEVEMENTS TABLE
-- Stores Certifications, Hackathons, and Co-Curricular Leadership
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS achievements (
    id SERIAL PRIMARY KEY,
    kind VARCHAR(50) NOT NULL, -- 'certification', 'hackathon', 'cocurricular'
    title VARCHAR(200) NOT NULL,
    organization VARCHAR(200) NOT NULL,
    period VARCHAR(80),
    description TEXT,
    highlights JSONB DEFAULT '[]'::jsonb,
    credential_url VARCHAR(500),
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_achievements_kind ON achievements(kind, display_order ASC);

-- -----------------------------------------------------------------------------
-- 7. CONTACT MESSAGES TABLE
-- Stores visitor inquiries submitted via the portfolio Contact section
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_name VARCHAR(120) NOT NULL,
    sender_email VARCHAR(180) NOT NULL,
    subject VARCHAR(220) DEFAULT 'Portfolio Inquiry',
    message TEXT NOT NULL,
    status VARCHAR(40) NOT NULL DEFAULT 'unread', -- 'unread', 'read', 'replied'
    ip_address VARCHAR(64),
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at DESC);

-- -----------------------------------------------------------------------------
-- 8. ANALYTICS EVENTS TABLE
-- Tracks project README clicks, 3D Fur interactions, and resume views
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS analytics_events (
    id BIGSERIAL PRIMARY KEY,
    event_type VARCHAR(80) NOT NULL, -- 'project_click', 'fur_preset_change', 'resume_open', 'contact_submit'
    target VARCHAR(255) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type, created_at DESC);

-- Attach updated_at triggers
DROP TRIGGER IF EXISTS trg_profile_updated_at ON profile;
CREATE TRIGGER trg_profile_updated_at
BEFORE UPDATE ON profile
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_experiences_updated_at ON experiences;
CREATE TRIGGER trg_experiences_updated_at
BEFORE UPDATE ON experiences
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_projects_updated_at ON projects;
CREATE TRIGGER trg_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

