import { Button } from "@/components/ui/button";
import { PlayIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import SearchDrawer from "./SearchDrawer/SearchDrawer";
import { useState } from "react";

export default function MovieButtons({ movie }) {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const onHandleClickWatch = () => {
		navigate(`/watch`, { state: { movie } });
	};

	// TODO: Make global context to open SearchDrawer
	const onHandleClickDetails = () => {
		setOpen(true);
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
			<SearchDrawer state={open} changeState={setOpen} />
		</>
	);
}
