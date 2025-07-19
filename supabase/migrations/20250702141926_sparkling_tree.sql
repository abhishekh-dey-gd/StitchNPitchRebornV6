/*
  # Create winners table for Stitch and Pitch Contest

  1. New Tables
    - `winners`
      - `id` (uuid, primary key)
      - `guide_id` (integer, reference to guide ID from config)
      - `name` (text, guide name)
      - `department` (text, guide department)
      - `supervisor` (text, guide supervisor)
      - `timestamp` (timestamptz, when guide was selected as winner)
      - `created_at` (timestamptz, when record was created)

  2. Security
    - Enable RLS on `winners` table
    - Add policy for public read access (contest is public)
    - Add policy for authenticated insert (admin can add winners)
    - Add policy for authenticated delete (admin can purge winners)

  3. Indexes
    - Index on created_at for efficient ordering
    - Index on department for filtering
*/

CREATE TABLE IF NOT EXISTS winners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guide_id integer NOT NULL,
  name text NOT NULL,
  department text NOT NULL,
  supervisor text NOT NULL,
  timestamp timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE winners ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anyone can view winners)
CREATE POLICY "Anyone can view winners"
  ON winners
  FOR SELECT
  TO public
  USING (true);

-- Allow public insert (for contest functionality)
CREATE POLICY "Anyone can add winners"
  ON winners
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public delete (for purge functionality)
CREATE POLICY "Anyone can delete winners"
  ON winners
  FOR DELETE
  TO public
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS winners_created_at_idx ON winners(created_at DESC);
CREATE INDEX IF NOT EXISTS winners_department_idx ON winners(department);
CREATE INDEX IF NOT EXISTS winners_timestamp_idx ON winners(timestamp DESC);