import { supabase } from "../../supabase/supaClient.tsx";
import { Input } from "../ui/input.tsx";
import { Button } from "../ui/button.tsx";
import { useDebounce } from "@uidotdev/usehooks";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ScrollArea } from "../ui/scroll-area.tsx";
import { MovieHorizontalCard } from "./MovieHorizontalCard.tsx";
import React, { useEffect, useState, useRef } from "react";
import { Drawer } from "vaul";


export const SearchContent = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const debouncedSearchTerm = useDebounce(searchTerm, 500);
	const inputRef = useRef(null);

	const fetchData = async (table, conditions) => {
		let query = supabase.from(table).select("*");

		if (conditions.length > 1) {
			const orCondition = conditions
				.map((cond) => `${cond.field}.ilike.%${cond.term}%`)
				.join(",");
			query = query.or(orCondition);
		} else {
			const condition = conditions[0];
			query = query.ilike(condition.field, `%${condition.term}%`);
		}

		query = query.order('release_date', { ascending: false });

		const { data, error } = await query;

		if (error) {
			throw error;
		}
		return data;
	};

	const handleSearch = async () => {
		setLoading(true);
		setError(null);

		try {
			const tmdbData = await fetchData("tmdb_data", [
				{ field: "title", term: debouncedSearchTerm },
				{ field: "original_title", term: debouncedSearchTerm },
			]);

			// TODO: Update search algo to search in both tabled and filter correctly
			//const movieData = await fetchData('movie', [{ field: 'title', term: debouncedSearchTerm }]);

			const movieData = [];

			const seenMovieIds = new Map();

			const processMovie = (movie) => {
				const id = movie.movie_id || movie.id;
				if (!seenMovieIds.has(id)) {
					seenMovieIds.set(id, true);
					return movie;
				}
				return null;
			};

			const combinedResults = [
				...tmdbData.map(processMovie),
				...movieData.map(processMovie),
			].filter((movie) => movie !== null);

			setMovies(combinedResults);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	// TODO: fix missing dependency warning
	useEffect(() => {
		if (debouncedSearchTerm && handleSearch && debouncedSearchTerm.length > 2) {
			handleSearch();
		}
	}, [debouncedSearchTerm]);

	const handleKeyDown = (e) => {
		if (
			e.key === "Enter" &&
			debouncedSearchTerm &&
			handleSearch &&
			debouncedSearchTerm.length > 2
		) {
			handleSearch();
		}
	};

	const onInputChanged = (e) => {
		setSearchTerm(e.target.value);
	};

	const onSearchClicked = () => {
		if (debouncedSearchTerm && handleSearch && debouncedSearchTerm.length > 2) {
			handleSearch();
		}
	};

	const handleScroll = () => {
		if (inputRef.current) {
			inputRef.current.blur();
		}
	};


	return (
		<>
			<div className="p-4 rounded-t-20 flex-1">
				<div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
				<div className="max-w-md mx-auto flex flex-col items-center">
					<Drawer.Title className="font-medium mb-4">Пошук</Drawer.Title>
					<Drawer.Description>
						Введіть назву фільму, який ви хочете подивитися
					</Drawer.Description>
					<div className="flex flex-row gap-2 justify-between items-start w-full h-96 ">
						<div className="flex flex-col w-full">
							<div className="flex flex-row gap-2 mb-2">
								<Input
									minLength="3"
									type="text"
									placeholder="Знайди щось на вечір"
									value={searchTerm}
									onChange={(e) => onInputChanged(e)}
									ref={inputRef}
								/>
								<Button
									onClick={() => onSearchClicked()}
									onKeyDown={(e) => handleKeyDown(e)}
									disabled={loading}

								>
									{loading ? "Searching..." : "Пошук"}
								</Button>
							</div>
							<ScrollArea onScroll={handleScroll} className="w-full rounded-md border p-4 h-80">
								{error && <div>Error: {error}</div>}

								{movies.map((movie) => (
									<MovieHorizontalCard movie={movie} />
								))}
							</ScrollArea>
						</div>
						<Separator orientation="vertical" />
						<div className="flex flex-col w-72">Останні пошуки</div>
					</div>
				</div>
			</div>
		</>
	);
};