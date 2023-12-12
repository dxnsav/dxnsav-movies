import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AddToWatchListButton } from "../AddToWatchListButton.tsx";
import { Button } from "../ui/button.tsx";
import { Skeleton } from "../ui/skeleton.tsx";

export const MovieHorizontalCard = (movie) => {
	const { id, overview, poster_path, title, } = movie.movie;
	const posterPath = "https://image.tmdb.org/t/p/w500" + poster_path;
	const navigate = useNavigate();

	const description =
		overview.length > 100 ? overview.substring(0, 100) + "..." : overview;

	const handleOpenMovieDetails = () => {
		navigate(`/details`, { state: { movie: movie.movie } });
	}

	// TODO: get setted to watchlist in searchContent and provide here data

	return (
		<div className="flex flex-row gap-2 items-center" key={id}>
			<div className="w-32 flex-shrink-0">
				<img alt={title} className="rounded-sm object-cover" src={posterPath} />
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
					<AddToWatchListButton movie={id} />
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
