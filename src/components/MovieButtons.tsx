import { Button } from "@/components/ui/button";
import { DrawerContext } from "@/context/DrawerContext";
import { InfoCircledIcon, PlayIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function MovieButtons({ movie }) {
	const navigate = useNavigate();
	const { openDrawer } = useContext(DrawerContext);

	const onHandleClickWatch = () => {
		navigate(`/watch`, { state: { movie } });
	};

	const onHandleClickDetails = () => {
		openDrawer();
		navigate(`/details`, { state: { movie } });
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
