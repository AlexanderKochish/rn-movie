CREATE POLICY "Users can manage their newsletter subscriptions" 
ON newsletter_subscribers 
FOR ALL 
TO authenticated 
USING (
  email = (SELECT email FROM profiles WHERE id = auth.uid())
)
WITH CHECK (
  email = (SELECT email FROM profiles WHERE id = auth.uid())
);

CREATE POLICY "Service role full access" 
ON newsletter_subscribers 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);