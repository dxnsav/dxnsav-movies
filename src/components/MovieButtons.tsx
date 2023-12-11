import { Button } from "@/components/ui/button";
import { PlayIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

interface iAppProps {
	overview: string;
	youtubeUrl: string;
	id: number;
	age: number;
	title: string;
	releaseDate: number;
	duration: number;
}

export default function MovieButtons({
	id,
	title,
}: iAppProps) {
	const navigate = useNavigate();

	const onHandleClickWatch = () => {
		navigate(`/watch/${id}`);
	};

	const onHandleClickDetails = () => {
		navigate(`/details`, { state: { movie: { id, title } } });
	}

	return (
		<>
			<Button className="text-lg font-medium" onClick={() => onHandleClickWatch()}>
				<PlayIcon className="mr-2 h-6 w-6" /> Дивитись
			</Button>
			<Button
				className="text-lg font-medium bg-white/40 hover:bg-white/30 text-white" onClick={() => onHandleClickDetails()}
			>
				<InfoCircledIcon className="mr-2 h-6 w-6" /> Детальніше
			</Button>
		</>
	);
}
