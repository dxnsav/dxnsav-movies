import { IMovie } from "@/types/movie";
import create from "zustand";

import { supabase } from "../supabase/supaClient";

interface ISimilarMovie extends IMovie {
	similarity: number;
}

type SimilarMoviesStore = {
	fetchSimilarMovies: (movieId: number) => Promise<void>;
	similarMovies: ISimilarMovie[];
};

export const useSimilarMoviesStore = create<SimilarMoviesStore>((set) => ({
	fetchSimilarMovies: async (embedding, excludeId) => {
		try {
			const { data: similarMovies, error } = await supabase.rpc('match_similarity', {
				exclude_id: excludeId, // Exclude the embedding you want to compare
				match_count: 10, // Choose the number of matches
				match_threshold: 0.97, // Choose an appropriate threshold for your data
				query_embedding: embedding, // Pass the embedding you want to compare
			});

			if (error) {
				throw new Error(error.message);
			}

			if (similarMovies) {
				set({ similarMovies });
			}
		} catch (error) {
			console.error("Error fetching similar movies:", error);
		}
	},
	similarMovies: [],
}));
