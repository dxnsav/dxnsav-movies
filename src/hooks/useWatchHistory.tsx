import { supabase } from "@/supabase/supaClient";
import { IMovie } from "@/types/movie";
import create from "zustand";

interface IWatchHistoryMovie extends IMovie {
	playerTime: number;
}

type WatchHistoryStore = {
	fetchWatchHistory: (userId: string) => Promise<void>;
	watchHistory: IWatchHistoryMovie[];
};

export const useWatchHistoryStore = create<WatchHistoryStore>((set) => ({
	fetchWatchHistory: async (userId) => {
		try {
			const { data: watchHistory, error } = await supabase
				.from('watch_history')
				.select(`
                  movie_id,
                  timestamp,
									player_time,
                  movie!inner(*)
                `)
				.eq('user_id', userId)
				.order('timestamp', { ascending: false })
				.limit(3);

			if (error) {
				throw new Error(error.message);
			}

			if (watchHistory) {
				const watchHistoryWithPlayerTime = watchHistory.map((movie) => {
					const { player_time: playerTime } = movie;
					return { ...movie.movie, playerTime };
				});

				set({ watchHistory: watchHistoryWithPlayerTime });
			}
		} catch (error) {
			console.error("Error fetching watch history:", error);
		}
	},
	watchHistory: [],
}));
