import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { movieRepository } from "../api/movie.api";
import { MoviesCategories, MoviesResponse } from "../types/types";

export const useMoviesByCategory = () => {
    const [selectedCategory, setSelectedCategory] = useState<MoviesCategories>(
        "upcoming",
    );

    const categories = [
        { id: "upcoming", name: "Coming Soon", icon: "calendar" },
        { id: "now_playing", name: "In Theaters", icon: "film" },
        { id: "popular", name: "Popular", icon: "trending-up" },
        { id: "top_rated", name: "Top Rated", icon: "star" },
    ];

    const { data, ...rest } = useQuery<MoviesResponse, Error>({
        queryKey: ["movies-by-category", selectedCategory],
        queryFn: () => movieRepository.getMoviesByCategory(selectedCategory),
        enabled: !!selectedCategory,
        retry: false,
    });

    return {
        data: data?.results,
        categories,
        selectedCategory,
        setSelectedCategory,
        ...rest,
    };
};
