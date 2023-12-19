import { useNavigate } from "react-router-dom";

export const MovieDetailsBlock = ({ content, isFull, onMoreClick, title }) => {
	const slicedContent = isFull ? content : content.slice(0, 3);
	const navigate = useNavigate();

	return (
		<div className="mb-4 flex">
			<h3 className="text-sm text-muted-foreground mr-2 whitespace-nowrap">
				{title}:
			</h3>
			<div className="flex">
				<p className="text-sm font-semibold">
					{slicedContent.map((actor, index) => (
						<span className="hover:underline capitalize" key={index}>
							{actor}
							{index < slicedContent.length - 1 ? ", " : ""}
						</span>
					))}
					{content.length > 3 && !isFull ? (
						<span
							className=" font-semibold text-sm cursor-pointer"
							key={"more-actors"}
							onClick={onMoreClick}
						>
							, ще
						</span>
					) : null}
				</p>
			</div>
		</div>
	);
};
