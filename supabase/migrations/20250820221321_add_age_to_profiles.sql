ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS age smallint
CHECK (age >= 0 AND age <= 120);
