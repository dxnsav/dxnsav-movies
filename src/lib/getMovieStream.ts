import { supabase } from "../supabase/supaClient.tsx";

export const getMovieStream = async ({ params }) => {
	const movieId = params.movieId;
	const maxRetries = 5; // Maximum number of retries
	const retryDelay = 1000; // Delay between retries in milliseconds (1 second)

	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		try {
			const { data, error } = await supabase.from("movie").select("*").eq("id", movieId).single();

			if (!error) {
				return data;
			}

			console.log(`Attempt ${attempt} failed, retrying...`);
			if (attempt < maxRetries) {
				await new Promise(resolve => setTimeout(resolve, retryDelay));
			}
		} catch (err) {
			console.error("An error occurred while fetching the movie stream:", err);
			if (attempt === maxRetries) {
				throw err; // Rethrow the last error if all retries fail
			}
		}
	}

	throw new Error("Failed to fetch movie stream after maximum retries.");
};
