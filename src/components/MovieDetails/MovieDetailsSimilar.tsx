import { useSimilarMoviesStore } from "@/store/similarMovies";
import { FC, RefObject, useEffect } from "react";

import { MovieDetailsCard } from "./MovieDetailsCard";
import { MovieDetailsCardMobile } from "./MovieDetailsCardMobile";

interface MovieDetailsSimilarProps {
	id: number;
	playerRef: RefObject<HTMLDivElement>;
}

export const MovieDetailsSimilar = ({ id, playerRef }: MovieDetailsSimilarProps): FC => {
	const similarMovies = useSimilarMoviesStore((state) => state.similarMovies);
	const fetchSimilarMovies = useSimilarMoviesStore(
		(state) => state.fetchSimilarMovies,
	);

	const scrollToPlayer = () => {
		playerRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};


	useEffect(() => {
		if (id) fetchSimilarMovies(id);
	}, [id, fetchSimilarMovies]);

	return (
		<div className="flex flex-col gap-4 m-6">
			<h3 className="text-lg font-semibold">Схожі</h3>
			<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-x-auto portrait:hidden">
				{similarMovies.map((_) => (
					<MovieDetailsCard
						movie={_}
						onStateChange={onStateChange}
						scroll={scrollToPlayer}
					/>
				))}
			</div>
			<div className="grid portrait:grid-cols-3 overflow-x-auto landscape:hidden gap-2">
				{similarMovies.map((_) => (
					<MovieDetailsCardMobile
						movie={_}
						onStateChange={onStateChange}
						scroll={scrollToPlayer}
					/>
				))}
			</div>
		</div>
	);
}