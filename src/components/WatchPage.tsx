import { useState, useEffect, useRef } from "react";
import Player, { useScript } from "./../lib/Player";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/supabase/supaClient";
import { Button } from "./ui/button";
import { ArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import "../assets/font-player.css";

const WatchPage = () => {
	useScript(`${import.meta.env.VITE_PUBLIC_URL}playerjs.js`);

	const { movieId } = useParams();
	const [watchData, setWatchData] = useState(null);
	const [showDescription, setShowDescription] = useState(false);
	const playerRef = useRef(null);
	const [isInit, setIsInit] = useState(false);

	useEffect(() => {
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

			// Cleanup function
			return () => player.removeEventListener("ui", handleUI);
		}
	}, [isInit, playerRef]);

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await supabase
				.from("movie")
				.select("*")
				.eq("id", movieId)
				.single();
			setWatchData(data);
			console.log(1);
		};
		fetchData();
	}, [movieId]);

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
		<div className="font-player">
			<Player
				id="player"
				className="flex flex-col w-full h-96"
				title={watchData?.title}
				poster={watchData?.poster_url}
				file={watchData?.stream_url}
				autoPlay
			/>
			<div id="player" ref={playerRef}></div>
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
		</div>
	);
};

export default WatchPage;
