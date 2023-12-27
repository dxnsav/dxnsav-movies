import { FC } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SearchMovieInputProps {
	handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	inputRef: React.MutableRefObject<HTMLInputElement | null>;
	loading: boolean;
	onInputChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSearchClicked: () => void;
	searchTerm: string;
}

export const SearchMovieInput: FC<SearchMovieInputProps> = ({ handleKeyDown, inputRef, loading, onInputChanged, onSearchClicked, searchTerm }) => {
	return (
		<div className="flex flex-row gap-2 mb-2">
			<Input
				className="h-10"
				minLength="3"
				onChange={onInputChanged}
				placeholder="Знайди щось на вечір"
				ref={inputRef}
				type="text"
				value={searchTerm}
			/>
			<Button
				className="h-10"
				disabled={loading}
				onClick={onSearchClicked}
				onKeyDown={handleKeyDown}
			>
				Пошук
			</Button>
		</div>
	);
}