import { signOut, signOutLocally } from "@/supabase/supaClient.tsx";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuTrigger,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
} from "./ui/dropdown-menu.tsx";
import { useAuth } from "@/hooks/useAuth.tsx";
import { useEffect, useState } from "react";

export default function UserNav() {
	const session = useAuth();
	const [fallback, setFallback] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (session && session.user) {
			if (session.user.user_metadata && session.user.user_metadata.full_name) {
				const parts = session.user.user_metadata.full_name.split(" ");
				if (parts.length > 1) {
					setFallback(parts[0][0] + parts[1][0]);
				} else if (parts.length === 1) {
					setFallback(parts[0][0]);
				}
			} else if (session.user.email) {
				setFallback(session.user.email[0] + session.user.email[1]);
			}
		}
	}, [session]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-9 w-9 rounded-full">
					<Avatar className="h-8 w-8 rounded-full">
						<AvatarFallback className="rounded-full uppercase bg-gradient-to-r from-sky-400 to-blue-500">
							{fallback}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel>
					<div className="flex flex-row space-x-1 items-center gap-2">
						<Avatar className="h-8 w-8 rounded-full">
							<AvatarFallback className="rounded-full uppercase bg-gradient-to-r from-sky-400 to-blue-500">
								{fallback}
							</AvatarFallback>
						</Avatar>
						{session?.user?.user_metadata?.full_name || session?.user?.email}
					</div>
				</DropdownMenuLabel>
				<DropdownMenuItem>
					Акаунт
				</DropdownMenuItem>
				<DropdownMenuItem>
					Підтримка
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<div className="flex flex-row space-x-1">
						<Button onClick={() => signOutLocally()} variant="ghost" className="w-full rounded-sm" >
							Вийти
						</Button>
						<DropdownMenuSubTrigger />
						<DropdownMenuSubContent>
							<Button onClick={() => signOut()} variant="ghost" className="w-full rounded-sm" >
								Вийти з усіх пристроїв
							</Button>
						</DropdownMenuSubContent>
					</div>
				</DropdownMenuSub>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
