/*
  # Add Chat IDs and Losers Support

  1. New Tables
    - `losers`
      - `id` (uuid, primary key)
      - `guide_id` (integer, references guide data)
      - `name` (text, guide name)
      - `department` (text, guide department)
      - `supervisor` (text, guide supervisor)
      - `timestamp` (timestamptz, when selected)
      - `chat_ids` (text array, up to 5 chat IDs)
      - `created_at` (timestamptz, record creation time)

  2. Schema Changes
    - Add `chat_ids` column to existing `winners` table

  3. Security
    - Enable RLS on `losers` table
    - Add policies for public access (customize for production)

  4. Performance
    - Add indexes for common queries
*/

-- Add chat_ids column to winners table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'winners' AND column_name = 'chat_ids'
  ) THEN
    ALTER TABLE winners ADD COLUMN chat_ids text[] DEFAULT '{}';
  END IF;
END $$;

-- Create losers table
CREATE TABLE IF NOT EXISTS losers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guide_id integer NOT NULL,
  name text NOT NULL,
  department text NOT NULL,
  supervisor text NOT NULL,
  timestamp timestamptz NOT NULL,
  chat_ids text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE losers ENABLE ROW LEVEL SECURITY;

-- Add policies for losers table
CREATE POLICY "Anyone can view losers"
  ON losers
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can add losers"
  ON losers
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can delete losers"
  ON losers
  FOR DELETE
  TO public
  USING (true);

-- Performance indexes for losers
CREATE INDEX IF NOT EXISTS losers_created_at_idx ON losers (created_at DESC);
CREATE INDEX IF NOT EXISTS losers_department_idx ON losers (department);
CREATE INDEX IF NOT EXISTS losers_timestamp_idx ON losers (timestamp DESC);
CREATE INDEX IF NOT EXISTS losers_guide_id_idx ON losers (guide_id);