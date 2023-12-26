import { IMovie } from "@/types/movie";
import { useState } from "react";

export default useMovies = () => {
	const [movies, setMovies] = useState<IMovie[]>([]);

	return {
		movies,
		setMovies,
	};
};
