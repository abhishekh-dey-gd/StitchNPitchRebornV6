/*
  # Create winners table

  1. New Tables
    - `winners`
      - `id` (uuid, primary key)
      - `guide_id` (integer, not null)
      - `name` (text, not null)
      - `department` (text, not null)
      - `supervisor` (text, not null)
      - `timestamp` (timestamp with time zone, not null)
      - `created_at` (timestamp with time zone, default now())

  2. Security
    - Enable RLS on `winners` table
    - Add policy for public to read all winners
    - Add policy for public to insert winners
    - Add policy for public to delete winners

  3. Performance
    - Add indexes on created_at, department, and timestamp columns
*/

-- Create the winners table
CREATE TABLE IF NOT EXISTS public.winners (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    guide_id integer NOT NULL,
    name text NOT NULL,
    department text NOT NULL,
    supervisor text NOT NULL,
    timestamp timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.winners ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can view winners" ON public.winners;
DROP POLICY IF EXISTS "Anyone can add winners" ON public.winners;
DROP POLICY IF EXISTS "Anyone can delete winners" ON public.winners;

-- Create policies for public access
CREATE POLICY "Anyone can view winners"
    ON public.winners
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Anyone can add winners"
    ON public.winners
    FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Anyone can delete winners"
    ON public.winners
    FOR DELETE
    TO public
    USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS winners_created_at_idx ON public.winners USING btree (created_at DESC);
CREATE INDEX IF NOT EXISTS winners_department_idx ON public.winners USING btree (department);
CREATE INDEX IF NOT EXISTS winners_timestamp_idx ON public.winners USING btree (timestamp DESC);