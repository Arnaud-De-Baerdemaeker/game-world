/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import axiosInstance from "../baseAPICallSettings";

const getGameAdditions = async (slug) => {
	return await axiosInstance.get(
		`/games/${slug}/additions`
	);
};

export {getGameAdditions};
