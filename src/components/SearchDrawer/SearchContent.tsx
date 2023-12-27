import { useAuth } from "@/hooks/useAuth.tsx";
import { fetchSearchData } from "@/lib/fetchSearchData.ts";
import { IMovie } from "@/types/movie.ts";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChangeEvent, KeyboardEvent } from "react";
import { useLocation } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import { Drawer } from "vaul";

import { supabase } from "../../supabase/supaClient.tsx";
import { MovieList } from "./MovieList.tsx";
import { SearchHistory } from "./SearchHistory.tsx";
import { SearchMovieInput } from "./SearchMovieInput.tsx";

type Badge = string;

interface SearchHistoryItem {
	search_term: string;
	user_id: string;
}

export const SearchContent = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
	const [movies, setMovies] = useState<IMovie[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);
	const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
	const inputRef = useRef<HTMLInputElement>(null);
	const userId = useAuth().user?.id;

	const location = useLocation<{ movie: { title: string } }>();
	const navTitle = location.state?.movie.title;

	const handleSearch = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const movieData = await fetchSearchData("movie", [
				{ field: "title", term: debouncedSearchTerm },
				{ field: "title_en", term: debouncedSearchTerm },
			]);

			const seenMovieIds = new Map();

			const processMovie = (movie) => {
				const id = movie.id || movie.id;
				if (!seenMovieIds.has(id)) {
					seenMovieIds.set(id, true);
					return movie;
				}
				return null;
			};

			setMovies(movieData.map(processMovie).filter((movie) => movie !== null));
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

	useEffect(() => {
		const getSearchHistory = async () => {
			if (userId) {
				const { data, error } = await supabase
					.from("search_history")
					.select("search_term, id")
					.eq("user_id", userId)
					.limit(5)
					.order("timestamp", { ascending: false });

				if (error) {
					console.error("Error fetching search history:", error);
					return;
				}

				setSearchHistory(data);
			} else {
				const searchTerm = localStorage.getItem("search_term");
				if (searchTerm) {
					setSearchTerm(searchTerm);
				}
			}
		};

		getSearchHistory();
	}, [userId]);

	const handleKeyDown = (e: KeyboardEvent) => {
		if (
			e.key === "Enter" &&
			debouncedSearchTerm &&
			handleSearch &&
			debouncedSearchTerm.length > 2
		) {
			handleSearch();
		}
	};

	const onInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
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

	const handleBadgeClick = (badge: Badge) => {
		setSearchTerm(badge);
	};

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	});

	return (
		<>
			<div className="px-4 flex flex-col items-center w-full">
				<div className="mx-auto absolute w-12 h-1.5 flex-shrink-0 rounded-full bg-white z-20 top-4 m-auto" />
				<Drawer.Description className="mt-8 mb-2">
					Знайдіть фільм, який ви хочете подивитися
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
