/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import axiosInstance from "../baseAPICallSettings";

const getGameScreenshots = async (slug) => {
	return await axiosInstance.get(
		`/games/${slug}/screenshots`
	);
};

export {getGameScreenshots};
