import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil1Icon, BellIcon } from '@radix-ui/react-icons'
import { ThemeToggleButton } from './ThemeToggle';
import { Button } from './ui/button';
import UserNav from './UserNav';
import SearchModal from './SearchModal/SearchModal';

import logo from '../assets/logo.svg';

interface linkProps {
	name: string;
	path: string;
}

const links: linkProps[] = [
	{
		name: 'Новинки',
		path: '/discover',
	},
	{
		name: 'Екслюзиви',
		path: '/browse',
	},
	{
		name: 'Список для перегляду',
		path: '/watchlist',
	},
]

const NavBar = () => {
	const pathName = window.location.pathname;
	const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

	return (
		<>
			<div className="w-full max-w-7xl mx-auto items-center justify-between px-5 sm:px-6 py-5 lg:px-8 flex">
				<div className="flex items-center">
					<Link href="/home" className="w-32 flex flex-row items-center">
						<img src={logo} alt="logo" className="w-10 h-10 mr-3" />
						<h1 className="text-white font-bold text-2xl">
							Mov<span className='text-blue-500'>U</span><span className='text-yellow-500'>A</span>
						</h1>
					</Link>
					<ul className="lg:flex gap-x-4 ml-14 hidden">
						{links.map((link, idx) => (
							<div key={idx}>
								{pathName === link.path ? (
									<li>
										<Link
											href={link.path}
											to={link.path}
											className="text-white font-semibold underline text-sm"
										>
											{link.name}
										</Link>
									</li>
								) : (
									<li>
										<Link
											className="text-gray-300 font-normal text-sm"
											href={link.path}
											to={link.path}
										>
											{link.name}
										</Link>
									</li>
								)}
							</div>
						))}
					</ul>
				</div>

				<div className="flex items-center gap-x-8">
					<Button variant="ghost" onClick={() => setIsSearchModalOpen(true)} >
						<Pencil1Icon className="w-5 h-5 text-gray-300 cursor-pointer" />
					</Button>

					<BellIcon className="h-5 w-5 text-gray-300 cursor-pointer" />
					<UserNav />
					<ThemeToggleButton />
				</div>
			</div>
			<SearchModal state={isSearchModalOpen} changeState={setIsSearchModalOpen} />
		</>
	);
}

export default NavBar
