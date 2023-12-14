import { TopTenIcon } from "@/icons/TopTenIcon";

import { Badge } from "../ui/badge";

export const NewMovieTag = () => (
	<h4 className="font-semibold tracking-tight text-green-400">Новинка</h4>
);

export const QualityBadge = ({ quality }) => (
	<Badge className="h-5 p-2" variant="outline">
		{quality}
	</Badge>
);

export const AgeRestriction = ({ data }) => (
	<>
		<Badge
			className="rounded-2 text-sm p-2 h-6 items-center border-foreground"
			variant="outline"
		>
			{data.age}+
		</Badge>
		{data.details ? <p className="text-sm">{data.details}</p> : null}
	</>
);

export const PopularityTag = ({ rating }) => (
	<>
		<TopTenIcon className="w-7 h-7" />
		<h3 className="text-xl font-semibold tracking-tight">
			Фільм №{rating} сьогодні
		</h3>
	</>
);

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

