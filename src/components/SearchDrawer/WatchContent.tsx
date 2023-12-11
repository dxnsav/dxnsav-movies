import { useState, useEffect } from "react";
import { supabase } from "@/supabase/supaClient";
import ReactPlayer from "react-player";
import { Button } from "../ui/button";
import {
	PauseIcon,
	PlusIcon,
	RocketIcon,
	SpeakerLoudIcon,
} from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

const WatchContent = ({ movie }) => {
	const [watchData, setWatchData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await supabase
				.from("movie")
				.select("*")
				.eq("id", movie.movie_id)
				.single();
			setWatchData(data);
		};
		fetchData();
	}, [movie]);

	if (!watchData) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div className="w-full h-fit object-cover brightness-[60%] rounded-t-lg">
				<ReactPlayer
					url={watchData.stream_trailer_url}
					loop={true}
					muted={true}
					fallback={
						<img src={watchData.poster_trailer_url} alt={watchData.title} />
					}
				/>
			</div>
			<div className="absolute w-full mx-auto top-52 px-4">
				<div className="w-full flex flex-col justify-center">
					<h1 className="text-2xl">{movie.title}</h1>
				</div>
				<div className="flex flex-row justify-between w-full items-center">
					<div className="flex flex-col gap-x-3 mt-4">
						<div className="flex gap-x-3 mt-4">
							<Button>
								<Link to={`/watch/${movie.movie_id}`}>Дивитись</Link>
							</Button>
							<Button variant="outline" className="w-10 h-10 p-0 rounded-full">
								<PlusIcon className="w-5 h-5" />
							</Button>
							<Button variant="outline" className="w-10 h-10 p-0 rounded-full">
								<RocketIcon className="w-5 h-5" />
							</Button>
						</div>
					</div>
					<div className="flex flex-col gap-x-3 mt-4">
						<div className="flex gap-x-3 mt-4">
							<Button variant="outline" className="w-10 h-10 p-0 rounded-full">
								<PauseIcon className="w-5 h-5" />
							</Button>
							<Button variant="outline" className="w-10 h-10 p-0 rounded-full">
								<SpeakerLoudIcon className="w-5 h-5" />
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

export default WatchContent;
