import { useWeekly } from '@/hooks/useWeekly'
import React, { FC, useEffect } from 'react'

import MovieVideo from '../MovieBg'
import { MovieDetailsCard } from '../MovieDetails/MovieDetailsCard'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'

const HomePage = (): FC => {
	const fetchWeeklyMovies = useWeekly(state => state.fetchWeeklyMovies);
	const weeklyMovies = useWeekly(state => state.weeklyMovies);

	const fetchWeeklySerials = useWeekly(state => state.fetchWeeklySerials);
	const weeklySerials = useWeekly(state => state.weeklySerials);

	useEffect(() => {
		fetchWeeklyMovies();
		fetchWeeklySerials();
	}, [fetchWeeklyMovies, fetchWeeklySerials]);

	return (
		<div className="p-5 lg:p-0">
			<MovieVideo data={weeklyMovies[0]} />
			<h1 className="text-3xl font-bold my-4">Фільми тижня</h1>
			{weeklyMovies.length ? <Carousel className='w-full'>
				<CarouselContent>
					{weeklyMovies.map((_, index) => (
						<CarouselItem className='md:basis-1/2 lg:basis-1/3' key={index}>
							<div className='p-1'>
								<MovieDetailsCard
									key={index}
									movie={_} />
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel> : null}
			<h1 className="text-3xl font-bold my-4">Популярні серіали</h1>
			{weeklySerials.length ? <Carousel className='w-full'>
				<CarouselContent>
					{weeklySerials.map((_, index) => (
						<CarouselItem className='md:basis-1/2 lg:basis-1/3' key={index}>
							<div className='p-1'>
								<MovieDetailsCard
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
		</div>
	)
}

export default HomePage