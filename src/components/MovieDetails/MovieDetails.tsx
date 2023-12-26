import { useAuth } from "@/hooks/useAuth";
import { useDrawerStore } from "@/hooks/useDrawerStore";
import { formatDuration } from "@/lib/formatDuration.ts";
import { supabase } from "@/supabase/supaClient";
import {
	ArrowLeftIcon,
	Cross2Icon,
	PlayIcon,
	RocketIcon,
	SpeakerLoudIcon,
	SpeakerOffIcon,
} from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import React from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";

import { AddToWatchListButton } from "../AddToWatchListButton";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { MovieDetailsBlock } from "./MovieDetailsBlock";
import { MovieDetailsCard } from "./MovieDetailsCard";
import { AgeRestriction, NewMovieTag, PopularityTag, QualityBadge, SoundQualityBadge } from "./MovieDetailsUtils";

const MovieDetails = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { movie } = location.state;
	const [muted, setMuted] = useState(true);
	const userId = useAuth().user?.id;
	const [isInWatchlist, setIsInWatchlist] = useState(false);
	const [similarMovies, setSimilarMovies] = useState([]);
	const playerRef = useRef(null);
	const detailsRef = useRef(null);
	const playButtonRef = useRef(null);
	const { onOpenChange } = useDrawerStore();
	const isRecent = new Date().getFullYear() - movie.release_year < 1;

	const checkWatchlist = async () => {
		const { data, error } = await supabase
			.from("watch_list")
			.select("*")
			.eq("id", movie.id)
			.eq("user_id", userId)
			.single();

		if (error) {
			return;
		}
		setIsInWatchlist(!!data);
	};

	useEffect(() => {
		if (userId && movie.id)
			checkWatchlist();

		if (playButtonRef.current)
			playButtonRef.current.focus();
	})

	useEffect(() => {
		const fetchData = async () => {
			const { data: preFilterData, error } = await supabase
				.from("movie")
				.select("*")
				.neq("id", movie.id)
				.limit(11)
				.order("id", { ascending: true });

			if (error) {
				console.error("Error fetching movie:", error);
				return;
			}

			// check if movie is recomended the same as is on page and return only 10
			const data = preFilterData.filter(movie => movie.id !== movie.id);
			if (data.length > 10) {
				data.length = 10;
			}

			const movieIds = data.map((movie) => movie.id);

			const { data: watchlistSimilarMovies, error: watchlistSimilarMoviesError } = await supabase
				.from('watch_list')
				.select('id')
				.in('id', movieIds)
				.eq('user_id', userId);

			if (watchlistSimilarMoviesError) {
				console.error('Error fetching watchlist movies:', error);
				return;
			}

			const { data: similarMoviesData, error: similarMoviesError } =
				await supabase
					.from("movie")
					.select("*")
					.in("id", movieIds);

			if (similarMoviesError) {
				console.error("Error fetching movie:", similarMoviesError);
				return;
			}

			const fullData = similarMoviesData.map((movie) => {
				const movieData = {
					...data.find((dataMovie) => dataMovie.id === movie.id),
					...movie,
					isAdded: !!watchlistSimilarMovies.find((watchlistMovie) => watchlistMovie.id === movie.id),
				};
				return movieData;
			});

			setSimilarMovies(fullData);
		};

		fetchData();
	}, [userId, movie.id]);


	const onStateChange = () => {
		checkWatchlist();
	}

	const handlePlay = () => {
		navigate(`/watch`, { state: { movie } });
	};

	const handleMute = () => {
		setMuted(!muted);
	};

	const scrollToPlayer = () => {
		playerRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	};

	const scrollToFullDetails = () => {
		detailsRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	}

	const handleClose = () => {
		onOpenChange(false);
	}

	return (
		<ScrollArea className="w-full rounded-md h-[90vh]" type="scroll">
			<ScrollBar orientation="vertical" />
			<div className="w-full min-h-max object-cover rounded-t-lg relative shadow-md" ref={playerRef}>
				<div className="mx-auto absolute w-12 h-1.5 flex-shrink-0 rounded-full bg-white z-20 top-4 left-0 right-0 m-auto" />
				<Button
					className="absolute left-4 rounded-full z-50 top-8"
					onClick={() => navigate("/search", { state: { movie } })}
					size="icon"
					variant="secondary"
				>
					<ArrowLeftIcon className="w-6 h-6" />
				</Button>
				<Button
					className="absolute right-4 rounded-full z-50 top-8"
					onClick={() => handleClose()}
					size="icon"
					variant="secondary"
				>
					<Cross2Icon className="w-6 h-6" />
				</Button>
				<ReactPlayer
					className="react-player"
					fallback={
						<img alt={movie.title} src={movie.trailer_backdrop} />
					}
					file={{
						forceHLS: true,
					}}
					height="100%"
					loop={true}
					muted={muted}
					playing={true}
					props={{ playsinline: true }}
					url={movie.trailer_url}
					width="100%"
				/>
				<div className="absolute w-full mx-auto bottom-[10%] px-4 z-50 portrait:hidden">
					<div className="w-full flex flex-col justify-center">
						<h1 className="text-[2em] font-unbounded w-[60%]">{movie.title}</h1>
					</div>
					<div className="flex flex-row justify-between w-full items-center">
						<div className="flex flex-col gap-x-3 mt-4">
							<div className="flex gap-x-3 mt-4 items-center">
								<Button
									className="bg-foreground text-background h-8 hover:bg-foreground hover:brightness-90"
									onClick={() => handlePlay()}
									ref={playButtonRef}
									variant="default"
								>
									<PlayIcon className="w-5 h-5 mr-2" />
									Дивитись
								</Button>
								<AddToWatchListButton
									id={movie.id}
									isAdded={isInWatchlist}
								/>
								<Button
									className="w-10 h-10 p-0 rounded-full border-2"
									variant="outline"
								>
									<RocketIcon className="w-5 h-5" />
								</Button>
							</div>
						</div>
						<div className="flex flex-col gap-x-3 mt-4">
							<div className="flex gap-x-3 mt-4">
								<Button
									className="w-10 h-10 p-0 rounded-full opacity-60 hover:opacity-100"
									onClick={() => handleMute()}
									variant="outline"
								>
									{muted ? (
										<SpeakerLoudIcon className="w-5 h-5" />
									) : (
										<SpeakerOffIcon className="w-5 h-5" />
									)}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-row portrait:flex-col m-6 justify-between gap-2">
				<h1 className="text-sm font-unbounded w-full landscape:hidden">{movie.title}</h1>
				<div className="flex flex-col w-full gap-3">
					<div className="flex flex-col w-full gap-3 portrait:flex-row portrait:gap-2">
						<div className="flex flex-row gap-2 items-center">
							{isRecent ? <NewMovieTag /> : null}
							<p>{movie.release_year}</p>
							<p>{formatDuration(movie.duration)}</p>
							<QualityBadge quality="HD" />
						</div>
						{(movie.age_restriction || movie.age_restriction_details) &&
							<AgeRestriction
								data={{ age: movie.age_restriction, details: movie.age_restriction_details }}
								isShort
							/>
						}

					</div>
					<div className="flex flex-row gap-2 items-center">
						<PopularityTag movie_type={movie.movie_type} rating="1" />
					</div>
					<p className="my-4 text-sm">{movie.description}</p>
				</div>
				<div className="flex flex-col">
					<MovieDetailsBlock content={movie.roles} onMoreClick={scrollToFullDetails} title="В ролях" />
					<MovieDetailsBlock content={movie.genres} onMoreClick={scrollToFullDetails} title="Жанри" />
				</div>
			</div>

			<div className="flex flex-col gap-4 m-6">
				<h3 className="text-lg font-semibold">Схожі</h3>
				<div className="grid xs:grid-cols-1 sm:grid-cols-2 landscape:grid-cols-3 gap-4 overflow-x-auto">
					{similarMovies.map((_, index) => (
						<MovieDetailsCard
							ageRating="16"
							duration={141}
							key={index}
							matchPercentage="98"
							onStateChange={onStateChange}
							scroll={scrollToPlayer}
							{..._}
						/>
					))}
				</div>
			</div>
			<div className="flex flex-col gap-1 m-6" ref={detailsRef}>
				<h3 className="text-lg font-semibold">{movie.title}: відомості</h3>
				<MovieDetailsBlock content={movie.roles} isFull title="В ролях" />
				<MovieDetailsBlock content={movie.genres} isFull title="Жанри" />
				<div className="flex">
					<h3 className="text-sm text-muted-foreground mr-2 whitespace-nowrap">
						Вікова категорія:
					</h3>
					<AgeRestriction
						data={{ age: movie.age_restriction, details: movie.age_restriction_details }}
						style
					/>
				</div>
				<div className="flex">
					<h3 className="text-sm text-muted-foreground mr-2 whitespace-nowrap">
						Озвучення:
					</h3>
					<p className="text-sm flex flex-row gap-2">
						{movie.sound.map((sound, index) => (
							<React.Fragment key={index}>
								<SoundQualityBadge quality={sound.soundType} />
								{sound.soundProd}
							</React.Fragment>
						))}
					</p>
				</div>
				{movie.subttitles ? (<div className="flex">
					<h3 className="text-sm text-muted-foreground mr-2 whitespace-nowrap">
						Субтитри:
					</h3>
					<p className="text-sm">
						{movie.subtitles}
					</p>
				</div>) : null}
			</div>
		</ScrollArea>
	);
};

export default MovieDetails;
