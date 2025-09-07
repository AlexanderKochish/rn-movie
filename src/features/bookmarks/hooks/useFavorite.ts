import { useCollection } from "../../bookmarks/hooks/useCollection";

export const useFavorite = () => useCollection("liked_movies");
