import { useAuth } from "@/hooks/useAuth.tsx";
import { useDebounce } from "@uidotdev/usehooks";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Drawer } from "vaul";

import { supabase } from "../../supabase/supaClient.tsx";
import { Badge } from "../ui/badge.tsx";
import { Button } from "../ui/button.tsx";
import { Input } from "../ui/input.tsx";
import { ScrollArea } from "../ui/scroll-area.tsx";
import { MovieHorizontalCard, MovieSkeleton } from "./MovieHorizontalCard.tsx";

// TODO: handle search history from supabase
const badgesData = [
	{ id: 1, name: "Harry Potter", timestamp: 1631701800 },
	{ id: 2, name: "Шоколадна", timestamp: 1631788200 },
	{ id: 3, name: "Голод", timestamp: 1631874600 },
];

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

		query = query.order("release_date", { ascending: false });

		const { data, error } = await query;

		if (error) {
			throw error;
		}
		return data;
	};

	const handleSearch = useCallback(async () => {
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
						<div className="flex flex-row gap-2 mb-2">
							<Input
								minLength="3"
								onChange={(e) => onInputChanged(e)}
								placeholder="Знайди щось на вечір"
								ref={inputRef}
								type="text"
								value={searchTerm}
							/>
							<Button
								disabled={loading}
								onClick={() => onSearchClicked()}
								onKeyDown={(e) => handleKeyDown(e)}
							>
								{loading ? "Searching..." : "Пошук"}
							</Button>
						</div>
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
					</div>

					<div className="flex flex-col w-72">
						<h1>Остані пошуки</h1>
						<div className="flex flex-col portrait:flex-row gap-1">
							{badgesData
								.sort(
									(a, b) =>
										new Date(a.timestamp * 1000) - new Date(b.timestamp * 1000),
								)
								.map((item) => (
									<Badge
										className="w-fit"
										key={item.id}
										onClick={() => handleBadgeClick(item.name)}
										variant="outline"
									>
										{item.name}
									</Badge>
								))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
