import { IMovie } from "@/types/movie";
import create from "zustand";

import { supabase } from "../supabase/supaClient";

type SimilarMoviesStore = {
	fetchSimilarMovies: (movieId: number) => Promise<void>;
	similarMovies: IMovie[];
};

export const useSimilarMoviesStore = create<SimilarMoviesStore>((set) => ({
	fetchSimilarMovies: async (movieId) => {
		try {
			const { data: currentMovieData, error: currentMovieError } =
				await supabase
					.from("movie")
					.select("genres, roles")
					.eq("id", movieId)
					.single();

			if (!currentMovieData || currentMovieError) throw new Error("Movie not found");

			const { data, error } = await supabase
				.from("movie")
				.select("*")
				.neq("id", movieId)
				.containedBy("genres", currentMovieData.genres)
				.limit(10);
			//.in('roles', currentMovieData.roles)

			if (error) {
				throw new Error(error.message);
			}

			if (data) {
				set({ similarMovies: data });
			}
		} catch (error) {
			console.error("Error fetching similar movies:", error);
		}
	},
	similarMovies: [],
}));
