import { useEffect, useRef } from "react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { MovieDetailsFull } from "./MovieDetailsFull";
import { MovieDetailsInfo } from "./MovieDetailsInfo";
import { MovieDetailsPlayer } from "./MovieDetailsPlayer";
import { MovieDetailsSimilar } from "./MovieDetailsSimilar";

const MovieDetails = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const playerRef = useRef<HTMLDivElement>(null);
	const detailsRef = useRef<HTMLDivElement>(null);
	const playButtonRef = useRef<HTMLDivElement>(null);

	const movie = location?.state?.movie || null;

	useEffect(() => {
		if (!movie) {
			navigate("/");
		}
	}, [movie, navigate]);

	useEffect(() => {
		if (playButtonRef.current) playButtonRef.current.focus();
	});

	const scrollToFullDetails = () => {
		detailsRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};

	return (
		<ScrollArea className="w-full rounded-md h-[90vh]" type="scroll">
			<ScrollBar orientation="vertical" />
			{movie && (
				<>
					<MovieDetailsPlayer movie={movie} navigate={navigate} playButtonRef={playButtonRef} playerRef={playerRef} />
					<MovieDetailsInfo movie={movie} scrollToFullDetails={scrollToFullDetails} />
					<MovieDetailsSimilar movie={movie} playerRef={playerRef} />
					<MovieDetailsFull detailsRef={detailsRef} movie={movie} />
				</>
			)}
		</ScrollArea>
	);
};

export default MovieDetails;
