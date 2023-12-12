import { Badge } from "../ui/badge";

export const SearchHistory = ({ badgesData, onBadgeClick }) => {
	return (
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
							onClick={() => onBadgeClick(item.name)}
							variant="outline"
						>
							{item.name}
						</Badge>
					))}
			</div>
		</div>
	);
};