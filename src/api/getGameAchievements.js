/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import axiosInstance from "./baseAPICallSettings";

const getGameAchievements = async (slug) => {
	return await axiosInstance.get(
		`/games/${slug}/achievements`
	);
}

export {getGameAchievements};
