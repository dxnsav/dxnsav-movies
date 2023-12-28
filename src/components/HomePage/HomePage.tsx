import { useAuth } from '@/hooks/useAuth'
import { useWatchHistoryStore } from '@/hooks/useWatchHistory'
import { useWeekly } from '@/hooks/useWeekly'
import React, { FC, useEffect } from 'react'

import MovieVideo from '../MovieBg'
import { MovieDetailsCard } from '../MovieDetails/MovieDetailsCard'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { HistoryMovieCard } from './HistoryMovieCard'

const opts = {
	loop: true,
}

const HomePage = (): FC => {
	const fetchWeeklyMovies = useWeekly(state => state.fetchWeeklyMovies);
	const weeklyMovies = useWeekly(state => state.weeklyMovies);

	const fetchWeeklySerials = useWeekly(state => state.fetchWeeklySerials);
	const weeklySerials = useWeekly(state => state.weeklySerials);

	useEffect(() => {
		fetchWeeklyMovies();
		fetchWeeklySerials();
	}, [fetchWeeklyMovies, fetchWeeklySerials]);

	const watchHistory = useWatchHistoryStore(state => state.watchHistory);
	const fetchWatchHistory = useWatchHistoryStore(state => state.fetchWatchHistory);

	const userId = useAuth().user?.id;

	useEffect(() => {
		if (userId)
			fetchWatchHistory(userId);
	}, [fetchWatchHistory, userId]);

	const ContinueWatching = (): FC => (
		<>
			<div className="flex gap-3">
				{watchHistory?.map((_, index) => (
					<HistoryMovieCard key={index} movie={_} />
				))
				}
			</div>
		</>
	);

	return (
		<div className="p-5 lg:p-0">
			<MovieVideo data={weeklyMovies[0]} />
			<h1 className="text-2xl font-bold my-4">Продовжити дивитись</h1>
			<ContinueWatching />
			<h1 className="text-3xl font-bold my-4">Фільми тижня</h1>
			{weeklyMovies.length ? <Carousel className='w-full' opts={opts}>
				<CarouselContent>
					{weeklyMovies.map((_, index) => (
						<CarouselItem className='md:basis-1/2 lg:basis-1/4' key={index}>
							<div className='p-1'>
								<MovieDetailsCard

									isMain={true}
									key={index}
									movie={_}
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel> : null}
			<h1 className="text-3xl font-bold my-4">Популярні серіали</h1>
			{weeklySerials.length ? <Carousel className='w-full' opts={opts}>
				<CarouselContent>
					{weeklySerials.map((_, index) => (
						<CarouselItem className='md:basis-1/2 lg:basis-1/4' key={index}>
							<div className='p-1'>
								<MovieDetailsCard
									isMain={true}
									isSerial={true}
									key={index}
									movie={_}
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel> : null}

			<h1 className="text-3xl font-bold my-4">Новинки</h1>
			{/* картка новинок по дфеолту розміром як постер 3/2 на онХовер розтягється до 16/9 постер стає трейлером і показує баттонс звук детальніше та дивитись   */}
		</div>
	)
}

export default HomePage