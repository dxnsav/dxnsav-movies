import { BellIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

// TODO: Add real data from supabase
const getRandomDate = (start, end) => {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime()),
	);
};

const notifications = [
	{
		id: 1,
		movieBanner: "https://placehold.co/112x63",
		timestamp: getRandomDate(new Date(2023, 1, 1), new Date(2023, 11, 10)),
		title: "Notification 1",
	},
	{
		id: 2,
		movieBanner: "https://placehold.co/112x63",
		timestamp: getRandomDate(new Date(2023, 1, 1), new Date(2023, 11, 10)),
		title: "Notification 2",
	},
	{
		id: 3,
		movieBanner: "https://placehold.co/112x63",
		timestamp: getRandomDate(new Date(2023, 1, 1), new Date(2023, 11, 10)),
		title: "Notification 3",
	},
];

// function that from timestamp returns days/wks/months/years ago count from now
const getDaysCount = (timestamp: number) => {
	const now = new Date().getTime();
	const difference = now - timestamp;
	const days = Math.floor(difference / (1000 * 60 * 60 * 24));
	const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
	const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
	const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));

	if (days < 7) {
		return `${days} days ago`;
	} else if (weeks < 4) {
		return `${weeks} weeks ago`;
	} else if (months < 12) {
		return `${months} months ago`;
	} else {
		return `${years} years ago`;
	}
};

export const NotificationHoverCard = () => {
	const [numOfNotifications, setNumOfNotifications] = useState(
		notifications.length,
	);
	const [isHoverCardOpen, setIsHoverCardOpen] = useState(false);

	useEffect(() => {
		if (isHoverCardOpen) {
			onHoverCardOpen();
		}
	}, [isHoverCardOpen]);

	const onHoverCardOpen = () => {
		// TODO: Push to subabase that user has seen notifications
		setNumOfNotifications(0);
	};

	const sortedNotifications = notifications.sort(
		(a, b) => b.timestamp - a.timestamp,
	);

	// TODO: Add onNotificationClick functionality to open movie modal
	const onNotificationClick = (notification) => {
		console.log(notification);
	};

	return (
		<HoverCard onOpenChange={setIsHoverCardOpen}>
			<HoverCardTrigger className="cursor-pointer">
				<div className="relative">
					<BellIcon className="h-6 w-6" />
					{numOfNotifications > 0 && (
						<span className="absolute bottom-0 right-0 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
							{numOfNotifications}
						</span>
					)}
				</div>
			</HoverCardTrigger>
			<HoverCardContent className="p-2">
				<ScrollArea className="h-[200px] w-[350px] p-1">
					<div className="flex flex-col gap-2">
						{sortedNotifications.map((notification, iterator) => (
							<React.Fragment key={notification.id}>
								<div
									className="flex flex-row gap-2"
									onClick={() => onNotificationClick(notification)}
								>
									<img
										alt="movie banner"
										className="w-24"
										src={notification.movieBanner}
									/>
									<div className="mt-2">
										<h2 className="text-md">{notification.title}</h2>
										<p className="text-sm text-gray-500">
											{getDaysCount(notification.timestamp)}
										</p>
									</div>
								</div>
								{iterator < notifications.length - 1 && (
									<Separator className="w-[220px] mb-1" />
								)}
							</React.Fragment>
						))}
					</div>
				</ScrollArea>
			</HoverCardContent>
		</HoverCard>
	);
};
