// import { supabase } from "@/supabase/supaClient";
import ReactPlayer from "react-player";

import data from "../lib/mock-weekly.json"
import MovieButtons from "./MovieButtons";

export default function MovieVideo() {
	// const weeklyMovie = supabase.from("weekly_movie").select("*").single();

	return (
		<div className="h-[70vh] lg:h-[70vh] w-full flex justify-start items-center">
			<div className="w-full absolute top-0 left-0 object-cover -z-10 brightness-[60%]">
				<ReactPlayer
					autoPlay
					className="react-player"
					file={{
						forceHLS: true,
					}}
					height="100%"
					loop={true}
					muted={true}
					playing={true}
					poster={data?.imageString}
					url="https://blackpearl.tortuga.wtf/hls/trailers/the_crown_2016_3418/hls/index.m3u8"
					width="100%"
				/>
			</div>
			<div className="absolute w-[90%] lg:w-[40%] mx-auto">
				<h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
					{data?.title}
				</h1>
				<p className="text-white text-lg mt-5 line-clamp-3">{data?.description}</p>
				<div className="flex gap-x-3 mt-4">
					<MovieButtons movie={data} />
				</div>
			</div>
		</div>
	);
}
