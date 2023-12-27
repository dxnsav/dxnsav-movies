//import { useWatchListStore } from '@/hooks/useWatchListStore.tsx';
import { CheckIcon, PlusIcon } from '@radix-ui/react-icons';
import { FC, /*useEffect*/ } from 'react';

// import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils.ts';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface AddToWatchListButtonProps {
	className: string;
	id: number;
	isAdded: boolean;
}

export const AddToWatchListButton = ({ className }: AddToWatchListButtonProps): FC => {
	//const user_id = useAuth().user?.id;
	const isInWatchList = false;
	//const isInWatchList = useWatchListStore(state => state.isInWatchList);
	//const watchList = useWatchListStore(state => state.watchList);

	/*useEffect(() => {
		isInWatchList(id, user_id);
	}, [isInWatchList, id, user_id]);
/** */
	const handleAddToWatchlist = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();

		/**if (watchList.has(id)) {
			await removeFromWatchList(id, user_id);
		} else {
			await addToWatchList(id, user_id)
		}/** */
	};

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button className={cn("w-10 h-10 p-0 rounded-full border-2", className)} onClick={(event) => handleAddToWatchlist(event)} variant="outline">
						{isInWatchList ? <CheckIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
					</Button>
				</TooltipTrigger>
				<TooltipContent className="bg-secondary">
					<p>{isInWatchList ? 'Видалити із списку' : 'Додати у список'}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}