import { useAuth } from "@/hooks/useAuth.tsx";
import { fetchSearchData } from "@/lib/fetchSearchData.ts";
import { useDebounce } from "@uidotdev/usehooks";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Drawer } from "vaul";

import { supabase } from "../../supabase/supaClient.tsx";
import { MovieList } from "./MovieList.tsx";
import { SearchHistory } from "./SearchHistory.tsx";
import { SearchMovieInput } from "./SearchMovieInput.tsx";

export const SearchContent = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchHistory, setSearchHistory] = useState([]);
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const debouncedSearchTerm = useDebounce(searchTerm, 500);
	const inputRef = useRef(null);
	const userId = useAuth().user?.id;

	const location = useLocation();
	const navTitle = location.state?.title;

	const handleSearch = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const tmdbData = await fetchSearchData("tmdb_data", [
				{ field: "title", term: debouncedSearchTerm },
				{ field: "original_title", term: debouncedSearchTerm },
			]);

			// TODO: Update search algo to search in both tabled and filter correctly
			//const movieData = await fetchSearchData('movie', [{ field: 'title', term: debouncedSearchTerm }]);

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
	}, [debouncedSearchTerm]);

	useEffect(() => {
		if (navTitle) {
			setSearchTerm(navTitle);
		}
	}, [navTitle]);

	useEffect(() => {
		if (loading) setMovies([]);
	}, [loading]);

	useEffect(() => {
		const updateSearchHistory = async () => {
			if (debouncedSearchTerm && debouncedSearchTerm.length > 2) {
				handleSearch();

				if (userId) {
					const { error: insertError } = await supabase
						.from("search_history")
						.upsert(
							[
								{
									search_term: debouncedSearchTerm,
									user_id: userId,
								},
							],
							{
								onConflict: ["search_term", "user_id"],
							},
						);

					if (insertError) {
						console.error("Error adding to search history:", insertError);
						return;
					}
				} else {
					localStorage.setItem("search_term", debouncedSearchTerm);
				}

				const { data, error: fetchError } = await supabase
					.from("search_history")
					.select("*")
					.eq("user_id", userId)
					.limit(5)
					.order("timestamp", { ascending: false });

				if (fetchError) {
					console.error("Error fetching search history:", fetchError);
					return;
				}

				setSearchHistory(data);
			}
		};

		updateSearchHistory();
	}, [debouncedSearchTerm, userId, handleSearch]);

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
		setLoading(true);
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

	const handleBadgeClick = (badge) => {
		setSearchTerm(badge);
	};

	return (
		<>
			<div className="mx-auto flex flex-col items-center">
				<Drawer.Title className="font-medium mb-4">Пошук</Drawer.Title>
				<Drawer.Description>
					Введіть назву фільму, який ви хочете подивитися
				</Drawer.Description>
				<div className="flex flex-row portrait:flex-col-reverse gap-2 justify-between items-start w-full h-full ">
					<div className="flex flex-col w-full">
						<SearchMovieInput
							handleKeyDown={handleKeyDown}
							inputRef={inputRef}
							loading={loading}
							onInputChanged={onInputChanged}
							onSearchClicked={onSearchClicked}
							searchTerm={searchTerm}
						/>
						<MovieList
							error={error}
							handleScroll={handleScroll}
							loading={loading}
							movies={movies}
						/>
					</div>
					<SearchHistory
						badgesData={searchHistory}
						onBadgeClick={handleBadgeClick}
					/>
				</div>
			</div>
		</>
	);
};
