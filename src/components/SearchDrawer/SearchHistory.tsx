import { Badge } from "../ui/badge";

type BadgeType = {
	id: string;
	name: string;
	timestamp: number;
};

type SearchHistoryProps = {
	badgesData: BadgeType[];
	onBadgeClick: (name: string) => void;
};

export const SearchHistory = ({ badgesData, onBadgeClick }: SearchHistoryProps) => {
	return (
		<div className="flex flex-col w-72">
			<h1>Остані пошуки</h1>
			<div className="flex flex-col portrait:flex-row gap-1">
				{badgesData
					.sort((a: BadgeType, b: BadgeType) =>
						new Date(a.timestamp * 1000).valueOf() - new Date(b.timestamp * 1000).valueOf(),
					)
					.map((item: BadgeType) => (
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