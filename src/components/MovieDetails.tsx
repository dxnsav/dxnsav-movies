import { useAuth } from "@/hooks/useAuth";
import { TopTenIcon } from "@/icons/TopTenIcon";
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

import { AddToWatchListButton } from "./AddToWatchListButton";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

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
					<DetailsBlock content={actors} isActors={true} title="В ролях" />
					<DetailsBlock content={genres.join(", ")} title="Жанри" />
					<DetailsBlock content={description.join(", ")} title="Про фільм" />
				</div>
			</div>

			<div className="flex flex-col gap-4 m-6">
				<h3 className="text-lg font-semibold">Схожі</h3>
				<ScrollArea className="w-full rounded-md pr-4 h-[55vh]">
					<div className="grid xs:grid-cols-1 sm:grid-cols-2 landscape:grid-cols-3 gap-4 overflow-x-auto">
						{[...Array(10)].map((_, index) => (
							<MovieDetailsCard
								ageRating="16+"
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

const actors = [
	"Джулія Робертс",
	"Махершала Алі",
	"Ітан Гоук",
	"Додатковий актор",
];
const genres = ["Драматичні фільми", "Трилери", "Фільми на основі книг"];
const description = ["Лякаючий", "Зловісний"];

const formatDuration = (duration) => {
	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;
	return `${hours} г. ${minutes} хв.`;
};

const NewMovieTag = () => (
	<h4 className="font-semibold tracking-tight text-green-400">Новинка</h4>
);

const QualityBadge = ({ quality }) => (
	<Badge className="h-5 p-2" variant="outline">
		{quality}
	</Badge>
);

const AgeRestriction = ({ data }) => (
	<>
		<Badge
			className="rounded-2 text-sm p-2 h-6 items-center border-foreground"
			variant="outline"
		>
			{data.age}+
		</Badge>
		{data.details ? <p className="text-sm">{data.details}</p> : null}
	</>
);

const PopularityTag = ({ rating }) => (
	<>
		<TopTenIcon className="w-7 h-7" />
		<h3 className="text-xl font-semibold tracking-tight">
			Фільм №{rating} сьогодні
		</h3>
	</>
);

const DetailsBlock = ({ content, isActors, onMoreClick, title }) => {
	return (
		<div className="mb-4 flex">
			<h3 className="text-sm text-muted-foreground mr-2 whitespace-nowrap">
				{title}:
			</h3>
			{isActors ? (
				<div className="flex">
					<p className="text-sm font-semibold">
						{content.slice(0, 3).map((actor, index) => (
							<>
								<span className="hover:underline" key={index}>
									{actor}
								</span>
								<span key={index + "comma"}>
									{index !== content.slice(0, 3).length - 1 && ", "}
								</span>
							</>
						))}
						{content.length > 3 && (
							<>
								,&nbsp;
								<span
									className=" font-semibold text-sm cursor-pointer"
									onClick={onMoreClick}
								>
									ще
								</span>
							</>
						)}
					</p>
				</div>
			) : (
				<p className="text-sm font-semibold">{content}</p>
			)}
		</div>
	);
};

const MovieDetailsCard = (movie) => {
	const {
		ageRating,
		backdrop_url,
		description,
		duration,
		isAdded,
		matchPercentage,
		movie_id,
		releaseYear,
		seasons,
		title,
	} = movie;
	const navigate = useNavigate();

	const handleMovieDetailsCardClick = () => {
		navigate(`/details`, { state: { movie } });
	}

	const backdropPath = "https://image.tmdb.org/t/p/w500" + backdrop_url;

	// TODO: get setted to watchlist in searchContent and provide here data
	// TODO: add tags added recently, new season, etc.

	return (
		<Card className="relative cursor-pointer group" onClick={() => handleMovieDetailsCardClick()}>
			<CardHeader className="relative w-full p-0">
				<img
					alt={title}
					className="w-full"
					src={backdropPath}
				/>
				<PlayIcon className="absolute w-12 h-12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100" />
				<div className="absolute flex items-center justify-center z-20 bottom-0 left-0 right-0">
					<span className="inline-block bg-red-600 rounded-sm px-3 py-1 text-sm font-semibold text-white mb-2">
						Нещодавно додано
					</span>
				</div>
				<div className="absolute top-0 right-0 font-semibold text-foreground px-4 py-2">
					{duration ? formatDuration(duration) : seasons}
				</div>
			</CardHeader>
			<CardContent className="px-6 py-4 flex flex-row justify-between bg-zinc-900">
				<div className="flex flex-col gap-2">
					<h4 className="font-semibold text-sm text-green-400">Співпадіння: {matchPercentage}%</h4>
					<div className="flex flex-row gap-2 items-center">
						<AgeRestriction
							data={{ age: ageRating }}
						/>
						<p className="text-sm">{releaseYear}</p>
					</div>
				</div>
				<div className="flex flex-col items-center">
					<AddToWatchListButton className="w-8 h-8" isAdded={isAdded} movie_id={movie_id} />
				</div>
			</CardContent>
			<CardFooter className="px-6 pb-2 bg-zinc-900">
				<p className="text-sm font-bold">{title}</p>
				<p className="text-sm">{description}</p>
			</CardFooter>
		</Card>
	);
};

export default MovieDetails;
