import { useAuth } from "@/hooks/useAuth";
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
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";

import { AddToWatchListButton } from "../AddToWatchListButton";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { MovieDetailsBlock } from "./MovieDetailsBlock";
import { MovieDetailsCard } from "./MovieDetailsCard";
import { AgeRestriction, NewMovieTag, PopularityTag, QualityBadge } from "./MovieDetailsUtils";

const actors = [
	"Джулія Робертс",
	"Махершала Алі",
	"Ітан Гоук",
	"Додатковий актор",
];
const genres = ["Драматичні фільми", "Трилери", "Фільми на основі книг"];
const description = ["Лякаючий", "Зловісний"];

const MovieDetails = () => {
	const [watchData, setWatchData] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();
	const { movie } = location.state;
	const [muted, setMuted] = useState(true);
	const userId = useAuth().user?.id;
	const [isInWatchlist, setIsInWatchlist] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const { data, error } = await supabase
				.from("movie")
				.select("*")
				.eq("id", movie.movie_id)
				.single();

			if (error) {
				console.error("Error fetching movie:", error);
				return;
			}
			setWatchData(data);
		};

		if (movie.movie_id) {
			fetchData();
		}

		const checkWatchlist = async () => {
			if (movie.movie_id && userId) {
				const { data, error } = await supabase
					.from("watch_list")
					.select("*")
					.eq("movie_id", movie.movie_id)
					.eq("user_id", userId)
					.single();

				if (error) {
					return;
				}
				setIsInWatchlist(!!data);
			}
		};

		checkWatchlist();
	}, [movie.movie_id, userId]);

	if (!watchData) {
		return <div>Loading...</div>;
	}

	const handlePlay = () => {
		navigate(`/watch`, { state: { movie: { ...movie, ...watchData } } });
	};

	const handleMute = () => {
		setMuted(!muted);
	};

	const fullData = { ...movie, ...watchData };

	return (
		<>
			<div className="w-full h-fit object-cover rounded-t-lg relative shadow-md">
				<div className="mx-auto absolute w-12 h-1.5 flex-shrink-0 rounded-full bg-white z-20 top-4 left-0 right-0 m-auto" />
				<Button
					className="absolute left-4 rounded-full z-50 top-8"
					onClick={() => navigate("/search", { state: { title: movie.title } })}
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
						<img alt={watchData.title} src={fullData.poster_trailer_url} />
					}
					file={{
						forceHLS: true,
					}}
					height="100%"
					loop={true}
					muted={muted}
					playing={true}
					url={fullData.stream_trailer_url}
					width="100%"
				/>
				<div className="absolute w-full mx-auto bottom-[10%] px-4 z-50">
					<div className="w-full flex flex-col justify-center">
						<h1 className="text-[2em] font-unbounded w-[60%]">{movie.title}</h1>
					</div>
					<div className="flex flex-row justify-between w-full items-center">
						<div className="flex flex-col gap-x-3 mt-4">
							<div className="flex gap-x-3 mt-4 items-center">
								<Button
									className="bg-foreground text-background h-8 hover:bg-foreground hover:brightness-90"
									onClick={() => handlePlay()}
									variant="default"
								>
									<PlayIcon className="w-5 h-5 mr-2" />
									Дивитись
								</Button>
								<AddToWatchListButton
									isAdded={isInWatchlist}
									movie_id={movie.movie_id}
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

			<div className="flex flex-row m-6 justify-between gap-2">
				<div className="flex flex-col w-full gap-3">
					<div className="flex flex-row gap-2">
						<NewMovieTag />
						<p>{fullData.release_year}</p>
						<p>{formatDuration(fullData.duration)}</p>
						<QualityBadge quality="4K" />
					</div>
					<div className="flex flex-row gap-2 items-center">
						<AgeRestriction
							data={{ age: "16", details: "глядачам від 16 років" }}
						/>
					</div>
					<div className="flex flex-row gap-2 items-center">
						<PopularityTag rating="1" />
					</div>
					<p className="mt-4 text-sm">{fullData.overview}</p>
				</div>
				<div className="flex flex-col">
					<MovieDetailsBlock content={actors} isActors={true} title="В ролях" />
					<MovieDetailsBlock content={genres.join(", ")} title="Жанри" />
					<MovieDetailsBlock content={description.join(", ")} title="Про фільм" />
				</div>
			</div>

			<div className="flex flex-col gap-4 m-6">
				<h3 className="text-lg font-semibold">Схожі</h3>
				<ScrollArea className="w-full rounded-md pr-4 h-[55vh]">
					<div className="grid xs:grid-cols-1 sm:grid-cols-2 landscape:grid-cols-3 gap-4 overflow-x-auto">
						{[...Array(10)].map((_, index) => (
							<MovieDetailsCard
								ageRating="16"
								description="Сімейний відпочинок у розкішному орендованому особняку йде навперекій, коли кібератака відключає всі мобільні пристрої і на порозі з'являються два незнайомці."
								duration={141}
								key={index}
								matchPercentage="98%"
								year="2023"
							/>
						))}
					</div>
				</ScrollArea>
			</div>
		</>
	);
};

export default MovieDetails;
