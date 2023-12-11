import { useContext } from "react";
import { DialogContext } from '../../context/DialogContext';
import { Drawer } from "vaul";
import { SearchContent } from "./SearchContent";

export default function SearchDrawer({ state, changeState }) {
	const { content, setContent } = useContext(DialogContext);

	const onOpenChange = () => {
		changeState(true);
		setContent(<SearchContent />);
	}

	return (
		<Drawer.Root open={state} onOpenChange={() => onOpenChange()} >
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm " />
				<Drawer.Content className="bg-background flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 h-[80vh] landscape:w-[80vw] mx-auto">
					{content}
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}

