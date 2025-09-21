export type ProfileType = {
  id: string;
  email: string;
  username: string;
  full_name: string;
  age: number;
  avatar_url: string;
  terms_accepted: boolean;
  terms_accepted_at: Date;
  terms_version: string;
  created_at: Date;
};

export type ProfileStats = {
  liked_movies: number | null;
  bookmarks: number | null;
  ratings: number | null;
  watched: number | null;
};

export type ProfileUpdate = Partial<{
  username: string;
  full_name: string;
  age: number;
  avatar_url: string;
}>;

export type ProfileNotificationPreferences = {
  marketing_emails: boolean;
  notifications: boolean;
  expo_push_token: string | null;
};
