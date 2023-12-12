import { useAuth } from "@/hooks/useAuth";
import { SearchIcon } from "@/icons/SearchIcon";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/movua-lt.png";
import { useTheme } from "../context/ThemeProvider";
import AuthDrawer from "./AuthDrawer";
import { NotificationHoverCard } from "./NotificationHoverCard";
import SearchDrawer from "./SearchDrawer/SearchDrawer";
import { ThemeToggleButton } from "./ThemeToggle";
import UserNav from "./UserNav";
import { Button } from "./ui/button";

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

	const navigate = useNavigate();

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

	const handleSearchClick = () => {
		setIsSearchModalOpen(true);
		navigate("search")
	}

	return (
		<>
			<div className="w-full max-w-7xl mx-auto items-center justify-between px-5 sm:px-6 py-5 lg:px-8 flex backdrop-blur backdrop-brightness-150 dark:backdrop-brightness-75 h-16 uw:rounded-b-md">
				<div className="flex items-center">
					<Link className="w-32 flex flex-row items-center" href="/home">
						<img alt="logo" className="w-20 mr-3" src={logo} />
					</Link>
					<ul className="lg:flex gap-x-4 ml-14 hidden">
						{menus.map((link, idx) => (
							<div key={idx}>
								<li>
									<Link
										className={
											pathName === link.path
												? "text-white font-semibold underline text-sm"
												: "text-gray-300 font-normal text-sm"
										}
										href={link.path}
										to={link.path}
									>
										{link.name}
									</Link>
								</li>
							</div>
						))}
					</ul>
				</div>
				<div className="flex items-center gap-x-4">
					<Button
						className="rounded-full"
						onClick={() => handleSearchClick(true)}
						size="icon"
						variant={theme === "dark" ? "ghost" : "secondary"}
					>
						<SearchIcon className="w-5 h-5 cursor-pointer fill-foreground" />
					</Button>
					{session?.user ? (
						<>
							<NotificationHoverCard />
							<UserNav />
						</>
					) : (
						<Button
							className="rounded-full flex flex-row gap-2"
							onClick={() => setLoginDialogOpen(true)}
							size="sm"
						>
							<span>Увійти</span>
							<div className="blob h-4 w-4" />
						</Button>
					)}
					<ThemeToggleButton />
				</div>
			</div>
			<SearchDrawer
				changeState={setIsSearchModalOpen}
				state={isSearchModalOpen}
			/>
			<AuthDrawer isOpen={loginDialogOpen} setIsOpen={setLoginDialogOpen} />
		</>
	);
};

export default NavBar;
