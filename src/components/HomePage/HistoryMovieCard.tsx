import { useDrawerStore } from "@/hooks/useDrawerStore";
import { IMovie } from "@/types/movie";
import { useNavigate } from "react-router-dom";

import { MovieNewTag } from "../MovieDetails/MovieDetailsUtils";
import { AspectRatio } from "../ui/aspect-ratio";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";

interface IHistoryMovie extends IMovie {
	isAdded?: boolean;
	matchPercentage?: number;
	onStateChange?: () => void;
	playerTime?: number;
	scroll?: () => void;
	seasons?: number;
}

interface IHistoryMovieCardProps {
	isMain?: boolean;
	movie: IHistoryMovie;
	onStateChange?: () => void;
	scrollToPlayer?: () => void;
}

export const HistoryMovieCard: FC<IHistoryMovieCardProps> = ({ isMain, movie, onStateChange, scrollToPlayer }) => {
	const {
		release_year: releaseYear,
		title
	} = movie || {};

	const navigate = useNavigate();
	const { onOpenChange } = useDrawerStore();

	const handleHistoryMovieCardClick = () => {
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

	const isRecent = new Date().getFullYear() - releaseYear < 1;

	const calcProgress = () => {
		const progress = movie.playerTime / movie.duration;
		return progress * 100;
	}

	const Bbackdrop = "https://image.tmdb.org/t/p/w500/6uEGQvlfel4E1TSFXMpr8i5Rux7.jpg"

	console.log(movie);

	return (
		<div className="flex flex-col w-[30%] gap-2 max-w-[240px]">
			<Card className="relative cursor-pointer group w-full" key={`movie-details-card-mob-${movie.id}`} onClick={() => handleHistoryMovieCardClick()}>
				<AspectRatio ratio={16 / 9} >
					<img
						alt={title}
						className="object-cover brightness-[70%] rounded-t-md h-full w-auto"
						src={Bbackdrop}
					/>
				</AspectRatio>
				{isRecent && <MovieNewTag className="text-xs text-center" />}
			</Card>
			<div className="w-[70%] mx-auto">
				<Progress className="w-full bg-secondary h-1.5" value={calcProgress()} />
			</div>
		</div>
	);
};

