-- SQL в Supabase Editor
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включите RLS (Row Level Security)
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Создайте политики
CREATE POLICY "Users can subscribe to newsletter" 
ON newsletter_subscribers 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Admin can view all subscribers" 
ON newsletter_subscribers 
FOR SELECT 
TO authenticated 
USING (true);