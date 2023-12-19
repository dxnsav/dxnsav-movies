export const formatDuration = (duration: number): string => {
	const hours = Math.floor(duration / 3600);
	const minutes = Math.floor((duration % 3600) / 60);
	return `${hours} г. ${minutes} хв.`;
};
