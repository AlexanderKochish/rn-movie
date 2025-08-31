import { getMoviesByName } from "@/src/shared/api";
import { useDebounce } from "@/src/shared/hooks/useDebounce";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  searchSchema,
  searchSchemaType,
} from "../../search/lib/zod/search.schema";
import { useInfiniteMovies } from "./useInfiniteMovies";

export const useSearchMovies = () => {
  const { control, watch, reset } = useForm<searchSchemaType>({
    defaultValues: {
      search: "",
    },
    resolver: zodResolver(searchSchema),
  });
  const search = watch("search");
  const debounceValue = useDebounce(search);

  const { data: movies, ...rest } = useInfiniteMovies({
    queryKey: ["search-movies", debounceValue],
    fetchFunction: (page: number) => getMoviesByName(debounceValue, page),
    enabled: !!debounceValue.trim(),
  });

  return {
    movies: movies?.pages.flatMap((page) => page.results) || [],
    control,
    search,
    reset,
    ...rest,
  };
};
