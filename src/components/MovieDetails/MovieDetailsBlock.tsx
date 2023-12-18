export const MovieDetailsBlock = ({ content, onMoreClick, title }) => {
	const SlicedContent = content.slice(0, 3);
	return (
		<div className="mb-4 flex">
			<h3 className="text-sm text-muted-foreground mr-2 whitespace-nowrap">{title}:</h3>
			<div className="flex">
				<p className="text-sm font-semibold">
					{SlicedContent.map((actor, index) => (
						<span className="hover:underline capitalize" key={index}>
							{actor}{index < SlicedContent.length - 1 ? ', ' : ''}
						</span>
					))}
					{content.length > 3 &&
						<span className=" font-semibold text-sm cursor-pointer" key={"more-actors"} onClick={onMoreClick}>
							, ще
						</span>}
				</p>
			</div>
		</div>
	);
};
