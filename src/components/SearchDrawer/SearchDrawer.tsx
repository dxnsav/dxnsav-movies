import { Outlet } from "react-router-dom";
import { Drawer } from "vaul";

export default function SearchDrawer({ changeState, state }) {
	const onOpenChange = () => {
		changeState(true)
	};

	return (
		<Drawer.Root onOpenChange={() => onOpenChange()} open={state} >
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm " />
				<Drawer.Content className="bg-background flex flex-col rounded-t-lg mt-24 fixed bottom-0 left-0 right-0 h-[95vh] portrait:w-[95vw] landscape:w-[80vw] mx-auto">

					<div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 z-20" />
					<Outlet />

				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}

