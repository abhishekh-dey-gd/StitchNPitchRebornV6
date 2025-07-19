/*
  # Fix Chinthakunta Laxmi prasanna department name

  1. Updates
    - Change department from "sales" to "Sales" for Chinthakunta Laxmi prasanna
    - Uses timestamp to ensure we update the correct record
    - Matches the exact entry shown in the Winners Dashboard

  2. Security
    - Safe UPDATE operation with specific WHERE conditions
    - Only affects the targeted record
*/

-- Update Chinthakunta Laxmi prasanna's department from "sales" to "Sales"
-- Using name and approximate timestamp to target the specific record
UPDATE winners 
SET department = 'Sales'
WHERE name = 'Chinthakunta Laxmi prasanna' 
  AND department = 'sales'
  AND DATE(created_at) = '2025-07-02';