-- Supabase Schema for Jharkhand Societal Innovation Portal

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: profiles
create table if not exists profiles (
    id uuid references auth.users on delete cascade primary key,
    role text not null check (role in ('CITIZEN', 'STUDENT', 'FACULTY', 'UNIVERSITY', 'INDUSTRY', 'GOVERNMENT_ADMIN')),
    full_name text,
    email text unique,
    organization_name text,
    phone_number text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: challenges
create table if not exists challenges (
    id uuid default uuid_generate_v4() primary key,
    citizen_id uuid references profiles(id) on delete cascade,
    title text not null,
    description text not null,
    category text,
    district text,
    gps_location text,
    status text default 'SUBMITTED' check (status in ('SUBMITTED', 'ANALYZING', 'RECOMMENDED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED')),
    ai_domain text,
    ai_priority text,
    ai_severity integer,
    ai_skills_required text[],
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: challenge_media
create table if not exists challenge_media (
    id uuid default uuid_generate_v4() primary key,
    challenge_id uuid references challenges(id) on delete cascade,
    media_url text not null,
    media_type text check (media_type in ('IMAGE', 'DOCUMENT')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: universities (extended info)
create table if not exists universities (
    id uuid references profiles(id) on delete cascade primary key,
    website text,
    accreditation text
);

-- Table: projects
create table if not exists projects (
    id uuid default uuid_generate_v4() primary key,
    challenge_id uuid references challenges(id) on delete cascade,
    university_id uuid references profiles(id),
    title text not null,
    description text,
    status text default 'PLANNING' check (status in ('PLANNING', 'ONGOING', 'REVIEW', 'COMPLETED')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: project_members
create table if not exists project_members (
    id uuid default uuid_generate_v4() primary key,
    project_id uuid references projects(id) on delete cascade,
    profile_id uuid references profiles(id) on delete cascade,
    role text check (role in ('STUDENT', 'FACULTY_MENTOR')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: milestones
create table if not exists milestones (
    id uuid default uuid_generate_v4() primary key,
    project_id uuid references projects(id) on delete cascade,
    title text not null,
    description text,
    status text default 'PENDING' check (status in ('PENDING', 'IN_PROGRESS', 'COMPLETED')),
    due_date timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: collaborations
create table if not exists collaborations (
    id uuid default uuid_generate_v4() primary key,
    project_id uuid references projects(id) on delete cascade,
    industry_id uuid references profiles(id) on delete cascade,
    support_type text check (support_type in ('MENTORSHIP', 'FUNDING', 'TECHNOLOGY', 'DEPLOYMENT')),
    status text default 'PENDING' check (status in ('PENDING', 'ACCEPTED', 'REJECTED')),
    details text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: notifications
create table if not exists notifications (
    id uuid default uuid_generate_v4() primary key,
    profile_id uuid references profiles(id) on delete cascade,
    title text not null,
    message text,
    is_read boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: impact_metrics
create table if not exists impact_metrics (
    id uuid default uuid_generate_v4() primary key,
    project_id uuid references projects(id) on delete cascade,
    metric_name text not null,
    metric_value text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a mock trigger function for handling new users in a mock setup
-- Usually you'd hook this to auth.users in Supabase
