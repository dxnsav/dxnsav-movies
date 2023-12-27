import { supabase } from '@/supabase/supaClient';
import create from 'zustand';

interface WatchListStore {
	addToWatchList: (id: number, user_id: number) => Promise<void>;
	areInWatchList: (ids: number[], user_id: number) => Promise<boolean[]>;
	getWatchList: (user_id: number) => Promise<void>;
	isInWatchList: (id: number, user_id: number) => Promise<boolean>;
	removeFromWatchList: (id: number, user_id: number) => Promise<void>;
	watchList: Set<number>;
}

export const useWatchListStore = create<WatchListStore>((set, get) => ({
	addToWatchList: async (id, user_id) => {
		const { error } = await supabase
			.from('watch_list')
			.insert([{ id, user_id }]);

		if (!error) {
			const updatedWatchList = new Set(get().watchList);
			updatedWatchList.add(id);
			set({ watchList: updatedWatchList });
		} else {
			console.error('Error adding to watchlist:', error);
		}
	},
	areInWatchList: async (ids, user_id) => {
		const currentWatchList = get().watchList;
		let result = ids.map(id => currentWatchList.has(id));

		if (result.some(isInList => !isInList)) {
			const { data, error } = await supabase
				.from('watch_list')
				.select('id')
				.in('id', ids)
				.eq('user_id', user_id);

			if (!error) {
				data.forEach(({ id }) => currentWatchList.add(id));
				result = ids.map(id => currentWatchList.has(id));
			} else {
				console.error('Error fetching from watchlist:', error);
			}
		}

		return result;
	},
	getWatchList: async (user_id) => {
		const { data, error } = await supabase
			.from('watch_list')
			.select('id')
			.eq('user_id', user_id);

		if (error) {
			console.error('Error fetching watchlist:', error);
		} else {
			const watchList = new Set(data.map(({ id }) => id));
			set({ watchList });
		}
	},
	isInWatchList: async (id, user_id) => {
		const currentWatchList = get().watchList;

		if (currentWatchList.has(id)) {
			return true;
		} else {
			const { data, error } = await supabase
				.from('watch_list')
				.select('id')
				.eq('id', id)
				.eq('user_id', user_id)
				.single();

			if (!error && data) {
				currentWatchList.add(id);
				return true;
			} else if (error) {
				console.error('Error checking watchlist:', error);
			}
			return false;
		}
	},
	removeFromWatchList: async (id, user_id) => {
		const { error } = await supabase
			.from('watch_list')
			.delete()
			.match({ id, user_id });

		if (!error) {
			const updatedWatchList = new Set(get().watchList);
			updatedWatchList.delete(id);
			set({ watchList: updatedWatchList });
		} else {
			console.error('Error removing from watchlist:', error);
		}
	},
}));
