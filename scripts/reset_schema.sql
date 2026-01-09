-- Drop existing schema if needed to reset everything
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create components table
CREATE TABLE public.components (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    registry_dependencies JSONB DEFAULT '[]'::jsonb,
    npm_dependencies JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create files table to store component code
CREATE TABLE public.component_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    component_id UUID REFERENCES public.components(id) ON DELETE CASCADE,
    path TEXT NOT NULL, -- e.g. "button.tsx", "lib/utils.ts"
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(component_id, path)
);

-- Create tags table (optional)
CREATE TABLE public.tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE public.component_tags (
    component_id UUID REFERENCES public.components(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY (component_id, tag_id)
);

-- RLS Policies (Basic)
ALTER TABLE public.components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.component_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.component_tags ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public components are viewable by everyone" ON public.components FOR SELECT USING (true);
CREATE POLICY "Public files are viewable by everyone" ON public.component_files FOR SELECT USING (true);
CREATE POLICY "Public tags are viewable by everyone" ON public.tags FOR SELECT USING (true);

-- Allow authenticated (service role or specific users) to insert/update - simplified for now
-- In production, you'd restrict this to specific admin users
CREATE POLICY "Enable insert for authenticated users only" ON public.components FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON public.components FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable insert for files" ON public.component_files FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Insert a sample component for testing
INSERT INTO public.components (slug, name, description) 
VALUES ('button', 'Button', 'A standard button component.');

-- (Optional) Insert sample file would go here if we had the UUID
