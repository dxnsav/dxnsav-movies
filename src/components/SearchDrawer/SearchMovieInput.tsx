import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const SearchMovieInput = ({ handleKeyDown, inputRef, loading, onInputChanged, onSearchClicked, searchTerm }) => {
	return (
		<div className="flex flex-row gap-2 mb-2">
			<Input
				className="h-10"
				minLength="3"
				onChange={(e) => onInputChanged(e)}
				placeholder="Знайди щось на вечір"
				ref={inputRef}
				type="text"
				value={searchTerm}
			/>
			<Button
				className="h-10"
				disabled={loading}
				onClick={() => onSearchClicked()}
				onKeyDown={(e) => handleKeyDown(e)}
			>
				Пошук
			</Button>
		</div>
	);
}