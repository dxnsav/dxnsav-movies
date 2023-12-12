import { ScrollArea } from "../ui/scroll-area";
import { MovieHorizontalCard, MovieSkeleton } from "./MovieHorizontalCard";

export const MovieList = ({ error, handleScroll, loading, movies }) => {
	return (
		<ScrollArea
			className="w-full rounded-md border p-4 h-[85vh]"
			onScroll={handleScroll}
		>
			{error && <div key="err">Error: {error}</div>}
			{loading
				? Array.from({ length: 3 }).map((_, index) => (
					<MovieSkeleton key={index} />
				))
				: null}

			{movies.map((movie) => (
				<MovieHorizontalCard key={movie.id} movie={movie} />
			))}
		</ScrollArea>
	);
};