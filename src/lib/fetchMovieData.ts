import { supabase } from "@/supabase/supaClient";

export const fetchMovieData = async (id) => {
	const { data, error } = await supabase
		.from("movie")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		throw error;
	}
	return data;
};