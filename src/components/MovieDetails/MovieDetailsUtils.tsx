import { TopTenIcon } from "@/icons/TopTenIcon";
import { cn } from "@/lib/utils";

import { Badge } from "../ui/badge";

export const NewMovieTag: React.FC = () => (
	<h4 className="font-semibold tracking-tight text-green-400">Новинка</h4>
);

interface QualityBadgeProps {
	quality: string;
	secondary?: boolean;
}

export const QualityBadge: React.FC<QualityBadgeProps> = ({ quality, secondary = false }) => (
	<Badge className="h-5 p-2" variant={secondary ? "secondary" : "outline"}>
		{quality}
	</Badge>
);

interface SoundQualityBadgeProps {
	quality: string;
}

export const SoundQualityBadge: React.FC<SoundQualityBadgeProps> = ({ quality }) => (
	<Badge className="h-5 p-2" variant="outline">
		{quality}
	</Badge>
);

interface AgeRestrictionProps {
	data: {
		age?: number;
		details?: string;
	};
	isShort?: boolean;
}

export const AgeRestriction: React.FC<AgeRestrictionProps> = ({ data, isShort = false }) => {
	const age = data?.age || parseInt(data.details?.match(/\d+/), 10);

	return (
		<div className="flex flex-row gap-2 items-center">
			<Badge
				className="text-sm p-2 h-5 items-center"
				variant="outline"
			>
				{age}+
			</Badge>
			{!isShort && data.details ? <p className="text-sm">{data.details}</p> : null}
		</div>
	)
};

interface PopularityTagProps {
	movie_type: string;
	rating: number;
}

export const PopularityTag: React.FC<PopularityTagProps> = ({ movie_type, rating }) => {
	let type = null;
	switch (movie_type) {
		case "movie":
			type = "Фільм";
			break;
		case "serial":
			type = "Серіал";
			break;
		case "anime":
			type = "Аніме";
			break;
		case "cartoon":
			type = "Мультфільм";
			break;
		case "cartoonSerial":
			type = "Мультсеріал";
			break;
		default:
			type = "Фільм";
	}

	return (
		<>
			<TopTenIcon className="w-7 h-7" />
			<h3 className="text-xl font-semibold tracking-tight">
				{type} №{rating} сьогодні
			</h3>
		</>
	)
};

interface MovieNewTagProps {
	className?: string;
}

export const MovieNewTag: React.FC = ({ className }: MovieNewTagProps) => (
	<div className="absolute flex items-center justify-center z-20 bottom-0 left-0 right-0">
		<span className={cn("inline-block bg-red-600 rounded-sm px-3 py-1 text-sm font-semibold text-white mb-2", className)}>
			Нещодавно додано
		</span>
	</div>
);

export const MovieNewSeasonTag: React.FC = () => (
	<div className="absolute flex items-center justify-center z-20 bottom-0 left-0 right-0">
		<span className="inline-block bg-red-600 rounded-sm px-3 py-1 text-sm font-semibold text-white mb-2">
			Новий сезон
		</span>
	</div>
);