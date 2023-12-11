import { Drawer } from "vaul";
import { Outlet } from "react-router-dom";

export default function SearchDrawer({ state, changeState }) {
	const onOpenChange = () => {
		changeState(true)
	};

	return (
		<Drawer.Root open={state} onOpenChange={() => onOpenChange()} >
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm " />
				<Drawer.Content className="bg-background flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 h-[80vh] landscape:w-[80vw] mx-auto">
					<div className="p-4 rounded-t-20 flex-1">
						<div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
						<Outlet />
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}

