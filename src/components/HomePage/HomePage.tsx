import { supabase } from '@/supabase/supaClient'
import React, { useEffect } from 'react'

import MovieVideo from '../MovieBg'
import { MovieDetailsCard } from '../MovieDetails/MovieDetailsCard'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'

const HomePage = () => {
	const [weeklyMovies, setWeeklyMovies] = React.useState([])
	const [weeklySerials, setWeeklySerials] = React.useState([])

	useEffect(() => {
		const fetchWeeklyMovies = async () => {
			const { data: movies } = await supabase.from('weekly_movies').select('*');
			setWeeklyMovies(movies);
		}

		fetchWeeklyMovies();
	}, [])

	useEffect(() => {
		const fetchWeeklySerials = async () => {
			const { data: serials } = await supabase.from('weekly_serials').select('*');
			setWeeklySerials(serials);
			console.log(serials)
		}

		fetchWeeklySerials();
	}, [])

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