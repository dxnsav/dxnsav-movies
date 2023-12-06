import { useState } from 'react';

export default useMovies = () => {
	const [movies, setMovies] = useState([]);

	return {
		movies,
		setMovies,
	};
}