import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { signInWithDiscord } from "@/supabase/supaClient";
import { DiscordLogoIcon } from "@/icons/DiscordLogoIcon";
import { Drawer } from "vaul";
import { GoogleLogoIcon } from "@/icons/GoogleLogoIcon";

const AuthDrawer = ({ isOpen, setIsOpen }) => {
	return (
		<Drawer.Root open={isOpen} onOpenChange={(state) => setIsOpen(state)}>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm " />
				<Drawer.Content className="bg-background flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 h-[80vh]">
					<div className="p-4 rounded-t-[10px] flex-1">
						<div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
						<div className="max-w-md mx-auto flex flex-col items-center">
							<Drawer.Title className="font-medium mb-4">
								Ввійти в акаунт
							</Drawer.Title>
							<p className="text-zinc-500 mb-2">
								Введіть свій email, щоб ми могли надіслати вам посилання для
								входу
							</p>
							<div className="flex flex-col w-full gap-4 items-center">
								<Input type="email" placeholder="Email" />
								<Button>Зарееструватися</Button>
								<p className="text-sm text-gray-500">
									{" "}
									або увійдіть за допомогою
								</p>
								<div className="flex flex-row justify-between gap-4">
									<Button
										variant="outline"
										size="icon"
										className="rounded-full w-11 h-11"
										onClick={() => signInWithDiscord()}
									>
										<DiscordLogoIcon className="w-5 h-5 fill-indigo-600" />
									</Button>
									<Button
										variant="outline"
										size="icon"
										className="rounded-full w-11 h-11"
									>
										<GoogleLogoIcon className="w-5 h-5" />
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
};

export default AuthDrawer;
