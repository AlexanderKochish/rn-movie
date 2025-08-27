DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'reviews'
      AND policyname = 'reviews_select_own'
  ) THEN
    CREATE POLICY "reviews_select_own"
    ON public.reviews
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);
  END IF;
END
$$;
