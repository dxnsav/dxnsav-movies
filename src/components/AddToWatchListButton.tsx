import { CheckIcon, PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils.ts'
import { supabase } from '../supabase/supaClient';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

type Props = {
	className: string;
	isAdded: boolean;
	movie_id: number;
}

export const AddToWatchListButton = ({ className, isAdded = false, movie_id }: Props) => {
	const [isInWatchlist, setIsInWatchlist] = useState(isAdded);
	const user_id = useAuth().user?.id;

	const handleAddToWatchlist = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();

		if (isInWatchlist) {
			const { error } = await supabase
				.from('watch_list')
				.delete()
				.match({ movie_id, user_id });

			if (error) {
				console.error('Error removing from watchlist:', error);
			} else {
				setIsInWatchlist(false);
			}
		} else {
			const { error } = await supabase
				.from('watch_list')
				.insert([{ movie_id, user_id }]);

			if (error) {
				console.error('Error adding to watchlist:', error);
			} else {
				setIsInWatchlist(true);
			}
		}
	};
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button className={cn("w-10 h-10 p-0 rounded-full border-2", className)} onClick={(event) => handleAddToWatchlist(event)} variant="outline">
						{isInWatchlist ? <CheckIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
					</Button>
				</TooltipTrigger>
				<TooltipContent className="bg-secondary">
					<p>{isInWatchlist ? 'Видалити із списку' : 'Додати у список'}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}