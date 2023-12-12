import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/supabase/supaClient";
import {
	CheckIcon,
	ChevronLeftIcon,
	PauseIcon,
	PlayIcon,
	PlusIcon,
	RocketIcon,
	SpeakerLoudIcon,
	SpeakerOffIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";

const MovieDetails = () => {
	const [watchData, setWatchData] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();
	const movie = location.state.movie;
	const [muted, setMuted] = useState(true);
	const [playing, setPlaying] = useState(true);
	const userId = useAuth().user?.id;
	const [isInWatchlist, setIsInWatchlist] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			// Fetch movie details
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

	const handlePlaying = () => {
		setPlaying(!playing);
	}

	const handleAddToWatchlist = async () => {
		if (isInWatchlist) {
			const { error } = await supabase
				.from('watch_list')
				.delete()
				.match({ movie_id: movie.movie_id, user_id: userId });

			if (error) {
				console.error('Error removing from watchlist:', error);
			} else {
				setIsInWatchlist(false);
			}
		} else {
			const { error } = await supabase
				.from('watch_list')
				.insert([{ movie_id: movie.movie_id, user_id: userId }]);

			if (error) {
				console.error('Error adding to watchlist:', error);
			} else {
				setIsInWatchlist(true);
			}
		}
	};

	return (
		<>
			<div className="w-full h-fit object-cover brightness-[60%] rounded-t-lg">
				<Button className="absolute left-4 rounded-full z-50" onClick={() => navigate("/search", { state: { title: movie.title } })} size="icon" variant="outline">
					<ChevronLeftIcon className="w-6 h-6" />
				</Button>
				<ReactPlayer
					fallback={
						<img alt={watchData.title} src={fullData.poster_trailer_url} />
					}
					file={{
						forceHLS: true,
					}}
					loop={true}
					muted={muted}
					playing={playing}
					url={fullData.stream_trailer_url}
				/>
			</div>
			<div className="absolute w-full mx-auto top-52 px-4">
				<div className="w-full flex flex-col justify-center">
					<h1 className="text-2xl">{movie.title}</h1>
				</div>
				<div className="flex flex-row justify-between w-full items-center">
					<div className="flex flex-col gap-x-3 mt-4">
						<div className="flex gap-x-3 mt-4">
							<Button onClick={() => handlePlay()}>
								Дивитись
							</Button>
							<Button className="w-10 h-10 p-0 rounded-full" onClick={() => handleAddToWatchlist()} variant="outline">
								{isInWatchlist ? <CheckIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
							</Button>
							<Button className="w-10 h-10 p-0 rounded-full" variant="outline">
								<RocketIcon className="w-5 h-5" />
							</Button>
						</div>
					</div>
					<div className="flex flex-col gap-x-3 mt-4">
						<div className="flex gap-x-3 mt-4">
							<Button className="w-10 h-10 p-0 rounded-full" onClick={() => handlePlaying()} variant="outline">
								{playing ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
							</Button>
							<Button className="w-10 h-10 p-0 rounded-full" onClick={() => handleMute()} variant="outline" >
								{muted ? <SpeakerLoudIcon className="w-5 h-5" /> : <SpeakerOffIcon className="w-5 h-5" />}
							</Button>
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
