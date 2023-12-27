import { useDrawerStore } from "@/hooks/useDrawerStore";
import { IMovie } from "@/types/movie";
import { useNavigate } from "react-router-dom";

import { AspectRatio } from "../ui/aspect-ratio";
import { Card } from "../ui/card";
import { MovieNewTag } from "./MovieDetailsUtils";

interface IMovieDetails extends IMovie {
	isAdded?: boolean;
	matchPercentage?: number;
	onStateChange?: () => void;
	scroll?: () => void;
	seasons?: number;
}

interface IMovieDetailsCardMobileProps {
	isMain?: boolean;
	movie: IMovieDetails;
	onStateChange?: () => void;
	scrollToPlayer?: () => void;
}

export const MovieDetailsCardMobile: FC<IMovieDetailsCardMobileProps> = ({ isMain, movie, onStateChange, scrollToPlayer }) => {
	const {
		poster,
		release_year: releaseYear,
		title
	} = movie || {};

	const posterPath = "https://eneyida.tv" + poster;

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

	const isRecent = new Date().getFullYear() - releaseYear < 1;

	return (
		<Card className="relative cursor-pointer group w-full" key={`movie-details-card-mob-${movie.id}`} onClick={() => handleMovieDetailsCardClick()}>
			<AspectRatio ratio={9 / 16} >
				<img
					alt={title}
					className="object-cover brightness-[70%] rounded-t-md h-full w-auto"
					src={posterPath}
				/>
			</AspectRatio>
			{isRecent && <MovieNewTag className="text-xs text-center" />}
		</Card>
	);
};

