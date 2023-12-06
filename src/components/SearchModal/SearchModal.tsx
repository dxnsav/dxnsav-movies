import {
	Dialog,
	DialogContent,
} from "../ui/dialog.tsx";
import { useContext } from "react";
import { DialogContext } from './../../context/DialogContext';

export default function SearchModal({ state, changeState }) {
	const { content, setContent } = useContext(DialogContext);

	const onOpenChange = () => {
		changeState(!state);
		setContent(<SearchContent />);
	}


	return (
		<Dialog open={state} onOpenChange={() => onOpenChange()} >
			<DialogContent className="sm:max-w-[60vw] sm:min-h-[60vh] bg-opacity-60 bg-gray-950 backdrop-blur pt-0 px-0">
				{content}
			</DialogContent>
		</Dialog>
	);
}



