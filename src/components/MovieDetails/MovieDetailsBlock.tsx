
export const MovieDetailsBlock = ({ content, isActors, onMoreClick, title }) => {
	return (
		<div className="mb-4 flex">
			<h3 className="text-sm text-muted-foreground mr-2 whitespace-nowrap">
				{title}:
			</h3>
			{isActors ? (
				<div className="flex">
					<p className="text-sm font-semibold">
						{content.slice(0, 3).map((actor, index) => (
							<>
								<span className="hover:underline" key={index}>
									{actor}
								</span>
								<span key={index + "comma"}>
									{index !== content.slice(0, 3).length - 1 && ", "}
								</span>
							</>
						))}
						{content.length > 3 && (
							<>
								,&nbsp;
								<span
									className=" font-semibold text-sm cursor-pointer"
									onClick={onMoreClick}
								>
									ще
								</span>
							</>
						)}
					</p>
				</div>
			) : (
				<p className="text-sm font-semibold">{content}</p>
			)}
		</div>
	);
};