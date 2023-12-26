import { useNavigate } from "react-router-dom";

interface MovieDetailsBlockProps {
	content: string[];
	isFull: boolean;
	onMoreClick: () => void;
	title: string;
}

export const MovieDetailsBlock: React.FC<MovieDetailsBlockProps> = ({ content, isFull, onMoreClick, title }) => {
	const slicedContent = isFull ? content : content.slice(0, 3);
	const navigate = useNavigate();

	const onDetailClick = (content: string) => {
		navigate(`/details-by`, { state: { details: content } });
	}

	return (
		<div className="mb-4 flex">
			<h3 className="text-sm text-muted-foreground mr-2 whitespace-nowrap">
				{title}:
			</h3>
			<div className="flex">
				<p className="text-sm font-semibold">
					{slicedContent.map((title, index) => (
						<span className="hover:underline capitalize" key={index} onClick={() => onDetailClick(title)}>
							{title}
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
