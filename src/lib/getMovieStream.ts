import { supabase } from "../supabase/supaClient.tsx";

export const getMovieStream = async ({ params }) => {
	const movieId = params.movieId;
	const maxRetries = 5;
	const retryDelay = 1000;

	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		try {
			const { data, error } = await supabase
				.from("movie")
				.select("*")
				.eq("id", movieId)
				.single();

			if (!error) {
				return data;
			}

			console.log(`Attempt ${attempt} failed, retrying...`);
			if (attempt < maxRetries) {
				await new Promise((resolve) => setTimeout(resolve, retryDelay));
			}
		} catch (err) {
			console.error("An error occurred while fetching the movie stream:", err);
			if (attempt === maxRetries) {
				throw err;
			}
		}
	}

	throw new Error("Failed to fetch movie stream after maximum retries.");
};
