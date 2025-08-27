ALTER TABLE user_notification_subscriptions 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

ALTER TABLE user_notification_subscriptions 
ADD COLUMN IF NOT EXISTS last_notification_sent_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS marketing_emails BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS notifications BOOLEAN DEFAULT FALSE;