import {
	PauseIcon,
	PlayIcon,
	SpeakerLoudIcon,
	SpeakerOffIcon,
} from "@radix-ui/react-icons";
import { FC, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";

import MovieButtons from "./MovieButtons";
import { Button } from "./ui/button";

export default function MovieVideo({ data }) {
	const isMainPage = useLocation().pathname === "/";

	const [paused, setPaused] = useState<boolean>(true);
	const [muted, setMuted] = useState<boolean>(true);

	const handlePause = () => {
		setPaused(!paused);
	};

	const handleMute = () => {
		setMuted(!muted);
	};

	const ControlButtons = (): FC => (
		<div className="flex gap-x-3 absolute right-0">
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
			<Button
				className="w-10 h-10 p-0 rounded-full border-2"
				onClick={() => handlePause()}
				variant="outline"
			>
				{paused ? (
					<PauseIcon className="w-5 h-5" />
				) : (
					<PlayIcon className="w-5 h-5" />
				)}
			</Button>
			{data?.age_restriction ? <div className="border-l-2 border-white h-10 backdrop-blur backdrop-brightness-150">
				<p className="text-white text-lg p-2 w-32 pl-5">{data?.age_restriction}+</p>
			</div> : null}
		</div>
	);

	return (
		<div className="w-full flex justify-start items-center h-[65vh]">
			<div className="w-full absolute top-0 left-0 object-cover -z-10 brightness-[60%]">
				<ReactPlayer
					autoPlay
					className="react-player"
					file={{
						forceHLS: true,
					}}
					height="100%"
					loop={true}
					muted={muted}
					playing={isMainPage ? paused : false}
					poster={data?.trailer_backdrop}
					props={{ playsinline: true }}
					url={data?.trailer_url}
					width="100%"
				/>
			</div>

			<div className="absolute w-[90%] lg:w-[40%] mx-auto top-[40%]">
				<h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
					{data?.title}
				</h1>
				<p className="text-white text-lg mt-5 line-clamp-3">
					{data?.description}
				</p>
				<div className="flex gap-x-3 mt-4">
					<MovieButtons movie={data} />
				</div>
			</div>
			<ControlButtons />
		</div>
	);
}
