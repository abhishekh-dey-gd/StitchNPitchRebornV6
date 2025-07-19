/*
  # Create Elite's Spiral table

  1. New Tables
    - `elite_spiral`
      - `id` (uuid, primary key)
      - `winner_id` (uuid, references winners table)
      - `guide_id` (integer, guide identifier)
      - `name` (text, guide name)
      - `department` (text, guide department)
      - `supervisor` (text, guide supervisor)
      - `timestamp` (timestamptz, when selected in spiral)
      - `chat_ids` (text[], chat IDs array)
      - `created_at` (timestamptz, record creation time)

  2. Security
    - Enable RLS on `elite_spiral` table
    - Add policies for public access

  3. Performance
    - Add indexes for common queries
    - Add foreign key constraint to winners table
*/

CREATE TABLE IF NOT EXISTS elite_spiral (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  winner_id uuid REFERENCES winners(id) ON DELETE CASCADE,
  guide_id integer NOT NULL,
  name text NOT NULL,
  department text NOT NULL,
  supervisor text NOT NULL,
  timestamp timestamptz NOT NULL,
  chat_ids text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE elite_spiral ENABLE ROW LEVEL SECURITY;

-- Public access policies (adjust for production)
CREATE POLICY "Anyone can view elite spiral"
  ON elite_spiral
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can add elite spiral"
  ON elite_spiral
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can delete elite spiral"
  ON elite_spiral
  FOR DELETE
  TO public
  USING (true);

-- Performance indexes
CREATE INDEX elite_spiral_created_at_idx ON elite_spiral (created_at DESC);
CREATE INDEX elite_spiral_department_idx ON elite_spiral (department);
CREATE INDEX elite_spiral_timestamp_idx ON elite_spiral (timestamp DESC);
CREATE INDEX elite_spiral_winner_id_idx ON elite_spiral (winner_id);