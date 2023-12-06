import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu.tsx";

export default function UserNav() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-10 w-10 rounded-sm">
					<Avatar className="h-10 w-10 rounded-sm">
						<AvatarFallback className="rounded-full">NS</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel>
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">Jan</p>
						<p className="text-xs leading-none text-muted-foreground">
							jkasdf@asdkfj.com
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem >Sign out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
