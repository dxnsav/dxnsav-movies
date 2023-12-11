import { Button } from "../ui/button.tsx";
import { Skeleton } from "../ui/skeleton.tsx";
import { useState } from "react";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

export const MovieHorizontalCard = (movie) => {
	const { id, title, overview, poster_path, } = movie.movie;
	const posterPath = "https://image.tmdb.org/t/p/w500" + poster_path;
	const [isLiked, setIsLiked] = useState(false);
	const navigate = useNavigate();

	const description =
		overview.length > 100 ? overview.substring(0, 100) + "..." : overview;

	const handleOpenMovieDetails = () => {
		navigate(`/details`, { state: { movie: movie.movie } });
	}

	return (
		<div className="flex flex-row gap-2 items-center" key={id}>
			<div className="w-32 flex-shrink-0">
				<img src={posterPath} alt={title} className="rounded-sm object-cover" />
			</div>
			<div className="flex flex-col justify-between w-full items-start h-[100%] ">
				<div className="text-lg font-bold text-white">{title}</div>
				<div className="text-sm text-white">{description}</div>
				<div className="flex flex-row justify-start w-full items-center">
					<Button
						onClick={() => handleOpenMovieDetails()}
					>
						Дивитись
					</Button>
					<Button variant="outline" onClick={() => setIsLiked(!isLiked)}>
						{isLiked ? (
							<HeartFilledIcon className="w-6" />
						) : (
							<HeartIcon className="w-6" />
						)}
					</Button>
				</div>
			</div>
		</div >
	);
};

export function MovieSkeleton() {
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
