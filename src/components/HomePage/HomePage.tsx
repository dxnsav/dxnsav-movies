import { supabase } from '@/supabase/supaClient'
import React, { useEffect } from 'react'

import MovieVideo from '../MovieBg'
import { MovieDetailsCard } from '../MovieDetails/MovieDetailsCard'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'


const HomePage = () => {
	const [weeklyMovies, setWeeklyMovies] = React.useState([])
	// call supabase to get weekly movies from db weekly_movies table in useEffect

	useEffect(() => {
		// fetch weekly movies from db
		const fetchWeeklyMovies = async () => {
			const { data: movies } = await supabase.from('weekly_movies').select('*');

			setWeeklyMovies(movies);
		}

		fetchWeeklyMovies();

	}, [])

	return (
		<div className="p-5 lg:p-0">
			<MovieVideo />
			<h1 className="text-3xl font-bold ">Нещодавно добавлені</h1>
			{weeklyMovies.length ? <Carousel className='w-full'>
				<CarouselContent>
					{weeklyMovies.map((_, index) => (
						<CarouselItem className='md:basis-1/2 lg:basis-1/3' key={index}>
							<div className='p-1'>
								<MovieDetailsCard
									ageRating="16"

									key={index}
									//matchPercentage="98"
									//onStateChange={onStateChange}
									//scroll={scrollToPlayer}
									{..._} />
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