import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import "../assets/font-player.css";

import { Player, useScript } from "../lib/Player.ts";

export const PlayerPage = () => {
	useScript(`${import.meta.env.VITE_PUBLIC_URL}playerjs.js`);

	const [showDescription] = useState(false);
	const playerRef = useRef(null);
	//const [isInit, setIsInit] = useState(false);

	const watchData = useLocation().state?.movie;
	console.log(watchData);

	const backdropPath = "https://image.tmdb.org/t/p/w500" + watchData.backdrop_path;

	/*useEffect(() => {
		const player = playerRef.current;
		if (player) {
			const handleUI = (event) => {
				console.log(event.info, isInit);

				setShowDescription(!!event.info);
			};

			player.addEventListener("ui", handleUI);
			player.addEventListener("ready", () => {
				console.log("ready");
				setIsInit(true);
			});

			return () => player.removeEventListener("ui", handleUI);
		}
	}, [isInit, playerRef]);/** */

	const handleQuit = () => {
		if (window.pljssglobal.length > 0) window.pljssglobal[0].api("stop");
	};

	const handleClickRewindForward = () => {
		if (window.pljssglobal.length > 0) {
			window.pljssglobal[0].api("toggle");
			console.log("click");
		}
	};

	return (
		<>
			<Player
				id="player"
				title={watchData?.title}
				poster={backdropPath}
				file={watchData?.stream_url}
				autoPlay
			/>
			<div id="player" className="w-full h-screen" ref={playerRef}></div>
			{showDescription ? (
				<>
					<Button
						variant="ghost"
						className="w-12 h-12 p-0 rounded-full absolute top-16"
						onClick={() => handleQuit()}
					>
						<Link to="/">
							<ArrowLeftIcon className="w-5 h-5" />
						</Link>
					</Button>
					<Button
						variant="ghost"
						className="w-12 h-12 p-0 rounded-full absolute top-16 right-16"
						onClick={() => handleClickRewindForward()}
					>
						<DoubleArrowRightIcon className="w-5 h-5" />
					</Button>
				</>
			) : null}
		</>
	);
};
