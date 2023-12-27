import { IMovie } from "@/types/movie";
import { useNavigate } from "react-router-dom";

import { AddToWatchListButton } from "../AddToWatchListButton.tsx";
import { Button } from "../ui/button.tsx";
import { Skeleton } from "../ui/skeleton.tsx";

interface MovieHorizontalCardProps {
	movie: IMovie;
}

export const MovieHorizontalCard: React.FC<MovieHorizontalCardProps> = ({ movie }) => {
	const { description, id, poster, title } = movie;

	const posterPath = "https://eneyida.tv" + poster;
	const navigate = useNavigate();

	const overview =
		description?.length > 100 ? description.substring(0, 100) + "..." : description;

	const handleOpenMovieDetails = (e: React.MouseEvent<HTMLButtonElement>) => {
		navigate(`/details`, { state: { movie } });
		e.stopPropagation();
	}

	const handlePlayMovie = () => {
		navigate(`/watch`, { state: { movie } });
	}

	return (
		<div className="flex flex-row gap-2 items-center cursor-pointer" key={id} onClick={() => handlePlayMovie()}>
			<div className="w-32 flex-shrink-0">
				<img alt={title} className="rounded-sm object-cover" src={posterPath} />
			</div>
			<div className="flex flex-col justify-between w-full items-start h-[100%] ">
				<div className="text-lg font-bold text-white">{title}</div>
				<div className="text-sm text-white">{overview}</div>
				<div className="flex flex-row justify-start w-full items-center gap-2">
					<Button
						onClick={(e) => handleOpenMovieDetails(e)}
					>
						Детальніше
					</Button>
					<AddToWatchListButton movie={id} />
				</div>
			</div>
		</div >
	);
};

export const MovieSkeleton: React.FC = () => {
	return (
		<div className="flex flex-row gap-2 items-center">
			<Skeleton className="w-32 flex-shrink-0 h-[9rem] rounded-sm" />
			<div className="flex flex-col justify-between w-full items-start h-[100%]">
				<Skeleton className="h-6 w-3/4 rounded-md" />
				<Skeleton className="h-4 w-1/2 rounded-md" />
				<div className="flex flex-row justify-start w-full items-center">
					<Skeleton className="h-10 w-24 rounded-md" />
					<Skeleton className="h-10 w-24 rounded-md ml-2" />
				</div>
			</div>
		</div>
	);
}
