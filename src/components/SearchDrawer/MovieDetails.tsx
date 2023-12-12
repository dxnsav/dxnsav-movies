import { useAuth } from "@/hooks/useAuth";
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

const MovieDetails = () => {
	const [watchData, setWatchData] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();
	const movie = location.state.movie;
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
				console.error('Error fetching movie:', error);
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
					.from('watch_list')
					.select('*')
					.eq('movie_id', movie.movie_id)
					.eq('user_id', userId)
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

	const fullData = { ...movie, ...watchData };

	const handlePlay = () => {
		navigate(`/watch`, { state: { movie: fullData } });
	}

	const handleMute = () => {
		setMuted(!muted);
	}


	return (
		<>
			<div className="w-full h-fit object-cover rounded-t-lg relative shadow-md">
				<div className="mx-auto absolute w-12 h-1.5 flex-shrink-0 rounded-full bg-white z-20 top-4 left-0 right-0 m-auto" />
				<Button className="absolute left-4 rounded-full z-50 top-8" onClick={() => navigate("/search", { state: { title: movie.title } })} size="icon" variant="secondary">
					<ArrowLeftIcon className="w-6 h-6" />
				</Button>
				<Button className="absolute right-4 rounded-full z-50 top-8" onClick={() => navigate("/")} size="icon" variant="secondary">
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
					height='100%'
					loop={true}
					muted={muted}
					playing={true}
					url={fullData.stream_trailer_url}
					width='100%'
				/>
				<div className="absolute w-full mx-auto bottom-[10%] px-4 z-50">
					<div className="w-full flex flex-col justify-center">
						<h1 className="text-[2em] font-unbounded w-[60%]">{movie.title}</h1>
					</div>
					<div className="flex flex-row justify-between w-full items-center">
						<div className="flex flex-col gap-x-3 mt-4">
							<div className="flex gap-x-3 mt-4">
								<Button className="bg-foreground text-background" onClick={() => handlePlay()} variant="default">
									<PlayIcon className="w-5 h-5 mr-2" />
									Дивитись
								</Button>
								<AddToWatchListButton isAdded={isInWatchlist} movie_id={movie.movie_id} />
								<Button className="w-10 h-10 p-0 rounded-full" variant="outline">
									<RocketIcon className="w-5 h-5" />
								</Button>
							</div>
						</div>
						<div className="flex flex-col gap-x-3 mt-4">
							<div className="flex gap-x-3 mt-4">
								<Button className="w-10 h-10 p-0 rounded-full" onClick={() => handleMute()} variant="outline" >
									{muted ? <SpeakerLoudIcon className="w-5 h-5" /> : <SpeakerOffIcon className="w-5 h-5" />}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col my-4">
				<div className="text-white">
					{movie.release_date} • {movie.vote_average} • {movie.vote_count} •{" "}
					{movie.popularity}
				</div>
				<div className="text-white">{movie.genre_ids}</div>
				<div className="text-white text-lg mt-5 line-clamp-3">
					{movie.overview}d
				</div>
			</div>
		</>
	);
};

export default MovieDetails;
