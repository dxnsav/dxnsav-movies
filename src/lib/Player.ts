import { useEffect } from 'react';

export default function Player(config) {
	CreatePlayer(config);
	return "";
}

function CreatePlayer(config) {
	if (window.Playerjs) {
		new window.Playerjs(config);
	} else {
		if (!window.pjscnfgs) {
			window.pjscnfgs = {};
		}
		window.pjscnfgs[config.id] = config;
	}
}

window.PlayerjsAsync = function () {
	if (window.pjscnfgs) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		Object.entries(window.pjscnfgs).map(([key, value]) => {
			return new window.Playerjs(value);
		});
	}
	window.pjscnfgs = {};
};

export function useScript(url) {
	useEffect(() => {
		const script = document.createElement("script");
		script.src = url;
		script.async = true;
		document.body.appendChild(script);
		return () => {
			document.body.removeChild(script);
		};
	}, [url]);
}

export function PlayNewVideo() {
	if (window.pljssglobal.length > 0) {
		window.pljssglobal[0].api("play", "https://plrjs.com/new.mp4");
	}
}