import { IMovie } from "@/types/movie";

import { ScrollArea } from "../ui/scroll-area";
import { MovieHorizontalCard, MovieSkeleton } from "./MovieHorizontalCard";

interface MovieListProps {
	error: null | string;
	handleScroll: (event: React.UIEvent<HTMLDivElement>) => void;
	loading: boolean;
	movies: IMovie[];
}

export const MovieList: React.FC<MovieListProps> = ({ error, handleScroll, loading, movies }) => {
	return (
		<ScrollArea
			className="w-full rounded-md border p-4 h-[85vh]"
			onScroll={handleScroll}
		>
			{error && <div key="err">Error: {error}</div>}
			<div className="flex flex-col gap-2">
				{loading
					? Array.from({ length: 3 }).map((_, index) => (
						<MovieSkeleton key={index} />
					))
					: null}

				{movies.map((movie) => (
					<MovieHorizontalCard key={movie.id} movie={movie} />
				))}
			</div>
		</ScrollArea>
	);
};