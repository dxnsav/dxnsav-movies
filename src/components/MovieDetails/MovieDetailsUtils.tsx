import { TopTenIcon } from "@/icons/TopTenIcon";
import { cn } from "@/lib/utils";

import { Badge } from "../ui/badge";

export const NewMovieTag = () => (
	<h4 className="font-semibold tracking-tight text-green-400">Новинка</h4>
);

export const QualityBadge = ({ quality }) => (
	<Badge className="h-5 p-2" variant="outline">
		{quality}
	</Badge>
);

export const SoundQualityBadge = ({ quality }) => (
	<Badge className="h-5 p-2" variant="outline">
		{quality}
	</Badge>
);

export const AgeRestriction = ({ data, style }) => {
	const age = data?.age || parseInt(data.details.match(/\d+/), 10);

	return (
		<div className="flex flex-row gap-2 items-center">
			<Badge
				className={cn("text-sm p-2 h-5 items-center", !style && "border-foreground h-6")}
				variant="outline"
			>
				{age}+
			</Badge>
			{data.details ? <p className="text-sm">{data.details}</p> : null}
		</div>
	)
};

export const PopularityTag = ({ movie_type, rating }) => {
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

export const MovieNewTag = () => (
	<div className="absolute flex items-center justify-center z-20 bottom-0 left-0 right-0">
		<span className="inline-block bg-red-600 rounded-sm px-3 py-1 text-sm font-semibold text-white mb-2">
			Нещодавно додано
		</span>
	</div>
);

export const MovieNewSeasonTag = () => (
	<div className="absolute flex items-center justify-center z-20 bottom-0 left-0 right-0">
		<span className="inline-block bg-red-600 rounded-sm px-3 py-1 text-sm font-semibold text-white mb-2">
			Новий сезон
		</span>
	</div>
);

