import { formatDuration } from "@/lib/formatDuration.ts";
import { IMovie } from '@/types/movie';
import { FC, useEffect, useState } from 'react';

import { MovieDetailsBlock } from './MovieDetailsBlock';
import { AgeRestriction, NewMovieTag, PopularityTag, QualityBadge } from './MovieDetailsUtils';

interface MovieDetailsInfoProps {
	movie: IMovie;
	scrollToFullDetails: () => void;
}

export const MovieDetailsInfo = ({ movie, scrollToFullDetails }: MovieDetailsInfoProps): FC => {
	const [isRecent, setIsRecent] = useState<boolean>(false);

	useEffect(() => {
		setIsRecent(new Date().getFullYear() - movie.release_year < 1);
	}, [movie]);

	return (
		<div className="flex flex-row portrait:flex-col m-6 justify-between gap-2">
			<h1 className="text-sm font-unbounded w-full landscape:hidden">
				{movie.title}
			</h1>
			<div className="flex flex-col w-full gap-3">
				<div className="flex flex-col w-full gap-3 portrait:flex-row portrait:gap-2">
					<div className="flex flex-row gap-2 items-center">
						{isRecent ? <NewMovieTag /> : null}
						<p>{movie.release_year}</p>
						<p>{formatDuration(movie.duration)}</p>
						<QualityBadge quality="HD" />
					</div>
					{(movie.age_restriction || movie.age_restriction_details) && (
						<AgeRestriction
							data={{
								age: movie.age_restriction,
								details: movie.age_restriction_details,
							}}
							isShort
						/>
					)}
				</div>
				<div className="flex flex-row gap-2 items-center">
					<PopularityTag movie_type={movie.movie_type} rating="1" />
				</div>
				<p className="my-4 text-sm">{movie.description}</p>
			</div>
			<div className="flex flex-col">
				<MovieDetailsBlock
					content={movie.roles}
					onMoreClick={scrollToFullDetails}
					title="В ролях"
				/>
				<MovieDetailsBlock
					content={movie.genres}
					onMoreClick={scrollToFullDetails}
					title="Жанри"
				/>
			</div>
		</div>
	);
}