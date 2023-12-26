import { Badge } from "../ui/badge";

interface Badge {
	id: number
	search_term: string
	timestamp: number
}

type SearchHistoryProps = {
	badgesData: Badge[];
	onBadgeClick: (name: string) => void;
};

export const SearchHistory = ({ badgesData, onBadgeClick }: SearchHistoryProps) => {
	return (
		<div className="flex flex-col max-w-[30%]">
			<h1>Остані пошуки</h1>
			<div className="flex flex-col portrait:flex-row gap-1">
				{badgesData
					.sort((a: Badge, b: Badge) =>
						new Date(a.timestamp * 1000).valueOf() - new Date(b.timestamp * 1000).valueOf(),
					)
					.map((item: Badge) => (
						<Badge
							className="w-full"
							key={item.id}
							onClick={() => onBadgeClick(item.search_term)}
							variant="secondary"
						>
							{item.search_term}
						</Badge>
					))}
			</div>
		</div>
	);
};