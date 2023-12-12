import { Outlet, useNavigate } from "react-router-dom";
import { Drawer } from "vaul";

export default function SearchDrawer({ changeState, state }) {
	const navigate = useNavigate();

	const onOpenChange = () => {
		changeState(true);
	};

	return (
		<Drawer.Root onClose={() => navigate("/")} onOpenChange={() => onOpenChange()} open={state} >
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm " />
				<Drawer.Content className="bg-background flex flex-col rounded-t-lg mt-24 fixed bottom-0 left-0 right-0 h-[95vh] portrait:w-[95vw] landscape:w-[80vw] mx-auto">
					<Outlet />

				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}

