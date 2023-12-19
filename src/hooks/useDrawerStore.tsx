import create from 'zustand';

interface DialogState {
	checkRouteState: (pathname: string) => void;
	onOpenChange: (open: boolean) => void;
	open: boolean;
}

export const useDialogState = create<DialogState>((set) => ({
	checkRouteState: (pathname: string) => {
		if (pathname === '/search' || pathname === '/details') {
			set({ open: true });
		} else {
			set({ open: false });
		}
	},
	onOpenChange: (open: boolean) => set({ open }),
	open: false,
}));
