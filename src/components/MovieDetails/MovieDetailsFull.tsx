import { IMovie } from '@/types/movie';
import { FC, RefObject } from 'react';

import { MovieDetailsBlock } from "./MovieDetailsBlock";
import { SoundQualityBadge } from './MovieDetailsUtils';

interface MovieDetailsFullProps {
	detilsRef: RefObject<HTMLDivElement>;
	movie: IMovie;
}


export const MovieDetailsFull = ({ detailsRef, movie }: MovieDetailsFullProps): FC => {
	return (
		<div className="flex flex-col gap-1 m-6" ref={detailsRef}>
			<h3 className="text-lg font-semibold">{movie.title}: відомості</h3>
			<MovieDetailsBlock content={movie.roles} isFull title="В ролях" />
			<MovieDetailsBlock content={movie.genres} isFull title="Жанри" />
			<div className="flex">
				<h3 className="text-sm text-muted-foreground mr-2 whitespace-nowrap">
					Вікова категорія:
				</h3>
				<AgeRestriction
					data={{
						age: movie.age_restriction,
						details: movie.age_restriction_details,
					}}
					style
				/>
			</div>
			<div className="flex">
				<h3 className="text-sm text-muted-foreground mr-2 whitespace-nowrap">
					Озвучення:
				</h3>
				<div className="text-sm flex flex-row gap-2">
					{movie.sound.map((sound, index) => (
						<React.Fragment key={index}>
							<SoundQualityBadge quality={sound.soundType} />
							{sound.soundProd}
						</React.Fragment>
					))}
				</div>
			</div>
			{movie.subttitles ? (
				<div className="flex">
					<h3 className="text-sm text-muted-foreground mr-2 whitespace-nowrap">
						Субтитри:
					</h3>
					<p className="text-sm">{movie.subtitles}</p>
				</div>
			) : null}
		</div>
	);
}