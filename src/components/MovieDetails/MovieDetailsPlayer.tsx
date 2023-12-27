import { useDrawerStore } from "@/hooks/useDrawerStore";
import {
	ArrowLeftIcon,
	Cross2Icon,
	PlayIcon,
	RocketIcon,
	SpeakerLoudIcon,
	SpeakerOffIcon,
} from "@radix-ui/react-icons";
import { FC, useState } from "react";
import ReactPlayer from "react-player";

import { AddToWatchListButton } from "../AddToWatchListButton";
import { Button } from "../ui/button";

export const MovieDetailsPlayer = ({
	movie,
	navigate,
	playButtonRef,
	playerRef,
}): FC => {
	const { onOpenChange } = useDrawerStore();
	const [muted, setMuted] = useState<boolean>(true);

	const handlePlay = () => {
		navigate(`/watch`, { state: { movie } });
	};

	const handleMute = () => {
		setMuted(!muted);
	};
	const handleClose = () => {
		onOpenChange(false);
	};

	return (
		<div
			className="w-full min-h-max object-cover rounded-t-lg relative shadow-md"
			ref={playerRef}
		>
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
							<AddToWatchListButton id={movie.id} />
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
	);
};
