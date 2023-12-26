import { useDrawerStore } from "@/hooks/useDrawerStore";
import { formatDuration } from "@/lib/formatDuration";
import { IMovie } from "@/types/movie";
import { PlayIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

import { AddToWatchListButton } from "../AddToWatchListButton";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { AgeRestriction } from "./MovieDetailsUtils";
import { MovieNewTag } from "./MovieDetailsUtils";

interface IMovieDetails extends IMovie {
	isAdded?: boolean;
	matchPercentage?: number;
	onStateChange?: () => void;
	scroll?: () => void;
	seasons?: number;
}

interface IMovieDetailsCardProps {
	isMain?: boolean;
	movie: IMovieDetails;
}

export const MovieDetailsCard: FC<IMovieDetailsCardProps> = ({ isMain, movie }) => {
	const {
		age_restriction,
		age_restriction_details,
		backdrop,
		description: overview,
		duration,
		id,
		isAdded,
		matchPercentage,
		movie_backdrop,
		onStateChange,
		release_year: releaseYear,
		scroll: scrollToPlayer,
		seasons,
		title,
	} = movie;

	const navigate = useNavigate();
	const { onOpenChange } = useDrawerStore();

	const handleMovieDetailsCardClick = () => {
		if (isMain) {
			onOpenChange(true);
			navigate(`/details`, { state: { movie } });
		} else {
			const dataToProvide = { ...movie };
			delete dataToProvide.scroll;
			delete dataToProvide.onStateChange;

			scrollToPlayer();
			navigate(`/details`, { state: { movie: dataToProvide } });
			onStateChange();
		}
	}


	const movieBackdrop = backdrop || movie_backdrop;
	const isRecent = new Date().getFullYear() - releaseYear < 1;
	//const backdropPath = "https://image.tmdb.org/t/p/w500" + backdrop_path;
	//const posterPath = "https://eneyida.tv" + poster;
	const ageRating = {
		age: age_restriction,
		details: age_restriction_details,
	};


	return (
		<Card className="relative cursor-pointer group w-[320px]" onClick={() => handleMovieDetailsCardClick()}>
			<CardHeader className="relative w-full p-0">
				<img
					alt={title}
					className="w-full ratio-16/9 brightness-[70%] rounded-t-md"
					src={movieBackdrop}
				/>
				<PlayIcon className="absolute w-12 h-12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100" />
				{isRecent && <MovieNewTag />}
				<div className="absolute top-0 right-0 font-semibold text-foreground px-4 py-2">
					{duration ? formatDuration(duration) : seasons}
				</div>
			</CardHeader>
			<CardContent className="px-6 py-4 flex flex-row justify-between bg-zinc-900">
				<div className="flex flex-col gap-2">
					{matchPercentage ? <h4 className="font-semibold text-sm text-green-400">Співпадіння: {matchPercentage}%</h4> : null}
					<div className="flex flex-row gap-2 items-center">
						<AgeRestriction
							data={ageRating}
						/>
						<p className="text-sm">{releaseYear}</p>
					</div>
				</div>
				<div className="flex flex-col items-center">
					<AddToWatchListButton className="w-8 h-8" id={id} isAdded={isAdded} />
				</div>
			</CardContent>
			<CardFooter className="px-6 pb-2 bg-zinc-900 flex flex-col items-start">
				<p className="text-sm font-bold">{title}</p>
				<p className="text-sm">{overview?.substring(0, 150) + "..."}</p>
			</CardFooter>
		</Card>
	);
};

