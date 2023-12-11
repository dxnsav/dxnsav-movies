import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import logo from "../assets/movua-lt.png";
import { useAuth } from "@/hooks/useAuth";
import UserNav from "./UserNav";
import SearchModal from "./SearchModal/SearchModal";
import AuthDrawer from "./AuthDrawer";
import { ThemeToggleButton } from "./ThemeToggle";
import { NotificationHoverCard } from "./NotificationHoverCard";
import { SearchIcon } from "@/icons/SearchIcon";
import { useTheme } from "./ThemeProvider";

interface linkProps {
	name: string;
	path: string;
}

const links: linkProps[] = [
	{
		name: "Новинки",
		path: "/discover",
	},
	{
		name: "Екслюзиви",
		path: "/browse",
	},
	{
		name: "Жанри",
		path: "/genres",
	},
];


const NavBar = () => {
	const pathName = window.location.pathname;
	const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
	const session = useAuth();
	const theme = useTheme();

	const [loginDialogOpen, setLoginDialogOpen] = useState(false);
	const [menus, setMenus] = useState(links);

	useEffect(() => {
		if (session?.user) {
			setMenus([
				...links,
				{
					name: "Список для перегляду",
					path: "/watchlist",
				},
				{
					name: "Історія",
					path: "/history",
				},
			]);
		} else {
			setMenus(links);
		}
	}, [session?.user]);

	return (
		<>
			<div className="w-full max-w-7xl mx-auto items-center justify-between px-5 sm:px-6 py-5 lg:px-8 flex backdrop-blur backdrop-brightness-150 dark:backdrop-brightness-75 h-16">
				<div className="flex items-center">
					<Link href="/home" className="w-32 flex flex-row items-center">
						<img src={logo} alt="logo" className="w-20 mr-3" />
					</Link>
					<ul className="lg:flex gap-x-4 ml-14 hidden">
						{menus.map((link, idx) => (
							<div key={idx}>
								<li>
									<Link
										href={link.path}
										to={link.path}
										className={
											pathName === link.path
												? "text-white font-semibold underline text-sm"
												: "text-gray-300 font-normal text-sm"
										}
									>
										{link.name}
									</Link>
								</li>
							</div>
						))}
					</ul>
				</div>
				<div className="flex items-center gap-x-4">
					<Button variant={theme === "dark" ? "ghost" : "secondary"} className="rounded-full" size="icon" onClick={() => setIsSearchModalOpen(true)}>
						<SearchIcon className="w-5 h-5 cursor-pointer fill-foreground" />
					</Button>
					{session?.user ? (
						<>
							<NotificationHoverCard />
							<UserNav />
						</>
					) : (
						<Button onClick={() => setLoginDialogOpen(true)} size="sm" className="rounded-full flex flex-row gap-2">
							<span>Увійти</span>
							<div className="blob h-4 w-4" />
						</Button>
					)}
					<ThemeToggleButton />
				</div>
			</div >
			<SearchModal
				state={isSearchModalOpen}
				changeState={setIsSearchModalOpen}
			/>
			<AuthDrawer isOpen={loginDialogOpen} setIsOpen={setLoginDialogOpen} />
		</>
	);
};

export default NavBar;
