import { formatDuration } from "@/lib/formatDuration";
import { PlayIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

import { AddToWatchListButton } from "../AddToWatchListButton";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { AgeRestriction } from "./MovieDetailsUtils";
import { MovieNewTag } from "./MovieDetailsUtils";

export const MovieDetailsCard = (movie) => {
	const {
		ageRating,
		backdrop_path,
		duration,
		isAdded,
		matchPercentage,
		movie_id,
		onStateChange,
		overview,
		release_date,
		seasons,
		title,
	} = movie;

	const scrollToPlayer = movie.scroll;

	const navigate = useNavigate();

	const handleMovieDetailsCardClick = () => {
		const dataToProvide = { ...movie };
		delete dataToProvide.scroll;
		delete dataToProvide.onStateChange;

		scrollToPlayer();
		navigate(`/details`, { state: { movie: dataToProvide } });
		onStateChange();
	}

	const release_year = release_date.split("-")[0];

	const isRecent = new Date().getFullYear() - release_year < 2;

	const backdropPath = "https://image.tmdb.org/t/p/w500" + backdrop_path;

	// TODO: get setted to watchlist in searchContent and provide here data
	// TODO: make handle click on card excluding add to watchlist button

	return (
		<Card className="relative cursor-pointer group" onClick={() => handleMovieDetailsCardClick()}>
			<CardHeader className="relative w-full p-0">
				<img
					alt={title}
					className="w-full"
					src={backdropPath}
				/>
				<PlayIcon className="absolute w-12 h-12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100" />
				{isRecent && <MovieNewTag />}
				<div className="absolute top-0 right-0 font-semibold text-foreground px-4 py-2">
					{duration ? formatDuration(duration) : seasons}
				</div>
			</CardHeader>
			<CardContent className="px-6 py-4 flex flex-row justify-between bg-zinc-900">
				<div className="flex flex-col gap-2">
					<h4 className="font-semibold text-sm text-green-400">Співпадіння: {matchPercentage}%</h4>
					<div className="flex flex-row gap-2 items-center">
						<AgeRestriction
							data={{ age: ageRating }}
						/>
						<p className="text-sm">{release_year}</p>
					</div>
				</div>
				<div className="flex flex-col items-center">
					<AddToWatchListButton className="w-8 h-8" isAdded={isAdded} movie_id={movie_id} />
				</div>
			</CardContent>
			<CardFooter className="px-6 pb-2 bg-zinc-900 flex flex-col items-start">
				<p className="text-sm font-bold">{title}</p>
				<p className="text-sm">{overview.substring(0, 150) + "..."}</p>
			</CardFooter>
		</Card>
	);
};

