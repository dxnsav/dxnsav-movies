import { supabase } from '@/supabase/supaClient';
import create from 'zustand';

interface WatchListStore {
	addToWatchList: (id: number, user_id: number) => Promise<void>;
	areInWatchList: (ids: number[], user_id: number) => Promise<void>;
	isInWatchList: (id: number, user_id: number) => Promise<void>;
	removeFromWatchList: (id: number, user_id: number) => Promise<void>;
	watchList: Set<number>;
}

export const useWatchListStore = create<WatchListStore>((set) => ({
	addToWatchList: async (id, user_id) => {
		const { error } = await supabase
			.from('watch_list')
			.insert([{ id, user_id }]);

		if (error) {
			console.error('Error adding to watchlist:', error);
		} else {
			set({ isInWatchList: true });
		}
	},
	areInWatchList: async (ids, user_id) => {
		const { data, error } = await supabase
			.from('watch_list')
			.select('id')
			.in('id', ids)
			.eq('user_id', user_id);

		if (error) {
			console.error('Error fetching from watchlist:', error);
		} else {
			const watchList = new Set(data.map(({ id }) => id));
			set({ watchList });
		}
	},
	isInWatchList: async (id, user_id) => {
		const { data, error } = await supabase
			.from('watch_list')
			.select('id')
			.eq('user_id', user_id);

		if (error) {
			console.error('Error fetching from watchlist:', error);
		} else {
			const watchList = new Set(data.map(({ id }) => id));
			set({ watchList });
		}
	},
	removeFromWatchList: async (id, user_id) => {
		const { error } = await supabase
			.from('watch_list')
			.delete()
			.match({ id, user_id });

		if (error) {
			console.error('Error removing from watchlist:', error);
		} else {
			set({ isInWatchList: false });
		}
	},
	watchList: new Set<number>()
}));
