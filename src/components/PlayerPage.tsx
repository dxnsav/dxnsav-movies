import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/supabase/supaClient.tsx";
import { Player, useScript } from "../lib/Player.ts";
import { useAuth } from "@/hooks/useAuth.tsx";
import { Button } from "./ui/button.tsx";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

export const PlayerPage = () => {
	useScript(`${import.meta.env.VITE_PUBLIC_URL}playerjs.js`);

	const playerRef = useRef(null);
	const watchData = useLocation().state?.movie;

	const backdropPath = "https://image.tmdb.org/t/p/w500" + watchData.backdrop_path;

	const navigate = useNavigate();

	// TODO: get time from player and update supabase on pause
	// TODO: get time from supabase and update player on load
	const userId = useAuth().user?.id;
	useEffect(() => {
		const upsertData = async () => {
			if (!userId || !watchData.movie_id) return;

			const { error } = await supabase
				.from("watch_history")
				.upsert([
					{
						user_id: userId,
						movie_id: watchData.movie_id,
						player_time: 0,
					},
				], { onConflict: ["user_id", "movie_id"] });

			if (error) {
				console.error("Error in upsert operation:", error);
			}
		};

		upsertData();
	}, [watchData.movie_id, userId]);

	return (
		<>
			<div className="flex items-center justify-center h-screen">
				<Player
					id="player"
					title={watchData?.title}
					poster={backdropPath}
					file={watchData?.stream_url}
					autoPlay
				/>
				<div id="player" className="w-full" ref={playerRef} />
				<Button onClick={() => navigate(-1)} variant="outline" size="icon" className="absolute top-6 left-4 rounded-full" >
					<ChevronLeftIcon className="w-6 h-6" />
				</Button>
			</div>
		</>
	);
};
