import MovieButtons from "./MovieButtons";

export default function MovieVideo() {
	const data = {
		imageString:
			"https://image.tmdb.org/t/p/original/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg",
		overview:
			"Following the events at home, the Abbott family now face the terrors of the outside world. Forced to venture into the unknown, they realize the creatures that hunt by sound are not the only threats lurking beyond the sand path.",
		title: "A Quiet Place Part II",
		videoSource: "https://www.youtube.com/embed/XEMwSdne6UE",
		release: 2021,
		duration: 97,
		id: 1,
		age: 13,
		youtubeString: "https://www.youtube.com/embed/XEMwSdne6UE",
	};

	return (
		<div className="h-[70vh] lg:h-[70vh] w-full flex justify-start items-center">
			<video
				poster={data?.imageString}
				autoPlay
				muted
				loop
				src={data?.videoSource}
				className="w-full absolute top-0 left-0 h-[70vh] object-cover -z-10 brightness-[60%]"
			></video>

			<div className="absolute w-[90%] lg:w-[40%] mx-auto">
				<h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
					{data?.title}
				</h1>
				<p className="text-white text-lg mt-5 line-clamp-3">{data?.overview}</p>
				<div className="flex gap-x-3 mt-4">
					<MovieButtons
						age={data?.age as number}
						duration={data?.duration as number}
						id={data?.id as number}
						overview={data?.overview as string}
						releaseDate={data?.release as number}
						title={data?.title as string}
						youtubeUrl={data?.youtubeString as string}
						key={data?.id}
					/>
				</div>
			</div>
		</div>
	);
}
