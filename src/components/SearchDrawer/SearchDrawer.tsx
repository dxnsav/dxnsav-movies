import { useDialogState } from "@/hooks/useDrawerStore";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Drawer } from "vaul";

export default function SearchDrawer() {
	const navigate = useNavigate();

	const { checkRouteState, onOpenChange, open } = useDialogState();
	const location = useLocation();

	useEffect(() => {
		checkRouteState(location.pathname);
	}, [location.pathname, checkRouteState]);

	const handleClose = () => {
		onOpenChange(false);
		navigate("/");
	};

	return (
		<Drawer.Root onClose={handleClose} onOpenChange={onOpenChange} open={open} >
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm " />
				<Drawer.Content className="bg-background flex flex-col rounded-t-lg mt-24 fixed bottom-0 left-0 right-0 h-[95vh] portrait:w-[95vw] landscape:w-[80vw] mx-auto">
					<Outlet />
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}

