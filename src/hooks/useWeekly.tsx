import { supabase } from "@/supabase/supaClient";
import { IMovie } from "@/types/movie";
import create from 'zustand';

type State = {
	fetchWeeklyMovies: () => Promise<void>;
	fetchWeeklySerials: () => Promise<void>;
	weeklyMovies: IMovie[];
	weeklySerials: IMovie[];
};

export const useWeekly = create<State>((set) => ({
	fetchWeeklyMovies: async () => {
		const { data: movies } = await supabase.from('weekly_movies').select('*');
		set({ weeklyMovies: movies });
	},
	fetchWeeklySerials: async () => {
		const { data: serials } = await supabase.from('weekly_serials').select('*');
		set({ weeklySerials: serials });
	},
	weeklyMovies: [],
	weeklySerials: []
}));