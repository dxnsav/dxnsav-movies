import { useAuth } from "@/hooks/useAuth.tsx";
import { supabase } from "@/supabase/supaClient.tsx";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Player, useScript } from "../lib/Player.ts";
import { Button } from "./ui/button.tsx";

export const PlayerPage = () => {
	useScript(`${window.location.origin}/playerjs.js`);

	const playerRef = useRef(null);
	const watchData = useLocation().state?.movie;

	console.log(useLocation())

	const navigate = useNavigate();

	const userId = useAuth().user?.id;
	useEffect(() => {
		const upsertData = async () => {
			if (!userId || !watchData.id) return;

			const { error } = await supabase
				.from("watch_history")
				.upsert([
					{
						id: watchData.id,
						player_time: 0,
						user_id: userId,
					},
				], { onConflict: ["user_id", "id"] });

			if (error) {
				console.error("Error in upsert operation:", error);
			}
		};

		upsertData();
	}, [watchData.id, userId]);

	//const file = watchData?.movie_url || watchData?.serial_data;
	const backdropPath = watchData.movie_backdrop ? "https://image.tmdb.org/t/p/w500" + watchData.movie_backdrop : null;

	return (
		<>
			<div className="flex items-center justify-center h-screen">
				<Player
					file={watchData.serial_data}
					id="player"
					poster={backdropPath}
					title={watchData?.title}
				/>
				<div className="w-full" id="player" ref={playerRef} />
				<Button className="absolute top-6 left-4 rounded-full" onClick={() => navigate()} size="icon" variant="outline" >
					<ChevronLeftIcon className="w-6 h-6" />
				</Button>
			</div>
		</>
	);
};
